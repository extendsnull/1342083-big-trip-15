import InfoView from './view/info';
import FilterFormView from './view/filter-form';
import NavigationView from './view/navigation';
import BoardPresenter from './presenters/board';
import {getMockPoints, getInfoState, getFilterState} from './mocks';
import {render} from './utils/render';

const points = getMockPoints();
const infoData = getInfoState(points);
const filterData = getFilterState(points);

render(
  document.querySelector('.page-header__container'),
  new InfoView(infoData),
);

render(
  document.querySelector('.trip-controls__navigation'),
  new NavigationView(),
);

render(
  document.querySelector('.trip-controls__filters'),
  new FilterFormView(filterData),
);

new BoardPresenter(
  document.querySelector('.trip-events'),
  points,
);
