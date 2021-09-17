import Abstract from './abstract';
import {FilterType} from '../const';

const NoPointsMessage = {
  EVERYTHING: 'Click New Event to create your first point',
  PAST: 'There are no past events now',
  FUTURE: 'There are no future events now',
};

const getNoPointTemplate = (message) => `<p class="trip-events__msg">${message}</p>`;

export default class NoPoints extends Abstract {
  constructor(filterType = FilterType.EVERYTHING) {
    super();
    this._message = NoPointsMessage[filterType];
  }

  getTemplate() {
    return getNoPointTemplate(this._message);
  }
}
