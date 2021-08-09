import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import {getRandomIntInclusive, getRandomBoolean, getRandomArrayItem, shuffleArray} from '../utils';
import {DAYS_GAP, MOCK_CITIES, POINT_TYPES} from '../const';

const POINT_COUNT = 20;

const DescriptionSizeRestrict = {
  MIN: 1,
  MAX: 5,
};

const PhotoCountRestrict = {
  MIN: 1,
  MAX: 10,
};

const PriceRestrict = {
  MIN: 10,
  MAX: 420,
};

const mockDescriptions = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'Cras aliquet varius magna, non porta ligula feugiat eget.', 'Fusce tristique felis at fermentum pharetra.', 'Aliquam id orci ut lectus varius viverra.', 'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.', 'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.', 'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.', 'Sed sed nisi sed augue convallis suscipit in sed felis.', 'Aliquam erat volutpat.', 'Nunc fermentum tortor ac porta dapibus.', 'In rutrum ac purus sit amet tempus.'];

const mockOffers = [
  { name: 'luggage', label: 'Add luggage', price: 30 },
  { name: 'comfort', label: 'Switch to comfort class', price: 100 },
  { name: 'meal', label: 'Add meal', price: 15 },
  { name: 'seats', label: 'Choose seats', price: 5 },
  { name: 'train', label: 'Travel by train', price: 40 },
];

dayjs.extend(duration);
const dateGap = dayjs.duration({ days: DAYS_GAP }).asMilliseconds();

const getRandomDescription = () => {
  const descriptionLength = getRandomIntInclusive(DescriptionSizeRestrict.MIN, DescriptionSizeRestrict.MAX);

  if (descriptionLength) {
    return shuffleArray([...mockDescriptions])
      .slice(0, descriptionLength)
      .join(' ');
  }

  return null;
};

const getRandomPhotos = () => {
  const photosCount = getRandomIntInclusive(PhotoCountRestrict.MIN, PhotoCountRestrict.MAX);

  if (photosCount) {
    return Array.from(new Array(photosCount), () => ({
      src: `http://picsum.photos/248/152?r=${Math.random()}`,
      alt: getRandomArrayItem(mockDescriptions),
    }));
  }

  return null;
};

const getRandomDestination = () => ({
  title: getRandomArrayItem(MOCK_CITIES),
  description: getRandomDescription(),
  photos: getRandomPhotos(),
});

const getRandomOffers = () => {
  const hasOffers = getRandomBoolean();

  if (!hasOffers) {
    return null;
  }

  const offersCount = getRandomIntInclusive(0, mockOffers.length - 1);
  const offers = [...mockOffers].map((offer) => {
    offer.isChecked = getRandomBoolean();
    return offer;
  });

  return shuffleArray(offers).slice(0, offersCount);
};

const getRandomDates = (restrict) => {
  const firstDate = dayjs().add(
    getRandomIntInclusive(-restrict, restrict),
    'ms',
  );
  const secondDate = dayjs().add(
    getRandomIntInclusive(-restrict, restrict),
    'ms',
  );

  const lower = Math.min(firstDate, secondDate);
  const upper = Math.max(firstDate, secondDate);

  return [lower, upper];
};

const getMockPoint = () => {
  const [dateFrom, dateTo] = getRandomDates(dateGap);

  return {
    type: getRandomArrayItem(POINT_TYPES),
    destination: getRandomDestination(),
    offers: getRandomOffers(),
    basePrice: getRandomIntInclusive(PriceRestrict.MIN, PriceRestrict.MAX),
    dateFrom,
    dateTo,
    isExpired: dateTo < Date.now(),
    isFavorite: getRandomBoolean(),
  };
};

export const getMockPoints = (count = POINT_COUNT) =>
  Array
    .from(new Array(count), () => getMockPoint())
    .sort((pointA, pointB) => pointA.dateFrom - pointB.dateFrom);
