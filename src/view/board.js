import AbstractView from './abstract';

const getBoardTemplate = () => (`
  <div class="page-body__container">
    <section class="trip-events">
      <h2 class="visually-hidden">Trip events</h2>
    </section>
  </div>`);

export default class BoardView extends AbstractView {
  _getTemplate() {
    return getBoardTemplate();
  }
}
