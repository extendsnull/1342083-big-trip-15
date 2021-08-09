import {createElement, formatDate, getHumanizedDateDifference} from '../utils';
import {HumanDateFormatPattern, MachineDateFormatPattern} from '../const';

const getOffersTemplate = (offers) => {
  if (Array.isArray(offers) && offers.length) {
    const items = offers
      .filter((offer) => offer.isChecked)
      .map((offer) => {
        const {label, price} = offer;
        return `
          <li class="event__offer">
            <span class="event__offer-title">${label}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${price}</span>
          </li>`;
      })
      .join('\n');

    return `
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">${items}</ul>`;
  }

  return '';
};

const getPointTemplate = (props) => {
  const {type, destination, dateFrom, dateTo, basePrice, offers, isFavorite} = props;
  const title = `${type.label} ${destination.title}`;

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
            src="img/icons/${type.name}.png"
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
            ${getHumanizedDateDifference(dateFrom, dateTo)}
          </p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        ${getOffersTemplate(offers)}
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

export default class Point {
  constructor(props) {
    this._element = null;
    this._props = props;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  getTemplate() {
    return getPointTemplate(this._props);
  }
}