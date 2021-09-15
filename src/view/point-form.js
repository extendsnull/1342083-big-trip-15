import Smart from './smart';
import { BLANK_DESTINATION, DateFieldId, HumanDateFormatPattern } from '../const';
import { formatLabel, replaceNotNumberCharacter } from '../utils/common';
import { formatDate, getISOString } from '../utils/date';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const ButtonText = {
  CANCEL: 'Cancel',
  DELETE: 'Delete',
  DELETING: 'Deleting...',
  SAVE: 'Save',
  SAVING: 'Saving...',
};

const DATEPICKER_BASE_SETTINGS = {
  dateFormat: HumanDateFormatPattern.DEFAULT_FLATPICKR,
  enableTime: true,
  'time_24hr': true,
};

const getTypeItemsTemplate = (types, currentType) => {
  const template = types.map((type) => {
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

const getDestinationItemsTemplate = (cities) => cities.map((city) => `<option value="${city}"></option>`).join('\n');

const getResetButtonTemplate = (isDisabled, isDeleting, isEditMode) => {
  let buttonText = isEditMode ? ButtonText.DELETE : ButtonText.CANCEL;

  if (isDeleting) {
    buttonText =  ButtonText.DELETING;
  }

  return `
    <button
      class="event__reset-btn"
      type="reset"
      ${isDisabled ? 'disabled' : ''}
    >
      ${buttonText}
    </button>`;
};

const getRollupButtonTemplate = (isDisabled) => (`
  <button
    class="event__rollup-btn"
    type="button"
    ${isDisabled ? 'disabled' : ''}
  >
    <span class="visually-hidden">Close event edit</span>
  </button>`);

const getOffersTemplate = (offers, hasOffers, isDisabled) => {
  if (hasOffers) {
    const template = offers.map((offer, index) => {
      const { title, price, isSelected } = offer;
      return `
        <div class="event__offer-selector">
          <input
            class="event__offer-checkbox visually-hidden"
            id="event-offer-${index}"
            type="checkbox"
            name="event-offer-${index}"
            value="${title}"
            ${isSelected ? 'checked' : ''}
            ${isDisabled ? 'disabled' : ''}
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

const getDescriptionTemplate = (description, hasDescription) => {
  if (hasDescription) {
    return `<p class="event__destination-description">${description}</p>`;
  }

  return '';
};

const getPicturesTemplate = (pictures, hasPictures) => {
  if (hasPictures) {
    const template = pictures.map((picture) => {
      const { src, description } = picture;
      return `
        <img
          class="event__photo"
          src="${src}"
          alt="${description}"
        >`;
    }).join('\n');

    return `
      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${template}
        </div>
      </div>`;
  }

  return '';
};

const getDestinationTemplate = (destination, hasDescription, hasPictures) => {
  const hasDestinationInfo = hasDescription || hasPictures;

  if (hasDestinationInfo) {
    const { description, pictures } = destination;

    return `
      <section class="event__section event__section--destination">
        <h3 class="event__section-title event__section-title--destination">Destination</h3>
        ${getDescriptionTemplate(description, hasDescription)}
        ${getPicturesTemplate(pictures, hasPictures)}
      </section>`;
  }

  return '';
};

const getDetailsTemplate = (point, availableOffers, isDisabled) => {
  const { type, destination } = point;
  const offers = availableOffers.size
    ? availableOffers
      .get(type)
      .map((offer) => ({
        ...offer,
        isSelected: Boolean(point.offers.find((pointOffer) => pointOffer.title === offer.title)),
      }))
    : [];

  const hasOffers = Boolean(offers.length);
  const hasDescription = Boolean(destination.description);
  const hasPictures = Boolean(destination.pictures.length);

  const hasDetails = hasOffers || hasDescription || hasPictures;

  if (hasDetails) {
    return `
      <section class="event__details">
        ${getOffersTemplate(offers, hasOffers, isDisabled)}
        ${getDestinationTemplate(destination, hasDescription, hasPictures)}
      </section>`;
  }

  return '';
};

const getPointFormTemplate = (point, destinations, offers, isEditMode) => {
  const { type, destination, dateFrom, dateTo, basePrice, isValid, isDisabled, isSaving, isDeleting } = point;

  const types = Array.from(offers.keys());
  const cities = Array.from(destinations.keys());

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
              ${isDisabled ? 'disabled' : ''}
            >

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${getTypeItemsTemplate(types, type)}
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
              ${isDisabled ? 'disabled' : ''}
            >
            <datalist id="destination-list">
              ${getDestinationItemsTemplate(cities)}
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
              ${isDisabled ? 'disabled' : ''}
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
              ${isDisabled ? 'disabled' : ''}
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
              ${isDisabled ? 'disabled' : ''}
            >
          </div>

          <button
            class="event__save-btn btn btn--blue"
            type="submit"
            ${isDisabled || !isValid ? 'disabled' : ''}
          >
            ${isSaving ? ButtonText.SAVING : ButtonText.SAVE}
          </button>
          ${getResetButtonTemplate(isDisabled, isDeleting, isEditMode)}
          ${isEditMode ? getRollupButtonTemplate(isDisabled) : ''}
        </header>
        ${getDetailsTemplate(point, offers, isDisabled)}
      </form>
    </li>`;
};

export default class PointForm extends Smart {
  constructor(point, destinations, offers, isEditMode = false) {
    super();
    this._state = PointForm.parsePointToState(point);

    this._destinations = destinations;
    this._offers = offers;

    this._isEditMode = isEditMode;
    this._datepickers = null;

    this._bindContext();
    this._setInnerHandlers();
  }

  removeElement() {
    super.removeElement();

    if (this._datepickers) {
      this._resetDatepickers();
    }
  }

  _getTemplate() {
    return getPointFormTemplate(this._state, this._destinations, this._offers, this._isEditMode);
  }

  _restoreHandlers() {
    this._setInnerHandlers();
    this.setDeleteClickHandler(this._callback.deleteClick);
    this.setResetClickHandler(this._callback.resetClick);
    this.setSubmitHandler(this._callback.submit);
  }

  updateState(stateUpdate, updateStateOnly) {
    super.updateState(stateUpdate, updateStateOnly);
    this._state = PointForm.parsePointToState(this._state);
  }

  reset(point) {
    this.updateState(PointForm.parsePointToState(point));
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector('.event__reset-btn').addEventListener('click', this._deleteClickHandler);
  }

  setResetClickHandler(callback) {
    const resetButton = this.getElement().querySelector('.event__rollup-btn');

    if (resetButton) {
      this._callback.resetClick = callback;
      resetButton.addEventListener('click', this._resetClickHandler);
    }
  }

  setSubmitHandler(callback) {
    this._callback.submit = callback;
    this.getElement().addEventListener('submit', this._submitHandler);
  }

  _bindContext() {
    this._dateChangeHandler = this._dateChangeHandler.bind(this);
    this._deleteClickHandler = this._deleteClickHandler.bind(this);
    this._destinationChangeHandler = this._destinationChangeHandler.bind(this);
    this._offerChangeHandler = this._offerChangeHandler.bind(this);
    this._priceInputHandler = this._priceInputHandler.bind(this);
    this._resetClickHandler = this._resetClickHandler.bind(this);
    this._submitHandler = this._submitHandler.bind(this);
    this._typeChangeHandler = this._typeChangeHandler.bind(this);
  }

  _getElements() {
    this._dateFromField = this.getElement().querySelector(`#${DateFieldId.FROM}`);
    this._dateToField = this.getElement().querySelector(`#${DateFieldId.TO}`);
    this._destinationField = this.getElement().querySelector('.event__input--destination');
    this._priceField = this.getElement().querySelector('.event__input--price');
    this._availableOffers = this.getElement().querySelector('.event__available-offers');
    this._typeGroup = this.getElement().querySelector('.event__type-group');
    this._dateFields = this.getElement().querySelectorAll('.event__input--time');
  }

  _resetDatepickers() {
    Object.values(this._datepickers).forEach((datepicker) => datepicker.destroy());
    this._datepickers = null;
  }

  _setDatepickers() {
    if (this._datepickers) {
      this._resetDatepickers();
    }

    const dateFromPicker = flatpickr(
      this._dateFromField,
      {
        ...DATEPICKER_BASE_SETTINGS,
        defaultDate: this._state.dateFrom,
        maxDate: this._state.dateTo,
        onChange: this._dateChangeHandler,
      },
    );
    const dateToPicker = flatpickr(
      this._dateToField,
      {
        ...DATEPICKER_BASE_SETTINGS,
        defaultDate: this._state.dateTo,
        minDate: this._state.dateFrom,
        onChange: this._dateChangeHandler,
      },
    );

    this._datepickers = {
      from: dateFromPicker,
      to: dateToPicker,
    };
  }

  _validForm() {
    const saveButton = this.getElement().querySelector('.event__save-btn');
    saveButton.disabled = !this._state.isValid;
  }

  _setInnerHandlers() {
    this._getElements();

    this._destinationField.addEventListener('change', this._destinationChangeHandler);
    this._priceField.addEventListener('input', this._priceInputHandler);
    this._typeGroup.addEventListener('change', this._typeChangeHandler);

    if (this._availableOffers) {
      this._availableOffers.addEventListener('change', this._offerChangeHandler);
    }

    this._setDatepickers();
  }

  _dateChangeHandler(selectedDates, dateStr, instance) {
    const [date] = selectedDates;
    const { id } = instance.element;
    const value = getISOString(date);

    switch (id) {
      case DateFieldId.FROM: {
        this.updateState({ dateFrom: value }, true);
        this._datepickers.to.set('minDate', value);
        break;
      }
      case DateFieldId.TO: {
        this.updateState({ dateTo: value }, true);
        this._datepickers.from.set('maxDate', value);
        break;
      }
    }

    this._validForm();
  }

  _deleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(PointForm.parseStateToPoint(this._state));
  }

  _destinationChangeHandler(evt) {
    const destination = this._destinations.get(evt.target.value) || { ...BLANK_DESTINATION };
    this.updateState({ destination });
    this._validForm();
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
    const update = this._offers.get(this._state.type).find((offer) => offer.title === evt.target.value);
    const offers = PointForm.updateOffers(this._state.offers, update);
    this.updateState({ offers }, true);
  }

  _priceChangeHandler(evt) {
    const basePrice = Number(evt.target.value);

    if (basePrice <= 0) {
      evt.target.value = 0;
    }

    this.updateState({ basePrice }, true);
    this._validForm();
  }

  _priceInputHandler(evt) {
    const basePrice = Number(replaceNotNumberCharacter(evt.target.value));
    evt.target.value = basePrice;

    this.updateState({ basePrice }, true);
    this._validForm();
  }

  _typeChangeHandler(evt) {
    evt.preventDefault();
    const type = evt.target.value;
    this.updateState({ type, offers: [] });
  }

  static parsePointToState(point) {
    return {
      ...point,
      isValid: Boolean(point.destination.name && point.basePrice && point.dateFrom && point.dateTo),
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    };
  }

  static parseStateToPoint(state) {
    const newPoint = { ...state };
    ['isValid', 'isDisabled', 'isSaving', 'isDeleting'].forEach((key) => delete newPoint[key]);
    return newPoint;
  }

  static updateOffers(offers, update) {
    const updateIndex = offers.findIndex((offer) => offer.title === update.title);

    if (updateIndex === -1) {
      return [...offers, update];
    }

    return [
      ...offers.slice(0, updateIndex),
      ...offers.slice(updateIndex + 1),
    ];
  }
}
