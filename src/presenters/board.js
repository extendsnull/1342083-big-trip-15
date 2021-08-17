import SortFormView from '../view/sort-form';
import PointsListView from '../view/points-list';
import NoPointsView from '../view/no-points';
import PointPresenter from './point';
import {render} from '../utils/render';
import { updateItem } from '../utils/common';
import {NoPointsMessage} from '../const';

export default class BoardPresenter {
  constructor(container, points) {
    this._container = container;
    this._points = points.slice();
    this._pointPresenters = new Map();
    this._pointsListComponent = new PointsListView();
    this._sortFormComponent = new SortFormView();
    this._noPointsComponent = new NoPointsView(NoPointsMessage.EVERYTHING);

    this._bindContext();
    this._init();
  }

  _bindContext() {
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleTaskChange = this._handleTaskChange.bind(this);
  }

  _clearPoints() {
    this._pointPresenters.forEach((presenter) => presenter.destroy());
    this._pointPresenters.clear();
    this._pointsListComponent.destroy();
  }

  _init() {
    this._renderBoard();
  }

  _handleModeChange() {
    this._pointPresenters.forEach((presenter) => presenter.resetView());
  }

  _handleTaskChange(updatedTask) {
    this._points = updateItem(this._points, updatedTask);
    this._pointPresenters.get(updatedTask.id).init(updatedTask);
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
