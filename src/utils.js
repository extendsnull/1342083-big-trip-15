import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import {RANDOM_SEPARATOR, KeyName, HumanDateFormatPattern, RenderPosition} from './const';

dayjs.extend(duration);

/**
 * Рендерит html-элемент на странице.
 * @param {HTMLElement} parent _родительский_ элемент, внутрь которого происходит вставка _дочернего_ элемента.
 * @param {HTMLElement} child _дочерний_ элемент, который нужно отрендерить на странице.
 * @param {string} where местоположение _дочернего_ элемента. Значение по-умолчанию: `beforeend`. Возможные значения: `afterbegin`, `beforeend`.
 */
export const render = (parent, child, where = RenderPosition.BEFORE_END) => {
  switch (where) {
    case RenderPosition.AFTER_BEGIN: {
      parent.prepend(child);
      break;
    }
    case RenderPosition.BEFORE_END: {
      parent.append(child);
      break;
    }
  }
};

/**
 * Создает html-элемент из строки с разметкой.
 * @param {string} html разметка для компонента.
 * @returns {HTMLElement} html-элемент.
 */
export const createElement = (html) => {
  const templateParentElement = document.createElement('div');
  templateParentElement.innerHTML = html;
  return templateParentElement.firstElementChild;
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
 * @param {string} pattern паттерн для форматирования в {@link https://en.wikipedia.org/wiki/ISO_8601 ISO 8601}. Значение по-умолчанию: `DD/MM/YY HH:mm`.
 * @returns {string} дата в человекочитаемом формате.
 */
export const formatDate = (timestamp, pattern = HumanDateFormatPattern.DEFAULT) => dayjs(timestamp).format(pattern);

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
  let pattern = HumanDateFormatPattern.DURATION_MIN;

  if (diff.days()) {
    pattern = HumanDateFormatPattern.DURATION_DAYS;
  } else if (diff.hours()) {
    pattern = HumanDateFormatPattern.DURATION_HOURS;
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

/**
 * Проверяет нажал ли пользователь кнопку `Escape`.
 * @param {string} key строковый идентификатор клавиши, нажатой пользователем.
 * @returns {boolean} возвращает булево значение (`true` или `false`).
 */
export const isEscKey = (key) => KeyName.ESC.indexOf(key) > -1;
