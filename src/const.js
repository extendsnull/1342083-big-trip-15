export const BLANK_DESTINATION = {
  name: '',
  description: '',
  pictures: [],
};

export const BLANK_POINT = {
  basePrice: 0,
  destination: {...BLANK_DESTINATION},
  isFavorite: false,
  offers: [],
};

export const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

export const HumanDateFormatPattern = {
  DEFAULT: 'DD/MM/YY HH:mm',
  DEFAULT_FLATPICKR: 'd/m/y H:i',
  ONLY_DAY: 'DD',
  MONTH_DAY: 'MMM DD',
  ONLY_TIME: 'HH:mm',
};

export const RenderPosition = {
  AFTER_BEGIN: 'afterbegin',
  BEFORE_END: 'beforeend',
};

export const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFER: 'offer',
};

export const State = {
  ABORTING: 'ABORTING',
  DELETING: 'DELETING',
  SAVING: 'SAVING',
};

export const ToastMessage = {
  ADD: 'You can\'t create new point offline',
  DELETE: 'You can\'t delete point offline',
  EDIT: 'You can\'t edit point offline',
  SAVE: 'You can\'t save point offline',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT : 'INIT',
};

export const UserAction = {
  ADD_POINT : 'ADD_POINT',
  DELETE_POINT : 'DELETE_POINT',
  UPDATE_POINT : 'UPDATE_POINT',
};
