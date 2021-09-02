import AbstractObserver from '../utils/abstract-observer';

export default class PointsModel extends AbstractObserver {
  constructor() {
    super();
    this._points = [];
  }

  addPoint(updateType, update) {
    this._points = [
      update,
      ...this._points,
    ];
    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const targetIndex = this._getPointIndex(update);

    if (targetIndex === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    this._points = [
      ...this._points.slice(0, targetIndex),
      ...this._points.slice(targetIndex + 1),
    ];
    this._notify(updateType, update);
  }

  updatePoint(updateType, update) {
    const targetIndex = this._getPointIndex(update);

    if (targetIndex === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this._points = [
      ...this._points.slice(0, targetIndex),
      update,
      ...this._points.slice(targetIndex + 1),
    ];
    this._notify(updateType, update);
  }

  addPoints(points) {
    this._points = points.slice();
  }

  getPoints() {
    return this._points.slice();
  }

  _getPointIndex(target) {
    return this._points.findIndex((point) => point.id === target.id);
  }
}
