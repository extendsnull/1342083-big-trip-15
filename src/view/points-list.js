import AbstractView from './abstract';

const getPointsListTemplate = () => '<ul class="trip-events__list"></ul>';

export default class PointsListView extends AbstractView {
  _getTemplate() {
    return getPointsListTemplate();
  }
}
