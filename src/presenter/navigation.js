import NavigationView from '../view/navigation';
import { NavigationItem, RenderPosition } from '../const';
import { remove, render, replace } from '../utils/render';

export default class Navigation {
  constructor(container, boardPresenter, statsPresenter, pointsModel, filterModel) {
    this._container = container;

    this._boardPresenter = boardPresenter;
    this._statsPresenter = statsPresenter;

    this._pointsModel = pointsModel;
    this._filterModel = filterModel;

    this._navigationItems = [NavigationItem.TABLE, NavigationItem.STATS];
    this._activeNavigationItem = NavigationItem.TABLE;
    this._navigationComponent = null;

    this._handlePointsModelEvent = this._handlePointsModelEvent.bind(this);
    this._handleFilterModelEvent = this._handleFilterModelEvent.bind(this);
    this._handleNavigationItemClick = this._handleNavigationItemClick.bind(this);

    this._pointsModel.addObserver(this._handlePointsModelEvent);
    this._filterModel.addObserver(this._handleFilterModelEvent);
  }

  init() {
    this._render();
  }

  _renderTable() {
    this._boardPresenter.init();
    this._statsPresenter.destroy();
    this._activeNavigationItem = NavigationItem.TABLE;
    this._render();
  }

  _renderStats() {
    this._boardPresenter.destroy();
    this._statsPresenter.init();
    this._activeNavigationItem = NavigationItem.STATS;
    this._render();
  }

  _handlePointsModelEvent() {
    const isDisabled = !this._pointsModel.getPoints().length;
    this._render(isDisabled);
  }

  _handleFilterModelEvent() {
    if (this._activeNavigationItem === NavigationItem.STATS) {
      this._renderTable();
    }
  }

  _handleNavigationItemClick(controlType) {
    switch (controlType) {
      case NavigationItem.TABLE: {
        this._renderTable();
        break;
      }
      case NavigationItem.STATS: {
        this._renderStats();
        break;
      }
    }
  }

  _render(isDisabled = false) {
    const prevNavigationComponent = this._navigationComponent;
    this._navigationComponent = new NavigationView(this._navigationItems, this._activeNavigationItem, isDisabled);
    this._navigationComponent.setItemClickHandler(this._handleNavigationItemClick);

    if (prevNavigationComponent === null) {
      return render(this._container, this._navigationComponent, RenderPosition.AFTER_BEGIN);
    }

    replace(this._navigationComponent, prevNavigationComponent);
    remove(prevNavigationComponent);
  }

}
