import NavigationPresenter from '../presenter/navigation';
import InfoPresenter from '../presenter/info';
import FilterPresenter from '../presenter/filter';
import BoardPresenter from '../presenter/board';
import StatsPresenter from '../presenter/stats';
import {UpdateType} from '../const';

const containers = {
  info: document.querySelector('.trip-main'),
  filter: document.querySelector('.trip-controls'),
  board: document.querySelector('.page-main .page-body__container'),
  stats: document.querySelector('.page-main .page-body__container'),
  navigation: document.querySelector('.trip-controls'),
};

export default class Main {
  constructor(api, pointsModel, filterModel, destinationsModel, offersModel) {
    this._api = api;
    this._pointsModel = pointsModel;
    this._filterModel = filterModel;
    this._destinationsModel = destinationsModel;
    this._offersModel = offersModel;

    this._presenters = {};

    this._init();
  }

  _getData() {
    const pointsPromise = this._api.getPoints();
    const destinationsPromise = this._api.getDestinations();
    const offersPromise = this._api.getOffers();

    Promise.all([pointsPromise, destinationsPromise, offersPromise])
      .then((responses) => {
        const [points, destinations, offers] = responses;
        this._destinationsModel.setDestinations(UpdateType.INIT, destinations);
        this._offersModel.setOffers(UpdateType.INIT, offers);
        this._pointsModel.setPoints(UpdateType.INIT, points);
      })
      .catch(() => {
        this._destinationsModel.setDestinations(UpdateType.INIT, []);
        this._offersModel.setOffers(UpdateType.INIT, []);
        this._pointsModel.setPoints(UpdateType.INIT, []);
      });
  }

  _init() {
    this._createPresenters();
    this._initPresenters();
    this._getData();
  }

  _initPresenters() {
    this._presenters.info.init();
    this._presenters.navigation.init();
    this._presenters.filter.init();
    this._presenters.board.init();
  }

  _createPresenters() {
    this._presenters.info = new InfoPresenter(
      containers.info,
      this._pointsModel,
    );

    this._presenters.filter = new FilterPresenter(
      containers.filter,
      this._filterModel,
      this._pointsModel,
    );

    this._presenters.board = new BoardPresenter(
      containers.board,
      this._pointsModel,
      this._filterModel,
      this._destinationsModel,
      this._offersModel,
      this._api,
    );

    this._presenters.stats = new StatsPresenter(
      containers.stats,
      this._pointsModel,
      this._presenters.filter,
    );

    this._presenters.navigation = new NavigationPresenter(
      containers.navigation,
      this._presenters.board,
      this._presenters.stats,
      this._pointsModel,
      this._filterModel,
    );
  }
}
