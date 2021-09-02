import PointsModel from './models/points';
import FilterModel from './models/filter';
import InfoPresenter from './presenters/info';
import FilterPresenter from './presenters/filter';
import BoardPresenter from './presenters/board';
import NavigationView from './view/navigation';
import AddButtonView from './view/add-button';
import { mockPoints } from './data';
import { render} from './utils/render';

const pointsModel = new PointsModel();
const filterModel = new FilterModel();
pointsModel.addPoints(mockPoints);

new InfoPresenter(
  document.querySelector('.trip-main'),
  pointsModel,
);

render(
  document.querySelector('.trip-controls'),
  new NavigationView(),
);

render(
  document.querySelector('.trip-main'),
  new AddButtonView(),
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
);
