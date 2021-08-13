import {getMockPoints, getInfoState, getFilterState} from './mocks';
import {NoPointsMessage} from './const';
import {isEscKey} from './utils/common';
import {createElement, render, replace, remove} from './utils/render';

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
render(pageHeaderContainer, new Info(infoState));

const navigationContainer = document.querySelector('.trip-controls__navigation');
const filtersContainer = document.querySelector('.trip-controls__filters');
const contentContainer = document.querySelector('.trip-events');

render(navigationContainer, new Navigation());
render(filtersContainer, new FilterForm(filterState));

const renderPoint = (container, props) => {
  const pointComponent = new Point(props);
  const pointFormComponent = new PointForm(props, true);

  const replacePointToForm = () => replace(pointFormComponent, pointComponent);
  const replaceFormToPoint = () => replace(pointComponent, pointFormComponent);

  const onEscKeyPress = (evt) => {
    if (isEscKey(evt.key)) {
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyPress);
    }
  };

  pointComponent.setEditClickHandler(() => {
    replacePointToForm();
    document.addEventListener('keydown', onEscKeyPress);
  });

  pointFormComponent.setDeleteClickHandler(() => {
    remove(pointComponent);
    remove(pointFormComponent);
    document.removeEventListener('keydown', onEscKeyPress);
  });

  pointFormComponent.setResetClickHandler(() => {
    replaceFormToPoint();
    document.removeEventListener('keydown', onEscKeyPress);
  });

  pointFormComponent.setSubmitHandler(() => {
    replaceFormToPoint();
    document.removeEventListener('keydown', onEscKeyPress);
  });

  render(container, pointComponent);
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
    render(contentContainer, noPoint);
    return;
  }

  render(contentContainer, new SortForm());
  renderPointsList(items);
};

renderBoard(pointsProps);
