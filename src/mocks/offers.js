import { shuffleArray } from '../utils/array';
import { getRandomIntInclusive } from '../utils/common';

const TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const OFFERS = [
  { title: 'Add luggage', price: 30 },
  { title: 'Switch to comfort class', price: 100 },
  { title: 'Add meal', price: 15 },
  { title: 'Choose seats', price: 5 },
  { title: 'Travel by train', price: 40 },
];

const getMockOffer = (type) => {
  const offersCount = getRandomIntInclusive(0, OFFERS.length - 1);
  const offers = shuffleArray(OFFERS).slice(0, offersCount);
  return { type, offers };
};

export const getMockOffers = () => new Map(TYPES.map((type) => [type, getMockOffer(type)]));
