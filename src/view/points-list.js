import AbstractView from './abstract';

const getPointsListTemplate = () => '<ul class="trip-events__list"></ul>';

export default class PointsList extends AbstractView {
  _getTemplate() {
    return getPointsListTemplate();
  }
}
