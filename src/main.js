import {getMockPoints, getInfoState, getFilterState} from './mocks';
import {NoPointsMessage} from './const';
import {isEscKey} from './utils/common';
import {render, createElement} from './utils/render';

import Info from './view/info';
import FilterForm from './view/filter-form';
import Navigation from './view/navigation';
import SortForm from './view/sort-form';
import Point from './view/point';
import PointForm from './view/point-form';
import NoPoints from './view/no-points';

const pointsProps = getMockPoints();
const infoState = getInfoState(pointsProps);
const filterState = getFilterState(pointsProps);

const pageHeaderContainer = document.querySelector('.page-header__container');
render(pageHeaderContainer, new Info(infoState).getElement());

const navigationContainer = document.querySelector('.trip-controls__navigation');
const filtersContainer = document.querySelector('.trip-controls__filters');
const contentContainer = document.querySelector('.trip-events');

render(navigationContainer, new Navigation().getElement());
render(filtersContainer, new FilterForm(filterState).getElement());

const renderPoint = (container, props) => {
  const pointComponent = new Point(props);
  const pointFormComponent = new PointForm(props, true);

  const showPointFormButton = pointComponent.getElement().querySelector('.event__rollup-btn');
  const hidePointFormButton = pointFormComponent.getElement().querySelector('.event__rollup-btn');

  const replaceFormToPoint = () => {
    container.replaceChild(
      pointComponent.getElement(),
      pointFormComponent.getElement(),
    );
  };

  const replacePointToForm = () => {
    container.replaceChild(
      pointFormComponent.getElement(),
      pointComponent.getElement(),
    );
  };

  const onEscKeyPress = (evt) => {
    if (isEscKey(evt.key)) {
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyPress);
    }
  };

  showPointFormButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    replacePointToForm();
    document.addEventListener('keydown', onEscKeyPress);
  });

  hidePointFormButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    replaceFormToPoint();
    document.removeEventListener('keydown', onEscKeyPress);
  });

  pointFormComponent.getElement().addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceFormToPoint();
    document.removeEventListener('keydown', onEscKeyPress);
  });

  render(container, pointComponent.getElement());
};

const renderPointsList = (items) => {
  const pointsListElement = createElement('<ul class="trip-events__list"></ul>');

  for (const pointProps of items) {
    renderPoint(pointsListElement, pointProps);
  }

  render(contentContainer, pointsListElement);
};

const renderBoard = (items) => {
  const isEmpty = items.every((point) => point.isExpired);

  if (isEmpty) {
    const noPoint = new NoPoints(NoPointsMessage.EVERYTHING);
    render(contentContainer, noPoint.getElement());
    return;
  }

  render(contentContainer, new SortForm().getElement());
  renderPointsList(items);
};

renderBoard(pointsProps);
