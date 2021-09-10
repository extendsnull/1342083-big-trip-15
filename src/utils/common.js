import { nanoid } from 'nanoid';
import { KeyName } from '../const';

export const addLeadZero = (value) => String(value).padStart(2, '0');

export const formatLabel = (type) => {
  const [firstLetter, ...restLetters] = type;
  restLetters.unshift(firstLetter.toUpperCase());
  return restLetters.join('');
};

export const getRandomId = (length = 6) => nanoid(length);

export const getRandomIntInclusive = (min = 0, max = 1) => {
  const restrict = {
    min: Math.ceil(min),
    max: Math.floor(max),
  };
  return Math.floor(Math.random() * (restrict.max - restrict.min + 1)) + restrict.min;
};

export const getRandomBoolean = () => Boolean(getRandomIntInclusive());

export const isEscKey = (key) => KeyName.ESC === key;

export const replaceNotNumberCharacter = (value) => String(value).replace(/\D/gi, '');
