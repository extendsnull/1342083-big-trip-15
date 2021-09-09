import AbstractObserver from '../utils/abstract-observer';

export default class OffersModel extends AbstractObserver {
  constructor() {
    super();
    this._offers = new Map();
  }

  setOffers(updateType, offers) {
    offers.forEach((offer) => this._offers.set(offer.type, offer.offers));
    this._notify(updateType, this._offers);
  }

  getOffers() {
    return this._offers;
  }
}
