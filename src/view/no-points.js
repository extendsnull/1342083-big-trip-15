import {NoPointsMessage} from '../const';
import {createElement} from '../utils';

const getNoPointTemplate = (message) => `<p class="trip-events__msg">${message}</p>`;

export default class NoPoints {
  constructor(message = NoPointsMessage.EVERYTHING) {
    this._element = null;
    this._message = message;
  }

  changeMessage(newMessage) {
    this._element.textContent = newMessage;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  getTemplate() {
    return getNoPointTemplate(this._message);
  }
}
