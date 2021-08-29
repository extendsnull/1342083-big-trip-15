import { getDatesDiff } from './date';

export const sortByDuration = (items) => items.slice().sort((item1, item2) => {
  const diff1 = getDatesDiff(item1.dateFrom, item1.dateTo);
  const diff2 = getDatesDiff(item2.dateFrom, item2.dateTo);
  return diff2 - diff1;
});

export const sortByPrice = (items) => items.slice().sort((item1, item2) => item2.basePrice - item1.basePrice);
