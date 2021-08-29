import InfoView from './view/info';
import FilterFormView from './view/filter-form';
import NavigationView from './view/navigation';
import BoardPresenter from './presenters/board';
import {getMockOffers, getMockDestinations, getMockPoints, getInfoState, getFilterState} from './mocks';
import {render} from './utils/render';

const mockOffers = getMockOffers();
const mockDestinations = getMockDestinations();
const mockPoints = getMockPoints(mockOffers, mockDestinations);
const infoState = getInfoState(mockPoints);
const filterState = getFilterState(mockPoints);

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
