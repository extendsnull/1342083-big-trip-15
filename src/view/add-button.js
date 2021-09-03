import AbstractView from './abstract';

const getAddButtonTemplate = () => (`
  <button
    class="trip-main__event-add-btn btn btn--big btn--yellow"
    type="button"
  >New event</button>`);

export default class AddButtonView extends AbstractView {
  constructor() {
    super();
    this.disable = this.disable.bind(this);
    this.enable = this.enable.bind(this);
    this._buttonClickHandler = this._buttonClickHandler.bind(this);
  }

  _getTemplate() {
    return getAddButtonTemplate();
  }

  setButtonClickHandler(callback) {
    this._callback.buttonClickHandler = callback;
    this.getElement().addEventListener('click', this._buttonClickHandler);
  }

  disable() {
    this.getElement().disabled = true;
  }

  enable() {
    this.getElement().disabled = false;
  }

  _buttonClickHandler(evt) {
    evt.preventDefault();
    this._callback.buttonClickHandler();
    this.disable();
  }
}
