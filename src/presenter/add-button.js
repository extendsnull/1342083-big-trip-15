import AddButtonView from '../view/add-button';
import { ToastMessage } from '../const';
import { isOnline } from '../utils/common';
import { remove, render, replace } from '../utils/render';
import { toast } from '../utils/toast';

export default class AddButton {
  constructor(container, boardPresenter) {
    this._container = container;
    this._boardPresenter = boardPresenter;

    this._addButtonComponent = null;
    this.enableButton = this.enableButton.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this._createPoint = this._createPoint.bind(this);
    this._handleAddButtonClick = this._handleAddButtonClick.bind(this);
  }

  init() {
    this._renderButton();
    this.disableButton();
  }

  enableButton() {
    this._addButtonComponent.enable();
  }

  disableButton() {
    this._addButtonComponent.disable();
  }

  _createPoint() {
    this._boardPresenter.createPoint();
  }

  _handleAddButtonClick() {
    if (!isOnline()) {
      return toast(ToastMessage.ADD);
    }

    this._createPoint();
    this.disableButton();
  }

  _renderButton() {
    const prevButtonComponent = this._addButtonComponent;
    this._addButtonComponent = new AddButtonView();
    this._addButtonComponent.setButtonClickHandler(this._handleAddButtonClick);
    this._boardPresenter.setNewPointFormCloseCallback(this.enableButton);

    if (prevButtonComponent === null) {
      return render(this._container, this._addButtonComponent);
    }

    replace(this._addButtonComponent, prevButtonComponent);
    remove(prevButtonComponent);
  }
}
