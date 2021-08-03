import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import {getRandomIntInclusive, getRandomBoolean, getRandomArrayItem, shuffleArray} from '../utils';
import {Point} from '../const';

dayjs.extend(duration);

export const MockPoint = {
  COUNT: 20,
  CITIES: Point.MOCK_CITIES,
  DESCRIPTIONS: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'Cras aliquet varius magna, non porta ligula feugiat eget.', 'Fusce tristique felis at fermentum pharetra.', 'Aliquam id orci ut lectus varius viverra.', 'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.', 'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.', 'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.', 'Sed sed nisi sed augue convallis suscipit in sed felis.', 'Aliquam erat volutpat.', 'Nunc fermentum tortor ac porta dapibus.', 'In rutrum ac purus sit amet tempus.'],
  OFFERS: [
    { name: 'luggage', label: 'Add luggage', price: 30 },
    { name: 'comfort', label: 'Switch to comfort class', price: 100 },
    { name: 'meal', label: 'Add meal', price: 15 },
    { name: 'seats', label: 'Choose seats', price: 5 },
    { name: 'train', label: 'Travel by train', price: 40 },
  ],
  DATE_GAP: dayjs.duration({ days: 3 }).asMilliseconds(),
  DESCRIPTION_RESTRICT: {
    MIN: 1,
    MAX: 5,
  },
  PHOTO_RESTRICT: {
    MIN: 1,
    MAX: 10,
  },
  PRICE_RESTRICT: {
    MIN: 10,
    MAX: 420,
  },
};

const getRandomDescription = () => {
  const descriptionLength = getRandomIntInclusive(MockPoint.DESCRIPTION_RESTRICT.MIN, MockPoint.DESCRIPTION_RESTRICT.MAX);

  if (descriptionLength) {
    return shuffleArray([...MockPoint.DESCRIPTIONS])
      .slice(0, descriptionLength)
      .join(' ');
  }

  return null;
};

const getRandomPhotos = () => {
  const photosCount = getRandomIntInclusive(MockPoint.PHOTO_RESTRICT.MIN, MockPoint.PHOTO_RESTRICT.MAX);

  if (photosCount) {
    return Array.from(new Array(photosCount), () => ({
      src: `http://picsum.photos/248/152?r=${Math.random()}`,
      alt: getRandomArrayItem(MockPoint.DESCRIPTIONS),
    }));
  }

  return null;
};

const getRandomDestination = () => ({
  title: getRandomArrayItem(MockPoint.CITIES),
  description: getRandomDescription(),
  photos: getRandomPhotos(),
});

const getRandomOffers = () => {
  const hasOffers = getRandomBoolean();

  if (!hasOffers) {
    return null;
  }

  const offersCount = getRandomIntInclusive(0, MockPoint.OFFERS.length - 1);
  const offers = [...MockPoint.OFFERS].map((offer) => {
    offer.isChecked = getRandomBoolean();
    return offer;
  });

  return shuffleArray(offers).slice(0, offersCount);
};

const getRandomDates = () => {
  const firstDate = dayjs().add(
    getRandomIntInclusive(-MockPoint.DATE_GAP, MockPoint.DATE_GAP),
    'ms',
  );
  const secondDate = dayjs().add(
    getRandomIntInclusive(-MockPoint.DATE_GAP, MockPoint.DATE_GAP),
    'ms',
  );

  const lower = Math.min(firstDate, secondDate);
  const upper = Math.max(firstDate, secondDate);

  return [lower, upper];
};

const getMockPoint = () => {
  const [dateFrom, dateTo] = getRandomDates();

  return {
    type: getRandomArrayItem(Point.TYPES),
    destination: getRandomDestination(),
    offers: getRandomOffers(),
    basePrice: getRandomIntInclusive(MockPoint.PRICE_RESTRICT.MIN, MockPoint.PRICE_RESTRICT.MAX),
    dateFrom,
    dateTo,
    isFavorite: getRandomBoolean(),
  };
};

export const getMockPoints = (count = MockPoint.COUNT) =>
  Array
    .from(new Array(count), () => getMockPoint())
    .sort((pointA, pointB) => pointA.dateFrom - pointB.dateFrom);
