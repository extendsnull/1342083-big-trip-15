import PointsModel from './models/points';
import FilterModel from './models/filter';
import MainPresenter from './presenters/main';
import { mockPoints } from './data';

const pointsModel = new PointsModel();
const filterModel = new FilterModel();
pointsModel.addPoints(mockPoints);

new MainPresenter(pointsModel, filterModel);
