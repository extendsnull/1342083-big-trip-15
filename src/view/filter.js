import AbstractView from './abstract';

const getControlsTemplate = (filters, activeFilter) => filters.map((filter) => {
  const { type, name, count } = filter;
  const isChecked = type === activeFilter;
  const isDisabled = Boolean(!count);

  return `
    <div class="trip-filters__filter">
      <input
        id="filter-${type}"
        class="trip-filters__filter-input visually-hidden"
        type="radio"
        name="trip-filter"
        value="${type}"
        ${isChecked ? 'checked' : ''}
        ${isDisabled ? 'disabled' : ''}
      >
      <label
        class="trip-filters__filter-label"
        for="filter-${type}"
      >
        ${name}
      </label>
    </div>`;
}).join('\n');

const getFilterTemplate = (filters, activeFilter) => {
  const controlsTemplate = getControlsTemplate(filters, activeFilter);

  return `
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
    </form>`;
};

export default class FilterView extends AbstractView {
  constructor(filters, activeFilter) {
    super();
    this._filters = filters;
    this._activeFilter = activeFilter;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  _getTemplate() {
    return getFilterTemplate(this._filters, this._activeFilter);
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
