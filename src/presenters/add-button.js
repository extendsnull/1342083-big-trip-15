import AddButtonView from '../view/add-button';
import { remove, render, replace } from '../utils/render';

export default class AddButtonPresenter {
  constructor(container, boardPresenter) {
    this._container = container;
    this._boardPresenter = boardPresenter;

    this._addButtonComponent = null;
    this._createPoint = this._createPoint.bind(this);
  }

  init() {
    this._renderButton();
  }

  _createPoint() {
    this._boardPresenter.createPoint();
  }

  _renderButton() {
    const prevButtonComponent = this._addButtonComponent;
    this._addButtonComponent = new AddButtonView();
    this._addButtonComponent.setButtonClickHandler(this._createPoint);
    this._boardPresenter.setNewPointFormCloseCallback(this._addButtonComponent.enable);

    if (prevButtonComponent === null) {
      return render(this._container, this._addButtonComponent);
    }

    replace(this._addButtonComponent, prevButtonComponent);
    remove(prevButtonComponent);
  }
}