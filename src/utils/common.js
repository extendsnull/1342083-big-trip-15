import { KeyName } from '../const';

export const formatLabel = (type) => {
  const [firstLetter, ...restLetters] = type;
  restLetters.unshift(firstLetter.toUpperCase());
  return restLetters.join('');
};

export const getRandomIntInclusive = (min = 0, max = 1) => {
  const restrict = {
    min: Math.ceil(min),
    max: Math.floor(max),
  };
  return Math.floor(Math.random() * (restrict.max - restrict.min + 1)) + restrict.min;
};

export const getRandomBoolean = () => Boolean(getRandomIntInclusive());

export const isEscKey = (key) => KeyName.ESC === key;

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [...items.slice(0, index), update, ...items.slice(index + 1)];
};
