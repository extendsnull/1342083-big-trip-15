import Api from './api/api';
import Store from './api/store';
import Provider from './api/provider';
import PointsModel from './model/points';
import FilterModel from './model/filter';
import DestinationsModel from './model/destinations';
import OffersModel from './model/offers';
import MainPresenter from './presenter/main';

const API_BASE_URL = 'https://15.ecmascript.pages.academy/big-trip';
const AUTHORIZATION = 'Basic 1zVtAYybqMP6XrwlRGtwFDBhBWdbuhn12VuJAI5Dh1';
const STORE_PREFIX = 'bigtrip-localstorage';
const STORE_VER = 'v15';
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

const PageTitle = {
  ONLINE: 'Big Trip',
  OFFLINE: 'Big Trip [Offline]',
};

const api = new Api(API_BASE_URL, AUTHORIZATION);
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);

const pointsModel = new PointsModel();
const filterModel = new FilterModel();
const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();

new MainPresenter(apiWithProvider, pointsModel, filterModel, destinationsModel, offersModel);

window.addEventListener('load', () => {
  document.title = PageTitle.ONLINE;
  navigator.serviceWorker.register('/sw.js');
});

window.addEventListener('online', () => {
  document.title = PageTitle.ONLINE;
  apiWithProvider.sync();
});

window.addEventListener('offline', () => {
  document.title = PageTitle.OFFLINE;
});
