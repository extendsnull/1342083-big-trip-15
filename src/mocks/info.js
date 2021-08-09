export const getInfoState = (points) => {
  const destinations = points.map((point) => point.destination.title);
  const dates = points.map((point) => [point.dateFrom, point.dateTo]);
  const cost = points.reduce((mainAcc, point) => {
    const offersPrice =
      Array.isArray(point.offers)
        ? point.offers.reduce((offerAcc, offer) => offerAcc + offer.price, 0)
        : 0;

    return mainAcc + point.basePrice + offersPrice;
  }, 0);
  const isEmpty = points.every((point) => point.isExpired);

  return {
    destinations,
    dates,
    cost,
    isEmpty,
  };
};
