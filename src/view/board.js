import Abstract from './abstract';

const getBoardTemplate = () => (`
  <section class="trip-events">
    <h2 class="visually-hidden">Trip events</h2>
  </section>`);

export default class Board extends Abstract {
  getTemplate() {
    return getBoardTemplate();
  }
}
