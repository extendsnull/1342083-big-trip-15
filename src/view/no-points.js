import AbstractView from './abstract';
import { FilterType, NoPointsMessage } from '../const';

const MESSAGES = {
  [FilterType.EVERYTHING]: NoPointsMessage.EVERYTHING,
  [FilterType.FUTURE]: NoPointsMessage.FUTURE,
  [FilterType.PAST]: NoPointsMessage.PAST,
};

const getNoPointTemplate = (message) => `<p class="trip-events__msg">${message}</p>`;

export default class NoPointsView extends AbstractView {
  constructor(filterType = FilterType.EVERYTHING) {
    super();
    this._message = MESSAGES[filterType];
  }

  _getTemplate() {
    return getNoPointTemplate(this._message);
  }
}
