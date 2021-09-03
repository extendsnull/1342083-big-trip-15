import NavigationView from '../view/navigation';
import { NavigationItem, RenderPosition } from '../const';
import { remove, render, replace } from '../utils/render';

export default class NavigationPresenter {
  constructor(container, boardPresenter, pointsModel, filterModel) {
    this._container = container;
    this._boardPresenter = boardPresenter;
    this._pointsModel = pointsModel;
    this._filterModel = filterModel;

    this._navigationItems = [NavigationItem.TABLE, NavigationItem.STATS];
    this._activeNavigationItem = NavigationItem.TABLE;
    this._navigationComponent = null;

    this._handleNavigationItemClick = this._handleNavigationItemClick.bind(this);
    this._init();
  }

  _handleNavigationItemClick(controlType) {
    switch (controlType) {
      case NavigationItem.TABLE: {
        this._boardPresenter.init();
        this._activeNavigationItem = NavigationItem.TABLE;
        break;
      }
      case NavigationItem.STATS: {
        this._boardPresenter.destroy();
        this._activeNavigationItem = NavigationItem.STATS;
        break;
      }
    }

    this._render();
  }

  _render() {
    const prevNavigationComponent = this._navigationComponent;
    this._navigationComponent = new NavigationView(this._navigationItems, this._activeNavigationItem);
    this._navigationComponent.setItemClickHandler(this._handleNavigationItemClick);

    if (prevNavigationComponent === null) {
      return render(this._container, this._navigationComponent, RenderPosition.AFTER_BEGIN);
    }

    replace(this._navigationComponent, prevNavigationComponent);
    remove(prevNavigationComponent);
  }

  _init() {
    this._render();
  }
}
