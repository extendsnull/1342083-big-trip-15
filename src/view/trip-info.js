import {DateFormatPattern} from '../const';
import {formatDate, isOneMonthDates} from '../utils';

const formatTitle = (destinations) => {
  const separator = ' &mdash; ';

  if (destinations.length > 3) {
    const firstDestination = destinations[0];
    const lastDestination = destinations[destinations.length - 1];
    return [firstDestination, '...', lastDestination].join(separator);
  }

  if (destinations.length) {
    return destinations.join(separator);
  }

  return '';
};

const formatDates = (dateFrom, dateTo) => {
  const separator = '&nbsp;&mdash;&nbsp;';
  const secondDateFormatPattern =
    isOneMonthDates(dateFrom, dateTo)
      ? DateFormatPattern.HUMAN.ONLY_DAY
      : DateFormatPattern.HUMAN.MONTH_DAY;

  return [
    formatDate(dateFrom, DateFormatPattern.HUMAN.MONTH_DAY),
    formatDate(dateTo, secondDateFormatPattern),
  ].join(separator);
};

export const getTripInfoTemplate = (props) => {
  const {destinations, dates, cost} = props;
  const [dateFrom] = dates[0];
  const [, dateTo] = dates[dates.length - 1];

  return `
    <section class="trip-main__trip-info trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${formatTitle(destinations)}</h1>
        <p class="trip-info__dates">${formatDates(dateFrom, dateTo)}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
      </p>
    </section>`;
};
