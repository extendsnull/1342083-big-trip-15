import {MAIN_TITLE_MAX_LENGTH, HumanDateFormatPattern, TextSeparator} from '../const';
import {createElement, getArrayFirst, getArrayLast, formatDate, isOneMonthDates} from '../utils';

const formatTitle = (destinations) => {
  if (destinations.length > MAIN_TITLE_MAX_LENGTH) {
    const firstDestination = getArrayFirst(destinations);
    const lastDestination = getArrayLast(destinations);
    return [firstDestination, '...', lastDestination].join(TextSeparator.TITLE);
  }

  if (destinations.length) {
    return destinations.join(TextSeparator.TITLE);
  }

  return '';
};

const formatDates = (dateFrom, dateTo) => {
  const secondDateFormatPattern =
    isOneMonthDates(dateFrom, dateTo)
      ? HumanDateFormatPattern.ONLY_DAY
      : HumanDateFormatPattern.MONTH_DAY;

  return [
    formatDate(dateFrom, HumanDateFormatPattern.MONTH_DAY),
    formatDate(dateTo, secondDateFormatPattern),
  ].join(TextSeparator.DATES);
};

const getMainInfoTemplate = (props) => {
  const {destinations, dates, cost} = props;
  const [dateFrom] = dates[0];
  const [, dateTo] = dates[dates.length - 1];

  return `
    <section class="trip-main__trip-info trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">
          ${formatTitle(destinations)}
        </h1>
        <p class="trip-info__dates">
          ${formatDates(dateFrom, dateTo)}
        </p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
      </p>
    </section>`;
};

const getInfoTemplate = (props) => (`
  <div class="trip-main">
    ${!props.isEmpty ? getMainInfoTemplate(props) : ''}

    <div class="trip-main__trip-controls trip-controls">
      <div class="trip-controls__navigation">
        <h2 class="visually-hidden">Switch trip view</h2>
      </div>

      <div class="trip-controls__filters">
        <h2 class="visually-hidden">Filter events</h2>
      </div>
    </div>

    <button
      class="trip-main__event-add-btn btn btn--big btn--yellow"
      type="button"
    >New event</button>
  </div>`);

export default class Info {
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
    return getInfoTemplate(this._props);
  }
}
