import FilterView from '../view/filter';
import { FilterType, UpdateType } from '../const';
import { formatLabel } from '../utils/common';
import { filter } from '../utils/filter';
import { remove, render, replace } from '../utils/render';

export default class FilterPresenter {
  constructor(container, filterModel, pointsModel) {
    this._container = container;
    this._filterModel = filterModel;
    this._pointsModel = pointsModel;

    this._filterComponent = null;

    this._bindContext();
    this._addObservers();
    this._init();
  }

  _getFilters() {
    const points = this._pointsModel.getPoints();
    return [FilterType.EVERYTHING, FilterType.FUTURE, FilterType.PAST].map((type) => ({
      type,
      name: formatLabel(type),
      count: filter[type](points),
    }));
  }

  _clearFilter() {
    remove(this._filterComponent);
  }

  _renderFilter() {
    const prevFilterComponent = this._filterComponent;
    this._filterComponent = new FilterView(this._getFilters(), this._filterModel.getFilter());
    this._filterComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);

    if (prevFilterComponent === null) {
      return render(this._container, this._filterComponent);
    }

    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  _bindContext() {
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);
  }

  _addObservers() {
    this._filterModel.addObserver(this._handleModelEvent);
    this._pointsModel.addObserver(this._handleModelEvent);
  }

  _handleModelEvent() {
    this._init();
  }

  _handleFilterTypeChange(type) {
    if (this._filterModel.getFilter() !== type) {
      this._filterModel.setFilter(UpdateType.MAJOR, type);
    }
  }

  _init() {
    this._renderFilter();
  }
}
