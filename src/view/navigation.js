import { formatLabel } from '../utils/common';
import Abstract from './abstract';

const getItemTemplate = (type, activeItem) => {
  const isActive = type === activeItem;

  return `
    <a
      class="trip-tabs__btn${isActive ? ' trip-tabs__btn--active' : ''}"
      data-type="${type}"
      href="#"
    >${formatLabel(type)}</a>`;
};

const getNavigationTemplate = (navigationItems, activeItem) => {
  const itemsTemplate = navigationItems.map((item) => getItemTemplate(item, activeItem)).join('\n');

  return `
    <div class="trip-controls__navigation">
      <h2 class="visually-hidden">Switch trip view</h2>
      <nav class="trip-controls__trip-tabs trip-tabs">
        ${itemsTemplate}
      </nav>
    </div>`;
};

export default class Navigation extends Abstract {
  constructor(navigationItems, activeItem) {
    super();
    this._navigationItems = navigationItems;
    this._activeItem = activeItem;

    this._itemClickHandler = this._itemClickHandler.bind(this);
  }

  _getTemplate() {
    return getNavigationTemplate(this._navigationItems, this._activeItem);
  }

  setItemClickHandler(callback) {
    this._callback.itemClickHandler = callback;
    this.getElement().addEventListener('click', this._itemClickHandler);
  }

  _itemClickHandler(evt) {
    if (evt.target.tagName !== 'A') {
      return;
    }

    const { type } = evt.target.dataset;

    if (type !== this._activeItem) {
      evt.preventDefault();
      this._callback.itemClickHandler(type);
    }
  }
}
