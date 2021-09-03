import PointFormView from '../view/point-form';
import { RenderPosition, UpdateType, UserAction } from '../const';
import { isEscKey } from '../utils/common';
import { remove, render } from '../utils/render';

export default class NewPointPresenter {
  constructor(container, changeData, addButtonPresenter) {
    this._container = container;
    this._pointFormComponent = null;
    this._changeData = changeData;

    this._addButtonPresenter = addButtonPresenter;
    this._bindContext();
  }

  init() {
    this._pointFormComponent = new PointFormView(this._point, false);

    this._pointFormComponent.setDeleteClickHandler(this._handleDeleteClick);
    this._pointFormComponent.setSubmitHandler(this._handleSubmit);

    document.addEventListener('keydown', this._escKeyDownHandler);

    render(this._container, this._pointFormComponent, RenderPosition.AFTER_BEGIN);
  }

  destroy() {
    this._addButtonPresenter.enableButton();
    remove(this._pointFormComponent);
    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _bindContext() {
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

  _escKeyDownHandler(evt) {
    if (isEscKey(evt.key)) {
      this.destroy();
    }
  }
}
