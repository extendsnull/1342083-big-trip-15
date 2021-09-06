import StatsView from '../view/stats';
import { remove, render } from '../utils/render';
import { sortPointByDuration, sortPointsByMoney, sortPointsByType } from '../utils/stats';

export default class StatsPresenter {
  constructor(container, pointsModel) {
    this._container = container;
    this._pointsModel = pointsModel;

    this._statsComponent = null;
  }

  _getPoints() {
    const points = this._pointsModel.getPoints();
    const statsByMoney = sortPointsByMoney(points);
    const statsByType = sortPointsByType(points);
    const statsByTimeSpend = sortPointByDuration(points);

    return {
      money: statsByMoney,
      type: statsByType,
      timeSpend: statsByTimeSpend,
    };
  }

  init() {
    this._statsComponent = new StatsView(this._getPoints());
    render(this._container, this._statsComponent);
  }

  destroy() {
    remove(this._statsComponent);
    this._statsComponent = null;
  }
}
