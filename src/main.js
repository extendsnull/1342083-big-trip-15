import Api from './api';
import PointsModel from './models/points';
import FilterModel from './models/filter';
import DestinationsModel from './models/destinations';
import OffersModel from './models/offers';
import MainPresenter from './presenters/main';

const BASE_URL = 'https://15.ecmascript.pages.academy/big-trip';
const AUTHORIZATION = 'Basic 1zVtAYybqMP6XrwlRGtwFDBhBWdbuhn12VuJAI5Dh1';

const api = new Api(BASE_URL, AUTHORIZATION);

const pointsModel = new PointsModel();
const filterModel = new FilterModel();
const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();

new MainPresenter(api, pointsModel, filterModel, destinationsModel, offersModel);
