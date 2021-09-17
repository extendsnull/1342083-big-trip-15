const ESC_KEYNAME = 'Escape';

export const addLeadZero = (value) => String(value).padStart(2, '0');

export const formatLabel = (type) => {
  const [firstLetter, ...restLetters] = type;
  restLetters.unshift(firstLetter.toUpperCase());
  return restLetters.join('');
};

export const isEscKey = (key) => key === ESC_KEYNAME;

export const isOnline = () => window.navigator.onLine;
