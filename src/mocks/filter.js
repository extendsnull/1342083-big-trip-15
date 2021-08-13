import {FILTER_CONTROLS} from '../const';
import {isFutureDate, isPastDate} from '../utils/date';

export const getFilterState = (points) => {
  const futureItems = points.filter((point) => isFutureDate(point.dateFrom));
  const pastItems = points.filter((point) => isPastDate(point.dateTo));

  return FILTER_CONTROLS.map((control) => {
    let items = null;
    let disabled = null;

    switch (control.name) {
      case 'everything': {
        items = points;
        disabled = !points.length;
        break;
      }
      case 'future': {
        items = futureItems;
        disabled = !futureItems.length;
        break;
      }
      case 'past': {
        items = pastItems;
        disabled = !pastItems.length;
        break;
      }
    }

    return {
      ...control,
      items,
      disabled,
    };
  });
};
