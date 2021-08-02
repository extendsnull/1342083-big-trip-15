import {Event} from './const';
import {render} from './utils';
import * as view from './view';

const mainContainer = document.querySelector('.trip-main');
const navigationContainer = document.querySelector('.trip-controls__navigation');
const filtersContainer = document.querySelector('.trip-controls__filters');
const contentContainer = document.querySelector('.trip-events');

const eventItems = Array.from(new Array(Event.COUNT), () => view.getEventTemplate());

render(mainContainer, view.getTripInfoTemplate(), 'afterbegin');
render(navigationContainer, view.getTripNavigationTemplate());
render(filtersContainer, view.getTripFiltersTemplate());

render(contentContainer, view.getTripSortTemplate());
render(contentContainer, view.getEventListTemplate(
  view.getEventFormTemplate(),
  ...eventItems,
));
