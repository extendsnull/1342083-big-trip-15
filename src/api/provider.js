import PointsModel from '../model/points';
import { isOnline } from '../utils/common';

const FailedMessage = {
  ADD_POINT: 'Add point failed',
  DELETE_POINT: 'Delete point failed',
  SYNC_POINT: 'Sync data failed',
  GET_DESTINATIONS: 'Get destinations failed',
  GET_OFFERS: 'Get offers failed',
};

const getSyncedPoints = (items) => items.filter(({ success }) => success).map(({ payload }) => payload.point);

const createStoreStructure = (items) => items
  .reduce((acc, current) => Object.assign({}, acc, {
    [current.id]: current,
  }), {});

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getPoints() {
    if (isOnline()) {
      return this._api.getPoints()
        .then((points) => {
          const items = createStoreStructure(points.map(PointsModel.adaptToServer));
          this._store.setItems(items);
          return points;
        });
    }

    const storePoints = Object.values(this._store.getItems());
    return Promise.resolve(storePoints.map(PointsModel.adaptToClient));
  }

  addPoint(point) {
    if (isOnline()) {
      return this._api.addPoint(point)
        .then((newPoint) => {
          this._store.setItem(newPoint.id, PointsModel.adaptToServer(newPoint));
          return newPoint;
        });
    }

    return Promise.reject(new Error(FailedMessage.ADD_POINT));
  }

  updatePoint(point) {
    if (isOnline()) {
      return this._api.updatePoint(point)
        .then((updatedPoint) => {
          this._store.setItem(updatedPoint.id, PointsModel.adaptToServer(updatedPoint));
          return updatedPoint;
        });
    }

    this._store.setItem(point.id, PointsModel.adaptToServer(point));
    return Promise.resolve(point);
  }

  deletePoint(point) {
    if (isOnline()) {
      return this._api.deletePoint(point).then(() => this._store.removeItem(point.id));
    }

    return Promise.reject(new Error(FailedMessage.DELETE_POINT));
  }

  getDestinations() {
    if (isOnline()) {
      return this._api.getDestinations();
    }

    return Promise.resolve([]);
  }

  getOffers() {
    if (isOnline()) {
      return this._api.getOffers();
    }

    return Promise.resolve([]);
  }

  sync() {
    if (isOnline()) {
      const storePoints = Object.values(this._store.getItems());

      return this._api.sync(storePoints)
        .then((response) => {
          const createdPoints = getSyncedPoints(response.created);
          const updatedPoints = getSyncedPoints(response.updated);
          const items = createStoreStructure([...createdPoints, ...updatedPoints]);
          this._store.setItems(items);
        });
    }

    return Promise.reject(new Error(FailedMessage.SYNC_POINT));
  }
}
