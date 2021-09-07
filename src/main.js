import PointsModel from './models/points';
import FilterModel from './models/filter';
import NavigationPresenter from './presenters/navigation';
import InfoPresenter from './presenters/info';
import AddButtonPresenter from './presenters/add-button';
import FilterPresenter from './presenters/filter';
import BoardPresenter from './presenters/board';
import StatsPresenter from './presenters/stats';
import { mockPoints } from './data';

const pointsModel = new PointsModel();
const filterModel = new FilterModel();
pointsModel.addPoints(mockPoints);

const infoPresenter = new InfoPresenter(
  document.querySelector('.trip-main'),
  pointsModel,
);

const filterPresenter = new FilterPresenter(
  document.querySelector('.trip-controls'),
  filterModel,
  pointsModel,
);

const boardPresenter = new BoardPresenter(
  document.querySelector('.page-main'),
  pointsModel,
  filterModel,
);

const addButtonPresenter = new AddButtonPresenter(
  document.querySelector('.trip-main'),
  boardPresenter,
);

const statsPresenter = new StatsPresenter(
  document.querySelector('.page-main'),
  pointsModel,
  filterPresenter,
);

const navigationPresenter = new NavigationPresenter(
  document.querySelector('.trip-controls'),
  boardPresenter,
  statsPresenter,
  pointsModel,
  filterModel,
);

infoPresenter.init();
filterPresenter.init();
addButtonPresenter.init();
boardPresenter.init();
navigationPresenter.init();
