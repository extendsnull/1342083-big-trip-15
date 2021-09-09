import PointsModel from './models/points';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

const ServerUrl = {
  GET_POINTS: 'points',
  UPDATE_POINTS: 'points',
  GET_DESTINATIONS: 'destinations',
  GET_OFFERS: 'offers',
};

export default class Api {
  constructor(baseUrl, authorization) {
    this._baseUrl = baseUrl;
    this._authorization = authorization;
  }

  getPoints() {
    return this._load({ url: ServerUrl.GET_POINTS })
      .then(Api.toJSON)
      .then((points) => points.map(PointsModel.adaptToClient));
  }

  updatePoint() {}

  getDestinations() {
    return this._load({ url: ServerUrl.GET_DESTINATIONS }).then(Api.toJSON);
  }

  getOffers() {
    return this._load({ url: ServerUrl.GET_OFFERS }).then(Api.toJSON);
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

  static checkStatus(response) {
    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response;
  }

  static toJSON(response) {
    return response.json();
  }

  static catchError(err) {
    throw err;
  }
}
