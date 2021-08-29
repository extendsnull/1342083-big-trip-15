import { FilterType } from '../const';
import { isFutureDate, isPastDate } from '../utils/date';

const filterControls = [FilterType.EVERYTHING, FilterType.FUTURE, FilterType.PAST];
const checkedFilter = FilterType.EVERYTHING;

export const getFilterState = (points) => {
  const futureItems = points.filter((point) => isFutureDate(point.dateFrom));
  const pastItems = points.filter((point) => isPastDate(point.dateTo));

  return filterControls.map((name) => {
    const isChecked = name === checkedFilter;
    let isDisabled = null;
    let items = null;

    switch (name) {
      case FilterType.EVERYTHING: {
        items = points;
        isDisabled = !points.length;
        break;
      }
      case FilterType.FUTURE: {
        items = futureItems;
        isDisabled = !futureItems.length;
        break;
      }
      case FilterType.PAST: {
        items = pastItems;
        isDisabled = !pastItems.length;
        break;
      }
    }

    return { items, name, isChecked, isDisabled };
  });
};
