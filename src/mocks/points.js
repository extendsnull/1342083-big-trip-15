import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { nanoid } from 'nanoid';
import { getRandomIntInclusive, getRandomBoolean } from '../utils/common';
import { getRandomArrayItem, shuffleArray } from '../utils/array';

const POINT_COUNT = 20;
const DAYS_GAP = 3;

const PriceRestrict = {
  MIN: 10,
  MAX: 420,
};

dayjs.extend(duration);
const dateGap = dayjs.duration({ days: DAYS_GAP }).asMilliseconds();

const getRandomDates = (restrict) => {
  const firstDate = dayjs().add(getRandomIntInclusive(-restrict, restrict), 'ms');
  const secondDate = dayjs().add(getRandomIntInclusive(-restrict, restrict), 'ms');

  const lower = Math.min(firstDate, secondDate);
  const upper = Math.max(firstDate, secondDate);

  return [lower, upper];
};

const getMockPoint = (destination, mockOffers) => {
  const { type, offers } = getRandomArrayItem(mockOffers);
  const [dateFrom, dateTo] = getRandomDates(dateGap);
  offers.forEach((offer) => offer.isChecked = getRandomBoolean());

  return {
    id: nanoid(),
    type,
    destination,
    offers,
    basePrice: getRandomIntInclusive(PriceRestrict.MIN, PriceRestrict.MAX),
    dateFrom,
    dateTo,
    isExpired: dateTo < Date.now(),
    isFavorite: getRandomBoolean(),
  };
};

export const getMockPoints = (mockOffers, mockDestinations, count = POINT_COUNT) => {
  mockOffers = [...mockOffers.values()];
  const points =
    shuffleArray(mockDestinations).slice(0, count).map((destination) => getMockPoint(destination, mockOffers));
  return points;
};
