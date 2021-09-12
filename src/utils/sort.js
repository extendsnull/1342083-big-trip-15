import { getDatesDiff, getTimestamp } from './date';

export const sortByDateFrom = (point1, point2) => getTimestamp(point1.dateFrom) - getTimestamp(point2.dateFrom);

export const sortByDateTo = (point1, point2) => getTimestamp(point2.dateTo) - getTimestamp(point1.dateTo);

export const sortByDuration = (point1, point2) => {
  const diff1 = getDatesDiff(point1.dateFrom, point1.dateTo);
  const diff2 = getDatesDiff(point2.dateFrom, point2.dateTo);
  return diff2 - diff1;
};

export const sortByPrice = (point1, point2) => point2.basePrice - point1.basePrice;
