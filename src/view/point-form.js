import AbstractView from './abstract';
import {MOCK_CITIES, POINT_TYPES} from '../const';
import {formatLabel} from '../utils/common';
import {formatDate} from '../utils/date';

const EMPTY_POINT = {
  type: POINT_TYPES[0],
  destination: {
    title: MOCK_CITIES[0],
    description: null,
    photos: null,
  },
  offers: null,
  basePrice: 0,
  dateFrom: Date.now(),
  dateTo: Date.now(),
  isFavorite: false,
};

const getTypeItemsTemplate = (currentType) => {
  const template = POINT_TYPES.map((type) => {
    const isChecked = type === currentType;
    return `
      <div class="event__type-item">
        <input
          id="event-type-${type}-1"
          class="event__type-input visually-hidden"
          type="radio"
          name="event-type"
          value="${type}"
          ${isChecked ? 'checked' : ''}
        >
        <label
          class="event__type-label event__type-label--${type}"
          for="event-type-${type}-1"
        >${type}</label>
      </div>`;
  });

  return template.join('\n');
};

const getDestinationItemsTemplate = () => MOCK_CITIES.map((city) => `<option value="${city}"></option>`).join('\n');

const getOffersTemplate = (offers) => {
  if (Array.isArray(offers) && offers.length) {
    const template = offers.map((offer) => {
      const {name, label, price, isChecked} = offer;
      return `
        <div class="event__offer-selector">
          <input
            class="event__offer-checkbox visually-hidden"
            id="event-offer-${name}-1"
            type="checkbox"
            name="event-offer-${name}"
            ${isChecked ? 'checked' : ''}
          >
          <label
            class="event__offer-label"
            for="event-offer-${name}-1"
          >
            <span class="event__offer-title">${label}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${price}</span>
          </label>
        </div>`;
    }).join('\n');


    return `
      <section class="event__section event__section--offers">
        <h3 class="event__section-title event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
          ${template}
        </div>
      </section>`;
  }

  return '';
};

const getDescriptionTemplate = (description) => {
  if (description && description.length) {
    return `<p class="event__destination-description">${description}</p>`;
  }

  return '';
};

const getPicturesTemplate = (pictures) => {
  if (Array.isArray(pictures) && pictures.length) {
    const items = pictures.map(({src, description}) => `
      <img
        class="event__photo"
        src="${src}"
        alt="${description}"
      >`).join('\n');

    return `
      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${items}
        </div>
      </div>`;
  }

  return '';
};

const getDestinationTemplate = (destination) => {
  const {description, pictures} = destination;

  if (description || pictures) {
    return `
      <section class="event__section event__section--destination">
        <h3 class="event__section-title event__section-title--destination">Destination</h3>
        ${getDescriptionTemplate(description)}
        ${getPicturesTemplate(pictures)}
      </section>`;
  }

  return '';
};

const getDetailsTemplate = (offers, destination) => {
  if (offers || destination) {
    return `
      <section class="event__details">
        ${getOffersTemplate(offers)}
        ${getDestinationTemplate(destination)}
      </section>`;
  }

  return '';
};

const getResetButtonTemplate = () => (`
  <button
    class="event__rollup-btn"
    type="button"
  >
    <span class="visually-hidden">Close event edit</span>
  </button>`);

const getPointFormTemplate = (point, isEdit) => {
  const {type, destination, dateFrom, dateTo, basePrice, offers} = point;

  return `
    <li class="trip-events__item">
      <form
        class="event event--edit"
        action="#"
        method="post"
      >
        <header class="event__header">
          <div class="event__type-wrapper">
            <label
              class="event__type event__type-btn"
              for="event-type-toggle-1"
            >
              <span class="visually-hidden">Choose event type</span>
              <img
                class="event__type-icon"
                width="17"
                height="17"
                src="img/icons/${type}.png"
                alt="Event type icon"
              >
            </label>
            <input
              class="event__type-toggle visually-hidden"
              id="event-type-toggle-1"
              type="checkbox"
            >

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${getTypeItemsTemplate(type)}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group event__field-group--destination">
            <label
              class="event__label event__type-output"
              for="event-destination-1"
            >
              ${formatLabel(type)}
            </label>
            <input
              class="event__input event__input--destination"
              id="event-destination-1"
              type="text"
              name="event-destination"
              value="${destination.name}" list="destination-list-1"
            >
            <datalist id="destination-list-1">
              ${getDestinationItemsTemplate()}
            </datalist>
          </div>

          <div class="event__field-group event__field-group--time">
            <label
              class="visually-hidden"
              for="event-start-time-1">From</label
            >
            <input
              class="event__input event__input--time"
              id="event-start-time-1"
              type="text"
              name="event-start-time"
              value="${formatDate(dateFrom)}"
            >
            &mdash;
            <label
              class="visually-hidden"
              for="event-end-time-1"
            >To</label>
            <input
              class="event__input event__input--time"
              id="event-end-time-1"
              type="text"
              name="event-end-time"
              value="${formatDate(dateTo)}"
            >
          </div>

          <div class="event__field-group event__field-group--price">
            <label
              class="event__label"
              for="event-price-1"
            >
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input
              class="event__input event__input--price"
              id="event-price-1"
              type="text"
              name="event-price"
              value="${basePrice}"
            >
          </div>

          <button
            class="event__save-btn btn btn--blue"
            type="submit"
          >Save</button>
          <button
            class="event__reset-btn"
            type="reset"
          >${isEdit ? 'Delete' : 'Cancel'}</button>
          ${isEdit ? getResetButtonTemplate() : ''}
        </header>
        ${getDetailsTemplate(offers, destination)}
      </form>
    </li>`;
};

export default class PointForm extends AbstractView {
  constructor(point = EMPTY_POINT, isEdit) {
    super();
    this._point = point;
    this._isEdit = isEdit;

    this._deleteClickHandler = this._deleteClickHandler.bind(this);
    this._resetClickHandler = this._resetClickHandler.bind(this);
    this._submitHandler = this._submitHandler.bind(this);
  }

  _getTemplate() {
    return getPointFormTemplate(this._point, this._isEdit);
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector('.event__reset-btn').addEventListener('click', this._deleteClickHandler);
  }

  setResetClickHandler(callback) {
    this._callback.resetClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._resetClickHandler);
  }

  setSubmitHandler(callback) {
    this._callback.submit = callback;
    this.getElement().addEventListener('submit', this._submitHandler);
  }

  _deleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick();
  }

  _submitHandler(evt) {
    evt.preventDefault();
    this._callback.submit();
  }

  _resetClickHandler(evt) {
    evt.preventDefault();
    this._callback.resetClick();
  }
}
