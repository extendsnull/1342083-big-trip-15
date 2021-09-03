import PointsModel from './models/points';
import FilterModel from './models/filter';
import NavigationView from './view/navigation';
import InfoPresenter from './presenters/info';
import AddButtonPresenter from './presenters/add-button';
import FilterPresenter from './presenters/filter';
import BoardPresenter from './presenters/board';
import { mockPoints } from './data';
import { render } from './utils/render';

const pointsModel = new PointsModel();
const filterModel = new FilterModel();
pointsModel.addPoints(mockPoints);

render(
  document.querySelector('.trip-controls'),
  new NavigationView(),
);

const addButtonPresenter = new AddButtonPresenter(
  document.querySelector('.trip-main'),
);

new InfoPresenter(
  document.querySelector('.trip-main'),
  pointsModel,
);

new FilterPresenter(
  document.querySelector('.trip-controls'),
  filterModel,
  pointsModel,
);

new BoardPresenter(
  document.querySelector('.trip-events'),
  pointsModel,
  filterModel,
  addButtonPresenter,
);
