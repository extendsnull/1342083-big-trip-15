import LoadingView from '../view/loading';
import NoPointsView from '../view/no-points';
import SortView from '../view/sort';
import PointsListView from '../view/points-list';
import BoardView from '../view/board';
import PointPresenter from './point';
import NewPointPresenter from './new-point';
import AddButtonPresenter from './add-button';
import {FilterType, SortType, State, UpdateType, UserAction} from '../const';
import {filter} from '../utils/filter';
import {remove, render} from '../utils/render';
import {sortByDateFrom, sortByDuration, sortByPrice} from '../utils/sort';

const ADD_BUTTON_CONTAINER = document.querySelector('.trip-main');

export default class Board {
  constructor(container, pointsModel, filterModel, destinationsModel, offersModel, api) {
    this._container = container;
    this._pointsModel = pointsModel;
    this._filterModel = filterModel;
    this._destinationsModel = destinationsModel;
    this._offersModel = offersModel;
    this._api = api;

    this._loadingComponent = null;
    this._noPointsComponent = null;
    this._sortComponent = null;
    this._pointsListComponent = null;
    this._boardComponent = null;

    this._isLoading = true;
    this._currentSortType = SortType.DAY;

    this._bindContext();
    this._initInnerPresenters();
  }

  init() {
    this._addObservers();
    this._render();
  }

  destroy() {
    this._deleteObservers();
    this._clear(true);
  }

  _bindContext() {
    this._createPoint = this._createPoint.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handlePointsModeChange = this._handlePointsModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleAddButtonClick = this._handleAddButtonClick.bind(this);
    this._handleNewPointFormClose = this._handleNewPointFormClose.bind(this);
  }

  _initInnerPresenters() {
    this._pointPresenters = new Map();

    this._addButtonPresenter = new AddButtonPresenter(ADD_BUTTON_CONTAINER);
    this._addButtonPresenter.setAddButtonClickHandler(this._handleAddButtonClick);
    this._addButtonPresenter.init();

    this._newPointPresenter = new NewPointPresenter(
      this._destinationsModel,
      this._offersModel,
      this._handleViewAction,
    );
    this._newPointPresenter.setFormCloseCallback(this._handleNewPointFormClose);
  }

  _addObservers() {
    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  _deleteObservers() {
    this._pointsModel.deleteObserver(this._handleModelEvent);
    this._filterModel.deleteObserver(this._handleModelEvent);
  }

  _createPoint() {
    this._currentSortType = SortType.DAY;
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);

    if (!this._getPoints().length) {
      this._clear();
      this._renderBoard();
      this._renderPointsList();
    }

    this._newPointPresenter.init(this._pointsListComponent);
  }

  _getPoints() {
    const filterType = this._filterModel.getFilter();
    const points = filter[filterType](this._pointsModel.getPoints());

    switch (this._currentSortType) {
      case SortType.DAY:
      default: {
        return points.sort(sortByDateFrom);
      }
      case SortType.TIME: {
        return points.sort(sortByDuration);
      }
      case SortType.PRICE: {
        return points.sort(sortByPrice);
      }
    }
  }

  _handleModelEvent(updateType, update) {
    switch (updateType) {
      case UpdateType.PATCH: {
        this._pointPresenters.get(update.id).init(update);
        break;
      }
      case UpdateType.MINOR: {
        this._clear();
        this._render();
        break;
      }
      case UpdateType.MAJOR: {
        this._clear(true);
        this._render();
        break;
      }
      case UpdateType.INIT: {
        this._isLoading = false;
        this._clear();
        this._render();
        break;
      }
    }
  }

  _handleViewAction(actionType, updateType, point) {
    switch (actionType) {
      case UserAction.ADD_POINT: {
        this._newPointPresenter.setSaving();
        this._api.addPoint(point)
          .then((response) => {
            this._pointsModel.addPoint(updateType, response);
          })
          .catch(() => {
            this._newPointPresenter.setAborting();
          });
        break;
      }
      case UserAction.DELETE_POINT: {
        this._pointPresenters.get(point.id).setViewState(State.DELETING);
        this._api.deletePoint(point)
          .then(() => {
            this._pointsModel.deletePoint(updateType, point);
          })
          .catch(() => {
            this._pointPresenters.get(point.id).setViewState(State.ABORTING);
          });
        break;
      }
      case UserAction.UPDATE_POINT: {
        this._pointPresenters.get(point.id).setViewState(State.SAVING);
        this._api.updatePoint(point)
          .then((response) => {
            this._pointsModel.updatePoint(updateType, response);
          })
          .catch(() => {
            this._pointPresenters.get(point.id).setViewState(State.ABORTING);
          });
        break;
      }
    }
  }

  _handlePointsModeChange() {
    this._pointPresenters.forEach((presenter) => presenter.resetView());

    if (this._newPointPresenter) {
      this._newPointPresenter.destroy();
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType !== sortType) {
      this._currentSortType = sortType;
      this._clear();
      this._render();
    }
  }

  _handleAddButtonClick() {
    const buttonIsDisabled = true;
    this._createPoint();
    this._addButtonPresenter.init(buttonIsDisabled);
  }

  _handleNewPointFormClose() {
    this._addButtonPresenter.init(false);
  }

  _clearLoading() {
    remove(this._loadingComponent);
  }

  _clearNoPoints() {
    remove(this._noPointsComponent);
  }

  _clearSortForm() {
    remove(this._sortComponent);
  }

  _clearPointsList() {
    this._pointPresenters.forEach((point) => point.destroy());
    this._pointPresenters.clear();
    remove(this._pointsListComponent);

    if (this._newPointPresenter) {
      this._newPointPresenter.destroy();
    }
  }

  _clearBoard() {
    remove(this._boardComponent);
  }

  _clear(resetSortType) {
    this._clearLoading();
    this._clearNoPoints();
    this._clearSortForm();
    this._clearPointsList();
    this._clearBoard();

    if (resetSortType) {
      this._currentSortType = SortType.DAY;
    }
  }

  _renderLoading() {
    if (this._loadingComponent === null) {
      this._loadingComponent = new LoadingView();
    }

    render(this._container, this._loadingComponent);
  }

  _renderNoPoints() {
    if (this._noPointsComponent) {
      this._noPointsComponent = null;
    }

    this._noPointsComponent = new NoPointsView(this._filterModel.getFilter());
    render(this._container, this._noPointsComponent);
  }

  _renderSortForm() {
    if (this._sortComponent) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setChangeSortTypeHandler(this._handleSortTypeChange);
    render(this._boardComponent.getElement(), this._sortComponent);
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(
      this._pointsListComponent,
      this._destinationsModel,
      this._offersModel,
      this._handleViewAction,
      this._handlePointsModeChange,
    );
    pointPresenter.init(point);
    this._pointPresenters.set(point.id, pointPresenter);
  }

  _renderPointsList() {
    if (this._pointsListComponent) {
      this._pointsListComponent = null;
    }

    this._pointsListComponent = new PointsListView();

    for (const point of this._getPoints()) {
      this._renderPoint(point);
    }

    render(this._boardComponent.getElement(),this._pointsListComponent);
  }

  _renderBoard() {
    if (this._boardComponent) {
      this._boardComponent = null;
    }

    this._boardComponent = new BoardView();
    render(this._container, this._boardComponent);
  }

  _render() {
    if (this._isLoading) {
      return this._renderLoading();
    }

    const points = this._getPoints();
    if (!points.length) {
      return this._renderNoPoints(this._currentSortType);
    }

    this._renderBoard();
    this._renderSortForm();
    this._renderPointsList();
  }
}
