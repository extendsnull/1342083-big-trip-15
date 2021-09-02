import { MAIN_TITLE_MAX_LENGTH, HumanDateFormatPattern, TextSeparator } from '../const';
import { getArrayFirstItem, getArrayLastItem } from './array';
import { formatDate, isOneMonthDates } from './date';
import { sortByDateFrom, sortByDateTo } from './sort';

const getTripDestinations = (points) =>
  points.slice().sort(sortByDateFrom).map((point) => point.destination.name);

const formatTitle = (destinations) => {
  if (destinations.length > MAIN_TITLE_MAX_LENGTH) {
    const firstDestination = getArrayFirstItem(destinations);
    const lastDestination = getArrayLastItem(destinations);

    return `${firstDestination}${TextSeparator.TITLE}...${TextSeparator.TITLE}${lastDestination}`;
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

const getTripTerms = (points) => {
  const { dateFrom } = getArrayFirstItem(points.slice().sort(sortByDateFrom));
  const { dateTo } = getArrayFirstItem(points.slice().sort(sortByDateTo));

  return formatDates(dateFrom, dateTo);
};

const getTotalCost = (points) => points.reduce((acc, point) => {
  const offersPrice = point.offers.reduce((offerAcc, offer) => offer.isChecked ? offerAcc + offer.price : offerAcc, 0);
  return acc + point.basePrice + offersPrice;
}, 0);

export const getTripInfo = (points) => {
  const title = formatTitle(getTripDestinations(points));
  const terms = getTripTerms(points);
  const totalCost = getTotalCost(points);

  return { title, terms, totalCost };
};
