import InfoView from '../view/info';
import { RenderPosition } from '../const';
import { getTripInfo } from '../utils/info';
import { remove, render, replace } from '../utils/render';

export default class InfoPresenter {
  constructor(container, pointsModel) {
    this._container = container;
    this._pointsModel = pointsModel;

    this._infoComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._pointsModel.addObserver(this._handleModelEvent);
    this._init();
  }

  _getDetails() {
    return getTripInfo(this._pointsModel.getPoints());
  }

  _handleModelEvent() {
    this._init();
  }

  _init() {
    const prevInfoComponent = this._infoComponent;
    this._infoComponent = new InfoView(this._getDetails());

    if (prevInfoComponent === null) {
      return render(this._container, this._infoComponent, RenderPosition.AFTER_BEGIN);
    }

    replace(this._infoComponent, prevInfoComponent);
    remove(prevInfoComponent);
  }
}
