import { getMockPoints, getInfoState, getFiltersState } from './mocks';
import {render} from './utils';
import * as view from './view';

const mainContainer = document.querySelector('.trip-main');
const navigationContainer = document.querySelector('.trip-controls__navigation');
const filtersContainer = document.querySelector('.trip-controls__filters');
const contentContainer = document.querySelector('.trip-events');

const points = getMockPoints();
const infoState = getInfoState(points);
const filtersState = getFiltersState(points);
const [firstPoint, ...restPoints] = points;

const eventItems = restPoints.map((point) => view.getEventTemplate(point));

render(mainContainer, view.getTripInfoTemplate(infoState), 'afterbegin');
render(navigationContainer, view.getTripNavigationTemplate());
render(filtersContainer, view.getTripFiltersTemplate(filtersState));

render(contentContainer, view.getTripSortTemplate());
render(contentContainer, view.getEventListTemplate(
  view.getEventFormTemplate(firstPoint),
  ...eventItems,
));
