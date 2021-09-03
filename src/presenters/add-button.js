import AddButtonView from '../view/add-button';
import { remove, render, replace } from '../utils/render';

export default class AddButtonPresenter {
  constructor(container) {
    this._container = container;
    this._addButtonComponent = null;
  }

  init() {
    this._renderButton();
  }

  enableButton() {
    this._addButtonComponent.enable();
  }

  setButtonClickHandler(callback) {
    this._addButtonComponent.setButtonClickHandler(callback);
  }

  _renderButton() {
    const prevButtonComponent = this._addButtonComponent;
    this._addButtonComponent = new AddButtonView();

    if (prevButtonComponent === null) {
      return render(this._container, this._addButtonComponent);
    }

    replace(this._addButtonComponent, prevButtonComponent);
    remove(prevButtonComponent);
  }
}
