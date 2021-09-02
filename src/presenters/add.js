import AddButtonView from '../view/add-button';
import { remove, render, replace } from '../utils/render';

export default class AddPresenter {
  constructor(container) {
    this._container = container;
    this._buttonComponent = null;
    this._init();
  }

  enableButton() {
    this._buttonComponent.enable();
  }

  setButtonClickHandler(callback) {
    this._buttonComponent.setButtonClickHandler(callback);
  }

  _renderButton() {
    const prevButtonComponent = this._buttonComponent;
    this._buttonComponent = new AddButtonView();

    if (prevButtonComponent === null) {
      return render(this._container, this._buttonComponent);
    }

    replace(this._buttonComponent, prevButtonComponent);
    remove(prevButtonComponent);
  }

  _init() {
    this._renderButton();
  }
}
