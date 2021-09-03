import PointsModel from './models/points';
import FilterModel from './models/filter';
import NavigationPresenter from './presenters/navigation';
import InfoPresenter from './presenters/info';
import AddButtonPresenter from './presenters/add-button';
import FilterPresenter from './presenters/filter';
import BoardPresenter from './presenters/board';
import { mockPoints } from './data';

const pointsModel = new PointsModel();
const filterModel = new FilterModel();
pointsModel.addPoints(mockPoints);

new InfoPresenter(
  document.querySelector('.trip-main'),
  pointsModel,
);

new FilterPresenter(
  document.querySelector('.trip-controls'),
  filterModel,
  pointsModel,
);

const addButtonPresenter = new AddButtonPresenter(
  document.querySelector('.trip-main'),
);

const boardPresenter = new BoardPresenter(
  document.querySelector('.trip-events'),
  pointsModel,
  filterModel,
  addButtonPresenter,
);

new NavigationPresenter(
  document.querySelector('.trip-controls'),
  boardPresenter,
  pointsModel,
  filterModel,
);

boardPresenter.init();
