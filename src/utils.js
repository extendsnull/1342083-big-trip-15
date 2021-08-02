import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import {DateFormatPattern, RANDOM_SEPARATOR} from './const';

dayjs.extend(duration);

/**
 * Отрисовывает компоненты.
 * @param {HTMLElement} element элемент, по отношению к которому происходит вставка компонента.
 * @param {string} html разметка для компонента.
 * @param {InsertPosition} where местоположение компонента (см. {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML insertAdjacentHTML}). Значение по-умолчанию: `beforeend`.
 */
export const render = (element, html, where = 'beforeend') => {
  element.insertAdjacentHTML(where, html);
};

/**
 * Возвращает случайное целое число в заданном интервале. Возвращаемое значение не менее `min` (или следующее целое число, которое больше `min`, если `min` не целое) и не более (включительно) `max` ({@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_integer_between_two_values_inclusive MDN}).
 * @param {number} min минимальное значение.
 * @param {number} max максимальное значение (включительно).
 * @returns {number} случайное целое число в заданном интервале.
 */
export const getRandomIntInclusive = (min = 0, max = 1) => {
  const restrict = {
    min: Math.ceil(min),
    max: Math.floor(max),
  };
  return Math.floor(Math.random() * (restrict.max - restrict.min + 1)) + restrict.min;
};

/**
 * Возвращает случайное булевое значение (`true` или `false`).
 * @returns {boolean} случайное булевое значение.
 */
export const getRandomBoolean = () => Boolean(getRandomIntInclusive());

/**
 * Возвращает случайный элемент массива.
 * @param {Array} array входящий массив.
 * @returns {*} случайный элемент массива (или `undefined` если массив пустой).
 */
export const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntInclusive(0, array.length - 1);
  return array[randomIndex];
};

/**
 * Перемешивает входящий массив случайным образом.
 * @param {*} array входящий массив
 */
export const shuffleArray = (array) =>
  array
    .slice()
    .sort(() => Math.random() - RANDOM_SEPARATOR);

/**
 * Форматирует дату в указанном формате.
 * @param {number} timestamp форматируемая дата в Unix time.
 * @param {string} pattern паттерн для форматирования в {@link https://en.wikipedia.org/wiki/ISO_8601 ISO 8601}. Значение по-умолчанию: `MMM DD`.
 * @returns {string} дата в человекочитаемом формате.
 */
export const formatDate = (timestamp, pattern = DateFormatPattern.HUMAN.DEFAULT) => dayjs(timestamp).format(pattern);

/**
 * Возвращает разницу между двумя датами в человекочитаемом формате.
 * @param {number} firstTimestamp первая дата в Unix time.
 * @param {number} secondTimestamp вторая дата в Unix time.
 * @returns {string} дата в человекочитаемом формате.
 */
export const getHumanizedDateDifference = (firstTimestamp, secondTimestamp) => {
  const lower = Math.min(firstTimestamp, secondTimestamp);
  const upper = Math.max(firstTimestamp, secondTimestamp);
  const diff = dayjs.duration(dayjs(upper).diff(dayjs(lower)));
  let pattern = DateFormatPattern.HUMAN.DURATION_MIN;

  if (diff.days()) {
    pattern = DateFormatPattern.HUMAN.DURATION_DAYS;
  } else if (diff.hours()) {
    pattern = DateFormatPattern.HUMAN.DURATION_HOURS;
  }

  return diff.format(pattern);
};

/**
 * Проверяет, является ли проверяемая дата прошлой.
 * @param {number} timestamp дата в Unix time.
 * @returns {Boolean} возвращает булево значение (`true` или `false`).
 */
export const isPastDate = (timestamp) => {
  const now = dayjs();
  return dayjs(timestamp).isBefore(now, 'ms');
};

/**
 * Проверяет, является ли проверяемая дата будущей.
 * @param {number} timestamp дата в Unix time.
 * @returns {Boolean} возвращает булево значение (`true` или `false`).
 */
export const isFutureDate = (timestamp) => {
  const now = dayjs();
  return dayjs(now).isBefore(timestamp, 'ms');
};

/**
 * Проверяет, находятся ли указанные даты в одном месяце.
 * @param {number} firstTimestamp дата в Unix time.
 * @param {number} secondTimestamp дата в Unix time.
 * @returns {boolean} возвращает булево значение (`true` или `false`).
 */
export const isOneMonthDates = (firstTimestamp, secondTimestamp) =>
  dayjs(firstTimestamp).month() === dayjs(secondTimestamp).month();
