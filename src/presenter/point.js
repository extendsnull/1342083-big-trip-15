import PointView from '../view/point';
import PointFormView from '../view/point-form';
import { Mode, State, UpdateType, UserAction } from '../const';
import { isEscKey } from '../utils/common';
import { render, replace, remove } from '../utils/render';

export default class Point {
  constructor(container, destinationsModel, offersModel, changeData, changeMode) {
    this._container = container;

    this._destinationsModel = destinationsModel;
    this._offersModel = offersModel;

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
      return render(this._container, this._pointComponent);
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._pointComponent, prevPointComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._pointComponent, prevPointFormComponent);
      this._mode = Mode.DEFAULT;
    }

    remove(prevPointComponent);
    remove(prevPointFormComponent);
  }

  destroy() {
    remove(this._pointComponent);
    remove(this._pointFormComponent);
  }

  setViewState(state) {
    switch (state) {
      case State.SAVING: {
        this._pointFormComponent.updateState({
          isDisabled: true,
          isSaving: true,
        });
        break;
      }
      case State.DELETING: {
        this._pointFormComponent.updateState({
          isDisabled: true,
          isDeleting: true,
        });
        break;
      }
      case State.ABORTING: {
        this._pointComponent.shake();
        this._pointFormComponent.shake(this._resetPointFormState);
        break;
      }
    }
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
    this._resetPointFormState = this._resetPointFormState.bind(this);
  }

  _create() {
    this._pointComponent = new PointView(
      this._point,
      this._offersModel.getOffers(),
    );
    this._pointFormComponent = new PointFormView(
      this._point,
      this._destinationsModel.getDestinations(),
      this._offersModel.getOffers(this._point.type),
      true,
    );

    this._pointComponent.setEditClickHandler(this._handleEditClick);
    this._pointComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._pointFormComponent.setDeleteClickHandler(this._handleDeleteClick);
    this._pointFormComponent.setResetClickHandler(this._handleResetClick);
    this._pointFormComponent.setSubmitHandler(this._handleSubmit);
  }

  _handleDeleteClick(point) {
    this._changeData(UserAction.DELETE_POINT, UpdateType.MAJOR, point);
    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _handleEditClick() {
    this._replacePointToForm();
    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  _handleFavoriteClick() {
    const update = {
      ...this._point,
      isFavorite: !this._point.isFavorite,
    };

    this._changeData(UserAction.UPDATE_POINT, UpdateType.PATCH, update);
  }

  _handleResetClick() {
    this._reset();
  }

  _handleSubmit(updatedPoint) {
    this._changeData(UserAction.UPDATE_POINT, UpdateType.PATCH, updatedPoint);
    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _replaceFormToPoint() {
    replace(this._pointComponent, this._pointFormComponent);
    this._mode = Mode.DEFAULT;
    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _replacePointToForm() {
    replace(this._pointFormComponent, this._pointComponent);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _resetPointFormState() {
    this._pointFormComponent.updateState({
      isDeleting: false,
      isDisabled: false,
      isSaving: false,
    });
  }

  _reset() {
    this._pointFormComponent.reset(this._point);
    this._replaceFormToPoint();
    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _escKeyDownHandler(evt) {
    if (isEscKey(evt.key)) {
      this._reset();
    }
  }
}
