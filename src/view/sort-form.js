import AbstractView from './abstract';
import {SORT_CONTROLS} from '../const';

const getSortFormControlTemplate = (controlProps) => {
  const {name, label, isChecked, isDisabled} = controlProps;

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
  const controlsTemplate = SORT_CONTROLS.map(getSortFormControlTemplate).join('\n');

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
  getTemplate() {
    return getSortFormTemplate();
  }
}
