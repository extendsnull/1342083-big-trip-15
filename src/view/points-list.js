import Abstract from './abstract';

const getPointsListTemplate = () => '<ul class="trip-events__list"></ul>';

export default class PointsList extends Abstract {
  getTemplate() {
    return getPointsListTemplate();
  }
}
