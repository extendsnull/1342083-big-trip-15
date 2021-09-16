import { getDuration } from '../utils/date';

export const sortPointsByMoney = (points) => {
  const typeToBasePrice = points.reduce((acc, point) => {
    const type = point.type;

    if (!acc[type]) {
      acc[type] = 0;
    }

    acc[type] += point.basePrice;

    return acc;
  }, {});

  const sortedByMoney = Object.entries(typeToBasePrice).sort(([, a], [, b]) => b - a);
  return Object.fromEntries(sortedByMoney);
};

export const sortPointsByType = (points) => {
  const typeToCount = points.reduce((acc, point) => {
    const type = point.type;

    if (!acc[type]) {
      acc[type] = 0;
    }

    acc[type] += 1;

    return acc;
  }, {});

  const sortedByCount = Object.entries(typeToCount).sort(([, a], [, b]) => b - a);
  return Object.fromEntries(sortedByCount);
};

export const sortPointByDuration = (points) => {
  const typeToDuration = points.reduce((acc, point) => {
    const type = point.type;

    if (!acc[type]) {
      acc[type] = 0;
    }

    acc[type] += getDuration(point.dateFrom, point.dateTo).asMilliseconds();
    return acc;
  }, {});

  const sortedByCount = Object.entries(typeToDuration).sort(([, a], [, b]) => b - a);
  return Object.fromEntries(sortedByCount);
};
