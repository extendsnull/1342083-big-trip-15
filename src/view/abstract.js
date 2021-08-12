import {createElement} from '../utils/render';

export default class Abstract {
  constructor() {
    if (new.target === Abstract) {
      throw new Error('Cannot create an instance of an abstract class.');
    }

    this._element = null;
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
    throw new Error(`Non-abstract class '${this.constructor.name}' does not implement inherited abstract member 'getTemplate' from class 'Abstract'.`);
  }
}
