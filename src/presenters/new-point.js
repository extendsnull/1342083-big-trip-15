import PointFormView from '../view/point-form';
import { RenderPosition, UpdateType, UserAction } from '../const';
import { isEscKey } from '../utils/common';
import { remove, render } from '../utils/render';

export default class NewPointPresenter {
  constructor(changeData) {
    this._pointFormComponent = null;
    this._changeData = changeData;

    this._formCloseCallback = null;

    this._bindContext();
  }

  init(container) {
    this._pointFormComponent = new PointFormView(this._point, false);

    this._pointFormComponent.setDeleteClickHandler(this._handleDeleteClick);
    this._pointFormComponent.setSubmitHandler(this._handleSubmit);

    document.addEventListener('keydown', this._escKeyDownHandler);

    render(container, this._pointFormComponent, RenderPosition.AFTER_BEGIN);
  }

  destroy() {
    remove(this._pointFormComponent);
    this._formCloseCallback();
    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  setFormCloseCallback(callback) {
    this._formCloseCallback = callback;
  }

  _bindContext() {
    this.setFormCloseCallback = this.setFormCloseCallback.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleDeleteClick() {
    this.destroy();
  }

  _handleSubmit(updatedPoint) {
    this._changeData(UserAction.ADD_POINT, UpdateType.MAJOR, updatedPoint);
    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _handleFormClose() {}

  _escKeyDownHandler(evt) {
    if (isEscKey(evt.key)) {
      this.destroy();
    }
  }
}
