import {KeyName} from '../const';

export const getRandomIntInclusive = (min = 0, max = 1) => {
  const restrict = {
    min: Math.ceil(min),
    max: Math.floor(max),
  };
  return Math.floor(Math.random() * (restrict.max - restrict.min + 1)) + restrict.min;
};

export const getRandomBoolean = () => Boolean(getRandomIntInclusive());

export const isEscKey = (key) => KeyName.ESC.indexOf(key) > -1;
