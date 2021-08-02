import {isFutureDate, isPastDate} from '../utils';

export const getFiltersState = (points) => {
  const futureItems = points.filter((point) => isFutureDate(point.dateFrom));
  const pastItems = points.filter((point) => isPastDate(point.dateTo));

  return {
    everything: {
      items: points,
      disabled: Boolean(points.length === 0),
    },
    future: {
      items: futureItems,
      disabled: Boolean(futureItems.length === 0),
    },
    past: {
      items: pastItems,
      disabled: Boolean(pastItems.length === 0),
    },
  };
};
