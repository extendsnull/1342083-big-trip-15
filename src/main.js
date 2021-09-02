import InfoView from './view/info';
import FilterFormView from './view/filter-form';
import NavigationView from './view/navigation';
import BoardPresenter from './presenters/board';
import PointsModel from './models/points';
import { mockPoints, infoState, filterState } from './data';
import { render} from './utils/render';

const pointsModel = new PointsModel();
pointsModel.addPoints(mockPoints);

render(
  document.querySelector('.page-header__container'),
  new InfoView(infoState),
);

render(
  document.querySelector('.trip-controls__navigation'),
  new NavigationView(),
);

render(
  document.querySelector('.trip-controls__filters'),
  new FilterFormView(filterState),
);

new BoardPresenter(
  document.querySelector('.trip-events'),
  mockPoints,
);
