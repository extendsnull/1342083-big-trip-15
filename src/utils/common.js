const ESC_KEYNAME = 'Escape';

export const addLeadZero = (value) => String(value).padStart(2, '0');

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

export const isEscKey = (key) => key === ESC_KEYNAME;

export const isOnline = () => window.navigator.onLine;
