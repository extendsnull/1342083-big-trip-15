import AbstractView from './abstract';

const getFilterControlsTemplate = (data) => data.map((control) => {
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

const getFilterTemplate = (data) => {
  const controlsTemplate = getFilterControlsTemplate(data);

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
  constructor(data) {
    super();
    this._data = data;
  }

  _getTemplate() {
    return getFilterTemplate(this._data);
  }
}
