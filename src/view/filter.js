import Abstract from './abstract';

const getControlsTemplate = (filters, activeFilter, isDisabled) => filters.map((filter) => {
  const {type, name, count} = filter;
  const isChecked = type === activeFilter;

  return `
    <div class="trip-filters__filter">
      <input
        id="filter-${type}"
        class="trip-filters__filter-input visually-hidden"
        type="radio"
        name="trip-filter"
        value="${type}"
        ${isChecked ? 'checked' : ''}
        ${isDisabled || count === 0 ? 'disabled' : ''}
      >
      <label
        class="trip-filters__filter-label"
        for="filter-${type}"
      >
        ${name}
      </label>
    </div>`;
}).join('\n');

const getFilterTemplate = (filters, activeFilter, isDisabled) => {
  const controlsTemplate = getControlsTemplate(filters, activeFilter, isDisabled);

  return `
    <div class="trip-controls__filters">
      <h2 class="visually-hidden">Filter events</h2>
      <form
        class="trip-filters"
        action="#"
        method="get"
      >
        ${controlsTemplate}
        <button
          class="visually-hidden"
          type="submit"
        >
          Accept filter
        </button>
      </form>
    </div>`;
};

export default class Filter extends Abstract {
  constructor(filters, activeFilter, isDisabled) {
    super();
    this._filters = filters;
    this._activeFilter = activeFilter;
    this._isDisabled = isDisabled;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return getFilterTemplate(this._filters, this._activeFilter, this._isDisabled);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterChangeHandler = callback;
    this.getElement().addEventListener('change', this._filterTypeChangeHandler);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterChangeHandler(evt.target.value);
  }
}
