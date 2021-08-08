import {isFutureDate, isPastDate} from '../utils';

export const getFiltersState = (points) => {
  const futureItems = points.filter((point) => isFutureDate(point.dateFrom));
  const pastItems = points.filter((point) => isPastDate(point.dateTo));

  return {
    everything: {
      items: points,
      disabled: !points.length,
    },
    future: {
      items: futureItems,
      disabled: !futureItems.length,
    },
    past: {
      items: pastItems,
      disabled: !pastItems.length,
    },
  };
};
