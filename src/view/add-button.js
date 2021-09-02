import AbstractView from './abstract';

const getAddButtonTemplate = () => (`
  <button
    class="trip-main__event-add-btn btn btn--big btn--yellow"
    type="button"
  >New event</button>`);

export default class AddButtonView extends AbstractView {
  _getTemplate() {
    return getAddButtonTemplate();
  }
}
