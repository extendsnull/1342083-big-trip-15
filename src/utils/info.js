import { MAIN_TITLE_MAX_LENGTH, HumanDateFormatPattern, TextSeparator } from '../const';
import { getArrayFirstItem, getArrayLastItem } from './array';
import { formatDate, isOneMonthDates } from './date';

export const formatTitle = (destinations) => {
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

export const formatDates = (dateFrom, dateTo) => {
  const secondDateFormatPattern =
    isOneMonthDates(dateFrom, dateTo)
      ? HumanDateFormatPattern.ONLY_DAY
      : HumanDateFormatPattern.MONTH_DAY;

  return [
    formatDate(dateFrom, HumanDateFormatPattern.MONTH_DAY),
    formatDate(dateTo, secondDateFormatPattern),
  ].join(TextSeparator.DATES);
};
