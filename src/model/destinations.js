import AbstractObserver from '../utils/abstract-observer';

export default class Destinations extends AbstractObserver {
  constructor() {
    super();
    this._destinations = new Map();
  }

  setDestinations(updateType, destinations) {
    destinations.forEach((destination) => this._destinations.set(destination.name, destination));
    this._notify(updateType, this._destinations);
  }

  getDestinations() {
    return this._destinations;
  }
}
