import PointsModel from './model/points';

const ApiUrl = {
  POINTS: 'points',
  DESTINATIONS: 'destinations',
  OFFERS: 'offers',
};

const Method = {
  DELETE: 'DELETE',
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
};

export default class Api {
  constructor(baseUrl, authorization) {
    this._baseUrl = baseUrl;
    this._authorization = authorization;
  }

  getPoints() {
    return this._load({ url: ApiUrl.POINTS })
      .then(Api.toJSON)
      .then((response) => response.map(PointsModel.adaptToClient));
  }

  addPoint(point) {
    return this._load({
      url: ApiUrl.POINTS,
      method: Method.POST,
      body: JSON.stringify(PointsModel.adaptToServer(point)),
      headers: Api.getJSONContentHeader,
    })
      .then(Api.toJSON)
      .then(PointsModel.adaptToClient);
  }

  updatePoint(point) {
    return this._load({
      url: `${ApiUrl.POINTS}/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(PointsModel.adaptToServer(point)),
      headers: Api.getJSONContentHeader,
    })
      .then(Api.toJSON)
      .then(PointsModel.adaptToClient);
  }

  deletePoint(point) {
    return this._load({
      url: `${ApiUrl.POINTS}/${point.id}`,
      method: Method.DELETE,
    });
  }

  getDestinations() {
    return this._load({ url: ApiUrl.DESTINATIONS }).then(Api.toJSON);
  }

  getOffers() {
    return this._load({ url: ApiUrl.OFFERS }).then(Api.toJSON);
  }

  async _load(settings) {
    const { url, method = Method.GET, body = null, headers = new Headers() } = settings;
    headers.append('Authorization', this._authorization);

    try {
      const response = await fetch(`${this._baseUrl}/${url}`, { method, body, headers });
      Api.checkStatus(response);
      return response;
    } catch (err) {
      Api.catchError(err);
    }
  }

  static catchError(err) {
    throw err;
  }

  static checkStatus(response) {
    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response;
  }

  static getJSONContentHeader() {
    return new Headers({ 'Content-Type': 'application/json' });
  }

  static toJSON(response) {
    return response.json();
  }
}
