import {createElement} from '../utils';

const sortControls = [
  {
    name: 'day',
    label: 'Day',
    isChecked: true,
  },
  {
    name: 'event',
    label: 'Event',
    isDisabled: true,
  },
  {
    name: 'time',
    label: 'Time',
  },
  {
    name: 'price',
    label: 'Price',
  },
  {
    name: 'offer',
    label: 'Offers',
    isDisabled: true,
  },
];

const getSortFormControlTemplate = (props) => {
  const {name, label, isChecked, isDisabled} = props;

  return `
    <div class="trip-sort__item trip-sort__item--${name}">
      <input
        id="sort-${name}"
        class="trip-sort__input visually-hidden"
        type="radio"
        name="trip-sort"
        value="sort-${name}"
        ${isChecked ? 'checked' : ''}
        ${isDisabled ? 'disabled' : ''}
      >
      <label
        class="trip-sort__btn"
        for="sort-${name}"
      >${label}</label>
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

export default class SortForm {
  constructor() {
    this._element = null;
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
    return getSortFormTemplate(this._props);
  }
}
