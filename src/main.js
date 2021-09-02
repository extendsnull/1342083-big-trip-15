import PointsModel from './models/points';
import FilterModel from './models/filter';
import FilterPresenter from './presenters/filter';
import BoardPresenter from './presenters/board';
import InfoView from './view/info';
import NavigationView from './view/navigation';
import AddButtonView from './view/add-button';
import { mockPoints, infoState } from './data';
import { RenderPosition } from './const';
import { render} from './utils/render';

const pointsModel = new PointsModel();
const filterModel = new FilterModel();
pointsModel.addPoints(mockPoints);

render(
  document.querySelector('.trip-main'),
  new InfoView(infoState),
  RenderPosition.AFTER_BEGIN,
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
