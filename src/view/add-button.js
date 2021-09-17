import Abstract from './abstract';

const getAddButtonTemplate = (isDisabled) => (`
  <button
    class="trip-main__event-add-btn btn btn--big btn--yellow"
    type="button"
    ${isDisabled ? 'disabled' : ''}
  >New event</button>`);

export default class AddButton extends Abstract {
  constructor(isDisabled) {
    super();
    this._isDisabled = isDisabled;
    this._buttonClickHandler = this._buttonClickHandler.bind(this);
  }

  getTemplate() {
    return getAddButtonTemplate(this._isDisabled);
  }

  setButtonClickHandler(callback) {
    this._callback.buttonClickHandler = callback;
    this.getElement().addEventListener('click', this._buttonClickHandler);
  }

  _buttonClickHandler(evt) {
    evt.preventDefault();
    this._callback.buttonClickHandler();
  }
}
