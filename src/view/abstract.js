import { createElement } from '../utils/render';

const SHAKE_ANIMATION_CLASSNAME = 'shake';

export default class Abstract {
  constructor() {
    if (new.target === Abstract) {
      throw new Error('Cannot create an instance of an abstract class.');
    }

    this._element = null;
    this._callback = {};
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this._getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  shake(callback = () => {}) {
    const element = this.getElement();

    element.addEventListener('animationend', () => {
      element.classList.remove(SHAKE_ANIMATION_CLASSNAME);
      callback();
    });

    element.classList.add(SHAKE_ANIMATION_CLASSNAME);
  }

  _getTemplate() {
    throw new Error(`Non-abstract class '${this.constructor.name}' does not implement inherited abstract member '_getTemplate' from class 'Abstract'.`);
  }
}
