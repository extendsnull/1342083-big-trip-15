import AbstractView from './abstract';
import {getArrayFirstItem, getArrayLastItem} from '../utils/array';
import {formatTitle, formatDates} from '../utils/info';


const getMainInfoTemplate = (infoState) => {
  const {destinations, dates, cost} = infoState;
  const [dateFrom] = getArrayFirstItem(dates);
  const [, dateTo] = getArrayLastItem(dates);

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

const getInfoTemplate = (infoState) => (`
  <div class="trip-main">
    ${!infoState.isEmpty ? getMainInfoTemplate(infoState) : ''}

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

export default class Info extends AbstractView {
  constructor(infoState) {
    super();
    this._infoState = infoState;
  }

  getTemplate() {
    return getInfoTemplate(this._infoState);
  }
}
