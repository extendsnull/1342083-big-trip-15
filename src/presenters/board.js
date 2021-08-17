import SortFormView from '../view/sort-form';
import PointsListView from '../view/points-list';
import NoPointsView from '../view/no-points';
import PointPresenter from './point';
import {render} from '../utils/render';
import {NoPointsMessage} from '../const';

export default class BoardPresenter {
  constructor(container, points) {
    this._container = container;
    this._points = points;
    this._bindHandlers();
    this._init();
  }

  _bindHandlers() {
    this._pointsListComponent = new PointsListView();
    this._sortFormComponent = new SortFormView();
    this._noPointsComponent = new NoPointsView(NoPointsMessage.EVERYTHING);
  }

  _init() {
    this._renderBoard();
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._pointsListComponent);
    pointPresenter.init(point);
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
