import AbstractObserver from '../utils/abstract-observer';
import {getISOString} from '../utils/date';

const ErrorMessage = {
  DELETE: 'Can\'t delete unexisting point',
  UPDATE: 'Can\'t update unexisting point',
};

const ClientKey = {
  BASE_PRICE: 'basePrice',
  DATE_FROM: 'dateFrom',
  DATE_TO: 'dateTo',
  IS_FAVORITE: 'isFavorite',
};

const ServerKey = {
  BASE_PRICE: 'base_price',
  DATE_FROM: 'date_from',
  DATE_TO: 'date_to',
  IS_FAVORITE: 'is_favorite',
};

export default class Points extends AbstractObserver {
  constructor() {
    super();
    this._points = [];
  }

  addPoint(updateType, update) {
    this._points = [update, ...this._points];
    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const targetIndex = this._getPointIndex(update);

    if (targetIndex === -1) {
      throw new Error(ErrorMessage.DELETE);
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
      throw new Error(ErrorMessage.UPDATE);
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
    const adaptedData = {
      [ClientKey.BASE_PRICE]: point[ServerKey.BASE_PRICE],
      [ClientKey.DATE_FROM]: getISOString(point[ServerKey.DATE_FROM]),
      [ClientKey.DATE_TO]: getISOString(point[ServerKey.DATE_TO]),
      [ClientKey.IS_FAVORITE]: point[ServerKey.IS_FAVORITE],
    };

    const adaptedPoint = {...point, ...adaptedData};
    [
      ServerKey.BASE_PRICE,
      ServerKey.DATE_FROM,
      ServerKey.DATE_TO,
      ServerKey.IS_FAVORITE,
    ].forEach((key) => delete adaptedPoint[key]);

    return adaptedPoint;
  }

  static adaptToServer(point) {
    const adaptedData = {
      [ServerKey.BASE_PRICE]: point[ClientKey.BASE_PRICE],
      [ServerKey.DATE_FROM]: getISOString(point[ClientKey.DATE_FROM]),
      [ServerKey.DATE_TO]: getISOString(point[ClientKey.DATE_TO]),
      [ServerKey.IS_FAVORITE]: point[ClientKey.IS_FAVORITE],
    };

    const adaptedPoint = {...point, ...adaptedData};
    [
      ClientKey.BASE_PRICE,
      ClientKey.DATE_FROM,
      ClientKey.DATE_TO,
      ClientKey.IS_FAVORITE,
    ].forEach((key) => delete adaptedPoint[key]);

    return adaptedPoint;
  }
}
