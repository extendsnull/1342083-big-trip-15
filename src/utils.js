import {RANDOM_SEPARATOR} from './const';

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
export const shuffleArray = (array) => array.slice().sort(() => Math.random() - RANDOM_SEPARATOR);
