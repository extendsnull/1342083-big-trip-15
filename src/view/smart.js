import AbstractView from './abstract';
import { replace } from '../utils/render';

export default class SmartView extends AbstractView {
  constructor() {
    super();
    this._state = {};
  }

  _restoreHandlers() {
    throw new Error(`Non-abstract class '${this.constructor.name}' does not implement inherited abstract member '_restoreHandlers' from class 'SmartView'.`);
  }

  _updateElement() {
    const oldElement = this.getElement();
    this.removeElement();
    const newElement = this.getElement();
    replace(newElement, oldElement);
    this._restoreHandlers();
  }

  _updateState(stateUpdate, updateStateOnly) {
    if (!stateUpdate) {
      return;
    }

    const oldState = this._state;
    this._state = { ...oldState, ...stateUpdate };

    if (updateStateOnly) {
      return;
    }

    this._updateElement();
  }
}