import NavigationPresenter from '../presenters/navigation';
import InfoPresenter from '../presenters/info';
import AddButtonPresenter from '../presenters/add-button';
import FilterPresenter from '../presenters/filter';
import BoardPresenter from '../presenters/board';
import StatsPresenter from '../presenters/stats';

const containers = {
  info: document.querySelector('.trip-main'),
  filter: document.querySelector('.trip-controls'),
  board: document.querySelector('.page-main .page-body__container'),
  addButton: document.querySelector('.trip-main'),
  stats: document.querySelector('.page-main .page-body__container'),
  navigation: document.querySelector('.trip-controls'),
};

export default class MainPresenter {
  constructor(pointsModel, filterModel) {
    this._pointsModel = pointsModel;
    this._filterModel = filterModel;
    this._presenters = {};

    this._init();
  }

  _init() {
    this._createPresenters();
    this._initPresenters();
  }

  _initPresenters() {
    this._presenters.info.init();
    this._presenters.filter.init();
    this._presenters.addButton.init();
    this._presenters.board.init();
    this._presenters.navigation.init();
  }

  _createPresenters() {
    this._presenters.info= new InfoPresenter(
      containers.info,
      this._pointsModel,
    );

    this._presenters.filter= new FilterPresenter(
      containers.filter,
      this._filterModel,
      this._pointsModel,
    );

    this._presenters.board= new BoardPresenter(
      containers.board,
      this._pointsModel,
      this._filterModel,
    );

    this._presenters.addButton= new AddButtonPresenter(
      containers.addButton,
      this._presenters.board,
    );

    this._presenters.stats= new StatsPresenter(
      containers.stats,
      this._pointsModel,
      this._presenters.filter,
    );

    this._presenters.navigation= new NavigationPresenter(
      containers.navigation,
      this._presenters.board,
      this._presenters.stats,
      this._pointsModel,
      this._filterModel,
    );
  }
}
