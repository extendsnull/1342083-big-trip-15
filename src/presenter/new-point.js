import PointFormView from '../view/point-form';
import {BLANK_POINT, RenderPosition, UpdateType, UserAction} from '../const';
import {isEscKey} from '../utils/common';
import {getArrayFirstItem} from '../utils/array';
import {remove, render} from '../utils/render';

const getBlankPoint = (offers) => {
  const currentDate = Date.now();
  const type = getArrayFirstItem(Array.from(offers.keys()));

  return {
    ...BLANK_POINT,
    dateFrom: currentDate,
    dateTo: currentDate,
    type,
  };
};

export default class NewPoint {
  constructor(destinationsModel, offersModel, changeData) {
    this._destinationsModel = destinationsModel;
    this._offersModel = offersModel;
    this._changeData = changeData;

    this._pointFormComponent = null;
    this._formCloseCallback = null;

    this._bindContext();
  }

  init(container) {
    this._point = getBlankPoint(this._offersModel.getOffers());

    this._pointFormComponent = new PointFormView(
      this._point,
      this._destinationsModel.getDestinations(),
      this._offersModel.getOffers(this._point.type),
      false,
    );

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

  setAborting() {
    this._pointFormComponent.shake(this._resetPointFormState);
  }

  setSaving() {
    this._pointFormComponent.updateState({
      isDisabled: true,
      isSaving: true,
    });
  }

  _bindContext() {
    this.setFormCloseCallback = this.setFormCloseCallback.bind(this);
    this._resetPointFormState = this._resetPointFormState.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _resetPointFormState() {
    this._pointFormComponent.updateState({
      isDeleting: false,
      isDisabled: false,
      isSaving: false,
    });
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
