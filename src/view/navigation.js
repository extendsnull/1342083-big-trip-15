import Abstract from './abstract';
import {formatLabel} from '../utils/common';

const getItemTemplate = (type, activeItem, isDisabled) => {
  const label = formatLabel(type);

  if (isDisabled) {
    return `<span class="trip-tabs__btn trip-tabs__btn--disabled">${label}</span>`;
  }

  const isActive = type === activeItem;

  return `
    <a
      class="trip-tabs__btn${isActive ? ' trip-tabs__btn--active' : ''}"
      data-type="${type}"
      href="#"
    >${label}</a>`;
};

const getNavigationTemplate = (navigationItems, activeItem, isDisabled) => {
  const itemsTemplate = navigationItems.map((item) => getItemTemplate(item, activeItem, isDisabled)).join('\n');

  return `
    <div class="trip-controls__navigation">
      <h2 class="visually-hidden">Switch trip view</h2>
      <nav class="trip-controls__trip-tabs trip-tabs">
        ${itemsTemplate}
      </nav>
    </div>`;
};

export default class Navigation extends Abstract {
  constructor(navigationItems, activeItem, isDisabled) {
    super();
    this._navigationItems = navigationItems;
    this._activeItem = activeItem;
    this._isDisabled = isDisabled;

    this._itemClickHandler = this._itemClickHandler.bind(this);
  }

  getTemplate() {
    return getNavigationTemplate(this._navigationItems, this._activeItem, this._isDisabled);
  }

  setItemClickHandler(callback) {
    this._callback.itemClickHandler = callback;
    this.getElement().addEventListener('click', this._itemClickHandler);
  }

  _itemClickHandler(evt) {
    evt.preventDefault();

    if (this._isDisabled || evt.target.tagName !== 'A') {
      return;
    }

    const {type} = evt.target.dataset;

    if (type !== this._activeItem) {
      this._callback.itemClickHandler(type);
    }
  }
}
