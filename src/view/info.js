import AbstractView from './abstract';
import { getArrayFirstItem, getArrayLastItem } from '../utils/array';
import { formatTitle, formatDates } from '../utils/info';

const getInfoTemplate = (data) => {
  const {destinations, dates, cost} = data;
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

export default class InfoView extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
  }

  _getTemplate() {
    return getInfoTemplate(this._data);
  }
}
