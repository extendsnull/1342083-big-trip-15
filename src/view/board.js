import AbstractView from './abstract';

const getBoardTemplate = () => `
  <section class="trip-events">
    <h2 class="visually-hidden">Trip events</h2>
  </section>`;

export default class BoardView extends AbstractView {
  _getTemplate() {
    return getBoardTemplate();
  }
}
