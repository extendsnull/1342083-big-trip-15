import AbstractView from './abstract';
import { HumanDateFormatPattern, MachineDateFormatPattern } from '../const';
import { formatLabel } from '../utils/common';
import { formatDate, getHumanizedDateDuration } from '../utils/date';

const getOffersTemplate = (offers, hasOffers) => {
  if (hasOffers) {
    const items = offers
      .map((offer) => {
        const {title, price} = offer;
        return `
          <li class="event__offer">
            <span class="event__offer-title">${title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${price}</span>
          </li>`;
      }).join('\n');

    return `
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">${items}</ul>`;
  }

  return '';
};

const getPointTemplate = (point, offers) => {
  const { type, destination, dateFrom, dateTo, basePrice, isFavorite } = point;

  const selectedOffers = offers
    .get(type)
    .slice()
    .filter((offer) => point.offers.find((item) => item.title === offer.title));

  const hasOffers = Boolean(selectedOffers.length);
  const title = `${formatLabel(type)} ${destination.name}`;

  return `
    <li class="trip-events__item">
      <div class="event">
        <time
          class="event__date"
          datetime="${formatDate(dateFrom, MachineDateFormatPattern.DEFAULT)}"
        >
          ${formatDate(dateFrom, HumanDateFormatPattern.MONTH_DAY)}
        </time>
        <div class="event__type">
          <img
            class="event__type-icon"
            width="42"
            height="42"
            src="img/icons/${type}.png"
            alt="Event type icon"
          >
        </div>
        <h3 class="event__title">${title}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time
              class="event__start-time"
              datetime="${formatDate(dateFrom, MachineDateFormatPattern.WITH_HOURS)}"
            >
              ${formatDate(dateFrom, HumanDateFormatPattern.ONLY_TIME)}
            </time>
            &mdash;
            <time
              class="event__end-time"
              datetime="${formatDate(dateTo, MachineDateFormatPattern.WITH_HOURS)}"
            >
              ${formatDate(dateTo, HumanDateFormatPattern.ONLY_TIME)}
            </time>
          </p>
          <p class="event__duration">
            ${getHumanizedDateDuration(dateFrom, dateTo)}
          </p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        ${getOffersTemplate(selectedOffers, hasOffers)}
        <button
          class="event__favorite-btn${isFavorite ? ' event__favorite-btn--active' : ''}"
          type="button"
        >
          <span class="visually-hidden">Add to favorite</span>
          <svg
            class="event__favorite-icon"
            width="28"
            height="28"
            viewBox="0 0 28 28"
          >
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button
          class="event__rollup-btn"
          type="button"
        >
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`;
};

export default class PointView extends AbstractView {
  constructor(point, offers) {
    super();
    this._point = point;
    this._offers = offers;

    this._editClickHandler = this._editClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  _getTemplate() {
    return getPointTemplate(this._point, this._offers);
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._editClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector('.event__favorite-btn').addEventListener('click', this._favoriteClickHandler);
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }
}
