import PointsModel from './models/points';
import FilterModel from './models/filter';
import NavigationPresenter from './presenters/navigation';
import InfoPresenter from './presenters/info';
import AddButtonPresenter from './presenters/add-button';
import FilterPresenter from './presenters/filter';
import BoardPresenter from './presenters/board';
import StatsPresenter from './presenters/stats';
import { mockPoints } from './data';

const pointsModel = new PointsModel();
const filterModel = new FilterModel();
pointsModel.addPoints(mockPoints);

const infoPresenter = new InfoPresenter(
  document.querySelector('.trip-main'),
  pointsModel,
);

const filterPresenter = new FilterPresenter(
  document.querySelector('.trip-controls'),
  filterModel,
  pointsModel,
);

const boardPresenter = new BoardPresenter(
  document.querySelector('.page-main .page-body__container'),
  pointsModel,
  filterModel,
);

const addButtonPresenter = new AddButtonPresenter(
  document.querySelector('.trip-main'),
  boardPresenter,
);

const statsPresenter = new StatsPresenter(
  document.querySelector('.page-main .page-body__container'),
  pointsModel,
);

const navigationPresenter = new NavigationPresenter(
  document.querySelector('.trip-controls'),
  boardPresenter,
  statsPresenter,
  pointsModel,
  filterModel,
);

infoPresenter.init();
filterPresenter.init();
addButtonPresenter.init();
boardPresenter.init();
navigationPresenter.init();

document.addEventListener('click', (evt) => {
  const target = evt.target.closest('.trip-tabs__btn[data-type]');

  if (target) {
    evt.preventDefault();
    switch (target.dataset.type) {
      case 'tabs':
      default: {
        document.body.classList.add('page-body--show-events');
        break;
      }
      case 'stats': {
        document.body.classList.remove('page-body--show-events');
        break;
      }
    }
  }
});
