import Abstract from './abstract';

const getLoadingTemplate = () => (`
  <section class="trip-events">
    <h2 class="visually-hidden">Trip events</h2>
    <p class="trip-events__msg">Loading...</p>
  </section>`);

export default class Loading extends Abstract {
  getTemplate() {
    return getLoadingTemplate();
  }
}
