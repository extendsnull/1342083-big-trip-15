import AbstractView from './abstract';
import { NoPointsMessage } from '../const';

const getNoPointTemplate = (message) => `<p class="trip-events__msg">${message}</p>`;

export default class NoPoints extends AbstractView {
  constructor(message = NoPointsMessage.EVERYTHING) {
    super();
    this._message = message;
  }

  _getTemplate() {
    return getNoPointTemplate(this._message);
  }

  changeMessage(newMessage) {
    this._element.textContent = newMessage;
  }

}
