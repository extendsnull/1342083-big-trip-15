import AbstractView from './abstract';

const getFilterControlsTemplate = (filterState) => filterState.map((control) => {
  const {name, label, isChecked, isDisabled} = control;

  return `
    <div class="trip-filters__filter">
      <input
        id="filter-${name}"
        class="trip-filters__filter-input visually-hidden"
        type="radio"
        name="trip-filter"
        value="${name}"
        ${isChecked ? 'checked' : ''}
        ${isDisabled ? 'disabled' : ''}
      >
      <label class="trip-filters__filter-label" for="filter-${name}">${label}</label>
    </div>`;
}).join('\n');

const getFilterTemplate = (filterState) => {
  const controlsTemplate = getFilterControlsTemplate(filterState);

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
      >Accept filter</button>
    </form>`;
};

export default class FilterForm extends AbstractView {
  constructor(filterState) {
    super();
    this._filterState = filterState;
  }

  getTemplate() {
    return getFilterTemplate(this._filterState);
  }
}
