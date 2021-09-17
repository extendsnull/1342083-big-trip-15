import Abstract from './abstract';

export default class Smart extends Abstract {
  constructor() {
    super();
    this._state = {};
  }

  updateState(stateUpdate, updateStateOnly) {
    if (!stateUpdate) {
      return;
    }

    const oldState = this._state;
    this._state = {...oldState, ...stateUpdate};

    if (updateStateOnly) {
      return;
    }

    this._updateElement();
  }

  restoreHandlers() {
    throw new Error(`Non-abstract class '${this.constructor.name}' does not implement inherited abstract member 'restoreHandlers' from class 'Smart'.`);
  }

  _updateElement() {
    const oldElement = this.getElement();
    const parent = oldElement.parentElement;

    if (parent) {
      this.removeElement();

      const newElement = this.getElement();
      parent.replaceChild(newElement, oldElement);
      this.restoreHandlers();
    }
  }
}
