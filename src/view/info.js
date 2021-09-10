import Abstract from './abstract';

const getInfoTemplate = (details) => {
  const { title, terms, totalCost } = details;

  return `
    <section class="trip-main__trip-info trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">
          ${title}
        </h1>
        <p class="trip-info__dates">
          ${terms}
        </p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalCost}</span>
      </p>
    </section>`;
};

export default class Info extends Abstract {
  constructor(details) {
    super();
    this._details = details;
  }

  _getTemplate() {
    return getInfoTemplate(this._details);
  }
}
