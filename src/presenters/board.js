import SortFormView from '../view/sort-form';
import PointsListView from '../view/points-list';
import NoPointsView from '../view/no-points';
import PointPresenter from './point';
import {NoPointsMessage, SortType} from '../const';
import {updateItem} from '../utils/common';
import {remove, render} from '../utils/render';
import {sortByDuration, sortByPrice} from '../utils/sort';

export default class BoardPresenter {
  constructor(container, points) {
    this._container = container;
    this._points = points.slice();
    this._sourcedPoints = points.slice();
    this._currentSortType = SortType.DAY;

    this._pointPresenters = new Map();
    this._pointsListComponent = new PointsListView();
    this._sortFormComponent = new SortFormView();
    this._noPointsComponent = new NoPointsView(NoPointsMessage.EVERYTHING);

    this._bindContext();
    this._init();
  }

  _bindContext() {
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleTaskChange = this._handleTaskChange.bind(this);
  }

  _clearPointsList() {
    this._pointPresenters.forEach((presenter) => presenter.destroy());
    this._pointPresenters.clear();
    remove(this._pointsListComponent);
  }

  _init() {
    this._renderBoard();
  }

  _handleModeChange() {
    this._pointPresenters.forEach((presenter) => presenter.resetView());
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType !== sortType) {
      this._sortPoints(sortType);
      this._clearPointsList();
      this._renderPointsList();
    }
  }

  _handleTaskChange(updatedTask) {
    this._points = updateItem(this._points, updatedTask);
    this._pointPresenters.get(updatedTask.id).init(updatedTask);
  }

  _sortPoints(sortType) {
    switch (sortType) {
      case SortType.DAY:
      default: {
        this._points = this._sourcedPoints.slice();
        break;
      }
      case SortType.TIME: {
        this._points = sortByDuration(this._points);
        break;
      }
      case SortType.PRICE: {
        this._points = sortByPrice(this._points);
        break;
      }
    }

    this._currentSortType = sortType;
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._pointsListComponent, this._handleTaskChange, this._handleModeChange);
    pointPresenter.init(point);
    this._pointPresenters.set(point.id, pointPresenter);
  }

  _renderPointsList() {
    for (const point of this._points) {
      this._renderPoint(point);
    }

    render(this._container, this._pointsListComponent);
  }

  _renderSortForm() {
    this._sortFormComponent.setChangeSortTypeHandler(this._handleSortTypeChange);
    render(this._container, this._sortFormComponent);
  }

  _renderNoPoint() {
    render(this._container, this._noPointsComponent);
  }

  _renderBoard() {
    if (this._points.every((point) => point.isExpired)) {
      return this._renderNoPoint();
    }

    this._renderSortForm();
    this._renderPointsList();
  }
}
