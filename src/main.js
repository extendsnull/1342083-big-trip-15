import Api from './api';
import PointsModel from './model/points';
import FilterModel from './model/filter';
import DestinationsModel from './model/destinations';
import OffersModel from './model/offers';
import MainPresenter from './presenter/main';

const BASE_URL = 'https://15.ecmascript.pages.academy/big-trip';
const AUTHORIZATION = 'Basic 1zVtAYybqMP6XrwlRGtwFDBhBWdbuhn12VuJAI5Dh1';

const api = new Api(BASE_URL, AUTHORIZATION);

const pointsModel = new PointsModel();
const filterModel = new FilterModel();
const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();

new MainPresenter(api, pointsModel, filterModel, destinationsModel, offersModel);
