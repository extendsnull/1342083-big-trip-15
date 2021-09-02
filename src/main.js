import InfoView from './view/info';
import NavigationView from './view/navigation';
import PointsModel from './models/points';
import FilterModel from './models/filter';
import FilterPresenter from './presenters/filter';
import BoardPresenter from './presenters/board';
import { mockPoints, infoState } from './data';
import { render} from './utils/render';

const pointsModel = new PointsModel();
const filterModel = new FilterModel();
pointsModel.addPoints(mockPoints);

render(
  document.querySelector('.page-header__container'),
  new InfoView(infoState),
);

render(
  document.querySelector('.trip-controls__navigation'),
  new NavigationView(),
);

new FilterPresenter(
  document.querySelector('.trip-controls__filters'),
  filterModel,
  pointsModel,
);

new BoardPresenter(
  document.querySelector('.trip-events'),
  pointsModel,
  filterModel,
);
