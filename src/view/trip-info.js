import {MAIN_TITLE_MAX_LENGTH, HumanDateFormatPattern, TextSeparator} from '../const';
import {formatDate, isOneMonthDates} from '../utils';

const formatTitle = (destinations) => {
  if (destinations.length > MAIN_TITLE_MAX_LENGTH) {
    const firstDestination = destinations[0];
    const lastDestination = destinations[destinations.length - 1];
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
