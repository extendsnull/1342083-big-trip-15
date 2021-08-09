import {createElement} from '../utils';

const filterControls = [
  {
    name: 'everything',
    label: 'Everything',
    isChecked: true,
  },
  {
    name: 'future',
    label: 'Future',
  },
  {
    name: 'past',
    label: 'Past',
  },
];

const getFilterControlsTemplate = (props) => filterControls.map((control) => {
  const {name, label, isChecked} = control;
  const isDisabled = props[name].disabled;

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

const getFilterTemplate = (props) => {
  const controlsTemplate = getFilterControlsTemplate(props);

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

export default class FilterForm {
  constructor(props) {
    this._element = null;
    this._props = props;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  getTemplate() {
    return getFilterTemplate(this._props);
  }
}
