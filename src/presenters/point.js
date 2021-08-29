import PointView from '../view/point';
import PointFormView from '../view/point-form';
import { render, replace, remove } from '../utils/render';
import { isEscKey } from '../utils/common';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  constructor(container, changeData, changeMode) {
    this._container = container;
    this._mode = Mode.DEFAULT;
    this._pointComponent = null;
    this._pointFormComponent = null;

    this._changeData = changeData;
    this._changeMode = changeMode;

    this._bindContext();
  }

  init(point) {
    this._point = point;

    const prevPointComponent = this._pointComponent;
    const prevPointFormComponent = this._pointFormComponent;

    this._create();

    if (prevPointComponent === null || prevPointFormComponent === null) {
      return this._render();
    }

    const prevPointIsRendered = this._container.getElement().contains(prevPointComponent.getElement());
    const prevPointFormIsRendered = this._container.getElement().contains(prevPointFormComponent.getElement());

    if (prevPointIsRendered) {
      this._reinitPoint(prevPointComponent);
    }

    if (prevPointFormIsRendered) {
      this._reinitPointForm(prevPointFormComponent);
    }
  }

  destroy() {
    remove(this._pointComponent);
    remove(this._pointFormComponent);
  }

  resetView() {
    if (this._mode === Mode.EDITING) {
      this._replaceFormToPoint();
    }
  }

  _bindContext() {
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleResetClick = this._handleResetClick.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  _create() {
    this._pointComponent = new PointView(this._point);
    this._pointFormComponent = new PointFormView(this._point, true);

    this._pointComponent.setEditClickHandler(this._handleEditClick);
    this._pointComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._pointFormComponent.setDeleteClickHandler(this._handleDeleteClick);
    this._pointFormComponent.setResetClickHandler(this._handleResetClick);
    this._pointFormComponent.setSubmitHandler(this._handleSubmit);
  }

  _escKeyDownHandler(evt) {
    if (isEscKey(evt.key)) {
      this._replaceFormToPoint();
      document.removeEventListener('keydown', this._escKeyDownHandler);
    }
  }

  _handleDeleteClick() {
    this.destroy();
    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _handleEditClick() {
    this._replacePointToForm();
    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  _handleFavoriteClick() {
    this._changeData({
      ...this._point,
      isFavorite: !this._point.isFavorite,
    });
  }

  _handleResetClick() {
    this._replaceFormToPoint();
    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _handleSubmit() {
    this._replaceFormToPoint();
    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _render() {
    render(this._container, this._pointComponent);
  }

  _reinitPoint(prevPointComponent) {
    replace(this._pointComponent, prevPointComponent);
    remove(prevPointComponent);
  }

  _reinitPointForm(prevPointFormComponent) {
    replace(this._pointFormComponent, prevPointFormComponent);
    remove(prevPointFormComponent);
  }

  _replacePointToForm() {
    replace(this._pointFormComponent, this._pointComponent);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToPoint() {
    replace(this._pointComponent, this._pointFormComponent);
    this._mode = Mode.DEFAULT;
  }
}
