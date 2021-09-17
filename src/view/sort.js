import Abstract from './abstract';
import {SortType} from '../const';
import {formatLabel} from '../utils/common';

const SORT_CONTROLS = [SortType.DAY, SortType.EVENT, SortType.TIME, SortType.PRICE, SortType.OFFER];
const DISABLED_CONTROLS = [SortType.EVENT, SortType.OFFER];

const getControlTemplate = (sortType, activeSortType) => {
  const isChecked = sortType === activeSortType;
  const isDisabled = DISABLED_CONTROLS.includes(sortType);

  return `
    <div class="trip-sort__item trip-sort__item--${sortType}">
      <input
        id="sort-${sortType}"
        class="trip-sort__input visually-hidden"
        type="radio"
        name="trip-sort"
        value="sort-${sortType}"
        data-sort-type="${sortType}"
        ${isChecked ? 'checked' : ''}
        ${isDisabled ? 'disabled' : ''}
      >
      <label
        class="trip-sort__btn"
        for="sort-${sortType}"
      >${formatLabel(sortType)}</label>
    </div>`;
};

const getSortTemplate = (activeSortType) => {
  const controlsTemplate = SORT_CONTROLS.map((sortType) => getControlTemplate(sortType, activeSortType)).join('\n');

  return `
    <form
      class="trip-events__trip-sort trip-sort"
      action="#"
      method="get"
    >
      ${controlsTemplate}
    </form>`;
};

export default class Sort extends Abstract {
  constructor(activeSortType) {
    super();
    this._activeSortType = activeSortType;
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return getSortTemplate(this._activeSortType);
  }

  setChangeSortTypeHandler(callback) {
    this._callback.changeSortType = callback;
    this.getElement().addEventListener('change', this._sortTypeChangeHandler);
  }

  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName === 'INPUT') {
      evt.preventDefault();
      this._callback.changeSortType(evt.target.dataset.sortType);
    }
  }
}
