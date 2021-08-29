import SmartView from './smart';
import { mockOffers, mockDestinations } from '../data';
import { formatLabel, replaceNotNumberCharacter } from '../utils/common';
import { formatDate } from '../utils/date';

const CURRENT_DATE = Date.now();
const MOCK_CITIES = [...mockDestinations.keys()];
const POINT_TYPES = [...mockOffers.keys()];

const BLANK_POINT = {
  type: POINT_TYPES[0],
  destination: {
    name: MOCK_CITIES[0],
    description: '',
    pictures: [],
  },
  offers: [],
  basePrice: 100,
  dateFrom: CURRENT_DATE,
  dateTo: CURRENT_DATE,
  isFavorite: false,
};

const getTypeItemsTemplate = (currentType) => {
  const template = POINT_TYPES.map((type) => {
    const isChecked = type === currentType;
    return `
      <div class="event__type-item">
        <input
          id="event-type-${type}"
          class="event__type-input visually-hidden"
          type="radio"
          name="event-type"
          value="${type}"
          ${isChecked ? 'checked' : ''}
        >
        <label
          class="event__type-label event__type-label--${type}"
          for="event-type-${type}"
        >${formatLabel(type)}</label>
      </div>`;
  });

  return template.join('\n');
};

const getDestinationItemsTemplate = () => MOCK_CITIES.map((city) => `<option value="${city}"></option>`).join('\n');

const getOffersTemplate = (offers) => {
  if (Array.isArray(offers) && offers.length) {
    const template = offers.map((offer, index) => {
      const { title, price, isChecked } = offer;
      return `
        <div class="event__offer-selector">
          <input
            class="event__offer-checkbox visually-hidden"
            id="event-offer-${index}"
            type="checkbox"
            name="event-offer-${index}"
            value="${title}"
            ${isChecked ? 'checked' : ''}
          >
          <label
            class="event__offer-label"
            for="event-offer-${index}"
          >
            <span class="event__offer-title">${title}</span>
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
  const { description, pictures } = destination;

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

const getPointFormTemplate = (point) => {
  const { type, destination, dateFrom, dateTo, basePrice, offers, isEditMode } = point;

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
              for="event-type-toggle"
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
              id="event-type-toggle"
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
              for="event-destination"
            >
              ${formatLabel(type)}
            </label>
            <input
              class="event__input event__input--destination"
              id="event-destination"
              type="text"
              name="event-destination"
              value="${destination.name}"
              list="destination-list"
            >
            <datalist id="destination-list">
              ${getDestinationItemsTemplate()}
            </datalist>
          </div>

          <div class="event__field-group event__field-group--time">
            <label
              class="visually-hidden"
              for="event-start-time">From</label
            >
            <input
              class="event__input event__input--time"
              id="event-start-time"
              type="text"
              name="event-start-time"
              value="${formatDate(dateFrom)}"
            >
            &mdash;
            <label
              class="visually-hidden"
              for="event-end-time"
            >To</label>
            <input
              class="event__input event__input--time"
              id="event-end-time"
              type="text"
              name="event-end-time"
              value="${formatDate(dateTo)}"
            >
          </div>

          <div class="event__field-group event__field-group--price">
            <label
              class="event__label"
              for="event-price"
            >
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input
              class="event__input event__input--price"
              id="event-price"
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
          >${isEditMode ? 'Delete' : 'Cancel'}</button>
          ${isEditMode ? getResetButtonTemplate() : ''}
        </header>
        ${getDetailsTemplate(offers, destination)}
      </form>
    </li>`;
};

export default class PointForm extends SmartView {
  constructor(point = BLANK_POINT, isEditMode) {
    super();
    this._state = PointForm.parsePointToState(point, isEditMode);
    this._bindContext();
    this._setInnerHandlers();
  }

  _getTemplate() {
    return getPointFormTemplate(this._state);
  }

  _restoreHandlers() {
    this._setInnerHandlers();
    this.setDeleteClickHandler(this._callback.deleteClick);
    this.setResetClickHandler(this._callback.resetClick);
    this.setSubmitHandler(this._callback.submit);
  }

  reset(point, isEditMode) {
    this._updateState(PointForm.parsePointToState(point, isEditMode));
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

  _bindContext() {
    this._deleteClickHandler = this._deleteClickHandler.bind(this);
    this._destinationChangeHandler = this._destinationChangeHandler.bind(this);
    this._offerChangeHandler = this._offerChangeHandler.bind(this);
    this._priceChangeHandler = this._priceChangeHandler.bind(this);
    this._priceInputHandler = this._priceInputHandler.bind(this);
    this._resetClickHandler = this._resetClickHandler.bind(this);
    this._submitHandler = this._submitHandler.bind(this);
    this._typeChangeHandler = this._typeChangeHandler.bind(this);
  }

  _getElements() {
    this._destinationField = this.getElement().querySelector('.event__input--destination');
    this._priceField = this.getElement().querySelector('.event__input--price');
    this._availableOffers = this.getElement().querySelector('.event__available-offers');
    this._typeGroup = this.getElement().querySelector('.event__type-group');
  }

  _setInnerHandlers() {
    this._getElements();
    this._destinationField.addEventListener('change', this._destinationChangeHandler);
    this._priceField.addEventListener('change', this._priceChangeHandler);
    this._priceField.addEventListener('input', this._priceInputHandler);
    this._typeGroup.addEventListener('change', this._typeChangeHandler);

    if (this._availableOffers) {
      this._availableOffers.addEventListener('change', this._offerChangeHandler);
    }
  }

  _deleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick();
  }

  _destinationChangeHandler(evt) {
    const newDestination = mockDestinations.get(evt.target.value);
    this._updateState({ destination: newDestination });
  }

  _resetClickHandler(evt) {
    evt.preventDefault();
    this._callback.resetClick();
  }

  _submitHandler(evt) {
    evt.preventDefault();
    this._callback.submit(PointForm.parseStateToPoint(this._state));
  }

  _offerChangeHandler(evt) {
    const updatedOffers = this._state.offers.map((offer) => {
      if (offer.title === evt.target.value) {
        return {
          ...offer,
          isChecked: !offer.isChecked,
        };
      }

      return offer;
    });
    this._updateState({ offers: updatedOffers }, true);
  }

  _priceChangeHandler(evt) {
    if (Number(evt.target.value) <= 0) {
      evt.target.value = this._state.basePrice;
    }

    this._updateState({ basePrice: evt.target.value }, true);
  }

  _priceInputHandler(evt) {
    evt.target.value = Number(replaceNotNumberCharacter(evt.target.value));
  }

  _typeChangeHandler(evt) {
    evt.preventDefault();
    const type = evt.target.value;
    const { offers } = mockOffers.get(type);
    this._updateState({ type, offers });
  }

  static parsePointToState(point, isEditMode) {
    return { ...point, isEditMode };
  }

  static parseStateToPoint(state) {
    const newPoint = { ...state };
    delete newPoint.isEditMode;
    return newPoint;
  }
}
