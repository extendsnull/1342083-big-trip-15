import { MachineDateFormatPattern } from '../const';
import AbstractObserver from '../utils/abstract-observer';
import { formatDate, getTimestamp } from '../utils/date';

export default class Points extends AbstractObserver {
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

  setPoints(updateType, update) {
    this._points = update.slice();
    this._notify(updateType, update);
  }

  getPoints() {
    return this._points.slice();
  }

  _getPointIndex(target) {
    return this._points.findIndex((point) => point.id === target.id);
  }

  static adaptToClient(point) {
    const adaptedPoint = Object.assign(
      {},
      point,
      {
        basePrice: point['base_price'],
        dateFrom: getTimestamp(point['date_from']),
        dateTo: getTimestamp(point['date_to']),
        isFavorite: point['is_favorite'],
      },
    );

    ['base_price', 'date_from', 'date_to', 'is_favorite'].forEach((key) => delete adaptedPoint[key]);

    return adaptedPoint;
  }

  static adaptToServer(point) {
    const adaptedPoint = Object.assign(
      {},
      point,
      {
        'base_price': point.basePrice,
        'date_from': formatDate(point.dateFrom, MachineDateFormatPattern.ISO),
        'date_to': formatDate(point.dateTo, MachineDateFormatPattern.ISO),
        'is_favorite': point.isFavorite,
      },
    );

    ['basePrice', 'dateFrom', 'dateTo', 'isFavorite'].forEach((key) => delete adaptedPoint[key]);

    return adaptedPoint;
  }
}
