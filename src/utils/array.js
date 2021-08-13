import {RANDOM_SEPARATOR} from '../const';
import {getRandomIntInclusive} from './common';

export const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntInclusive(0, array.length - 1);
  return array[randomIndex];
};

export const shuffleArray = (array) =>
  array.slice().sort(() => Math.random() - RANDOM_SEPARATOR);

export const getArrayFirstItem = (array) => {
  if (!Array.isArray(array)) {
    return null;
  }

  return array[0];
};

export const getArrayLastItem = (array) => {
  if (!Array.isArray(array)) {
    return null;
  }

  return array[array.length - 1];
};
