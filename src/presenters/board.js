import NoPointsView from '../view/no-points';
import SortView from '../view/sort';
import PointPresenter from './point';
import PointsListView from '../view/points-list';
import { SortType, UpdateType, UserAction } from '../const';
import { remove, render } from '../utils/render';
import { sortByDateFrom, sortByDuration, sortByPrice } from '../utils/sort';

export default class BoardPresenter {
  constructor(container, pointsModel) {
    this._container = container;
    this._pointsModel = pointsModel;
    this._currentSortType = SortType.DAY;

    this._pointPresenters = new Map();

    this._noPointsComponent = null;
    this._sortComponent = null;
    this._pointsListComponent = null;

    this._bindContext();
    this._addObservers();
    this._init();
  }

  _getPoints() {
    // получить тип фильтра
    // получить точки и отфильтровать
    const points = this._pointsModel.getPoints();

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

  _addObservers() {
    this._pointsModel.addObserver(this._handleModelEvent);
  }

  _handleModelEvent(updateType, update) {
    switch (updateType) {
      case UpdateType.PATCH: {
        this._pointPresenters.get(update.id).init(update);
        break;
      }
      case UpdateType.MINOR: {
        this._clearBoard();
        this._renderBoard();
        break;
      }
      case UpdateType.MAJOR: {
        this._clearBoard(true);
        this._renderBoard();
        break;
      }
    }
  }

  _handleViewAction(actionType, updateType, point) {
    switch (actionType) {
      case UserAction.ADD_POINT: {
        this._pointsModel.addPoint(updateType, point);
        break;
      }
      case UserAction.DELETE_POINT: {
        this._pointsModel.deletePoint(updateType, point);
        break;
      }
      case UserAction.UPDATE_POINT: {
        this._pointsModel.updatePoint(updateType, point);
        break;
      }
    }
  }

  _bindContext() {
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handlePointsModeChange = this._handlePointsModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  _handlePointsModeChange() {
    this._pointPresenters.forEach((presenter) => presenter.resetView());
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType !== sortType) {
      this._currentSortType = sortType;
      this._clearBoard();
      this._renderBoard();
    }
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
  }

  _clearBoard(resetSortType) {
    if (this._noPointsComponent) {
      this._clearNoPoints();
    }

    this._clearPointsList();
    this._clearSortForm();

    if (resetSortType) {
      this._currentSortType = SortType.DAY;
    }
  }

  _renderNoPoints() {
    if (this._noPointsComponent) {
      this._noPointsComponent = null;
    }

    this._noPointsComponent = new NoPointsView(); // <== filter type
    render(this._container, this._noPointsComponent);
  }

  _renderSortForm() {
    if (this._sortComponent) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setChangeSortTypeHandler(this._handleSortTypeChange);
    render(this._container, this._sortComponent);
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(
      this._pointsListComponent,
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

    render(this._container, this._pointsListComponent);
  }

  _renderBoard() {
    const points = this._getPoints();
    if (!points.length) {
      return this._renderNoPoints(this._currentSortType);
    }

    this._renderSortForm();
    this._renderPointsList();
  }

  _init() {
    this._renderBoard();
  }
}
