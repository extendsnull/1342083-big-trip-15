import AbstractView from './abstract';
import {SortType} from '../const';

const sortControls = [SortType.DAY, SortType.EVENT, SortType.TIME, SortType.PRICE, SortType.OFFER];
const checkedControl = SortType.DAY;
const disabledControls = [SortType.EVENT, SortType.OFFER];

const formatSortLabel = (type) => {
  const [firstLetter, ...restLetters] = type;
  restLetters.unshift(firstLetter.toUpperCase());
  return restLetters.join('');
};

const getSortFormControlTemplate = (type) => {
  const isChecked = checkedControl === type;
  const isDisabled = disabledControls.includes(type);

  return `
    <div class="trip-sort__item trip-sort__item--${type}">
      <input
        id="sort-${type}"
        class="trip-sort__input visually-hidden"
        type="radio"
        name="trip-sort"
        value="sort-${type}"
        data-sort-type="${type}"
        ${isChecked ? 'checked' : ''}
        ${isDisabled ? 'disabled' : ''}
      >
      <label
        class="trip-sort__btn"
        for="sort-${type}"
      >${formatSortLabel(type)}</label>
    </div>`;
};

const getSortFormTemplate = () => {
  const controlsTemplate = sortControls.map(getSortFormControlTemplate).join('\n');

  return `
    <form
      class="trip-events__trip-sort trip-sort"
      action="#"
      method="get"
    >
      ${controlsTemplate}
    </form>`;
};

export default class SortForm extends AbstractView {
  constructor() {
    super();

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
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

  _getTemplate() {
    return getSortFormTemplate();
  }
}
