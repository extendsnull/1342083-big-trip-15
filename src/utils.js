/**
 * Отрисовывает компоненты.
 * @param {HTMLElement} element - элемент, по отношению к которому происходит вставка компонента.
 * @param {string} html - разметка для компонента.
 * @param {InsertPosition} where - местоположение компонента (см. {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML insertAdjacentHTML}). Значение по-умолчанию: `beforeend`.
 */
export const render = (element, html, where = 'beforeend') => {
  element.insertAdjacentHTML(where, html);
};
