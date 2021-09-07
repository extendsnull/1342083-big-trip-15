export const MAIN_TITLE_MAX_LENGTH = 3;
export const RANDOM_SEPARATOR = 0.5;

export const ChartType = {
  MONEY: 'MONEY',
  TIME_SPEND: 'TIME-SPEND',
  TYPE: 'TYPE',
};

export const DateFieldId = {
  FROM: 'event-start-time',
  TO: 'event-end-time',
};

export const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

export const KeyName = {
  ESC: 'Escape',
};

export const HumanDateFormatPattern = {
  DEFAULT: 'DD/MM/YY HH:mm',
  DEFAULT_FLATPICKR: 'd/m/y H:i',
  ONLY_DAY: 'DD',
  MONTH_DAY: 'MMM DD',
  ONLY_TIME: 'HH:mm',
  DURATION_MIN: 'mm[M]',
  DURATION_HOURS: 'HH[H] mm[M]',
  DURATION_DAYS: 'DD[D] HH[H] mm[M]',
};

export const MachineDateFormatPattern = {
  DEFAULT: 'YYYY-MM-DD',
  WITH_HOURS: 'YYYY-MM-DDTHH:mm',
};

export const NavigationItem = {
  TABLE: 'table',
  STATS: 'stats',
};

export const NoPointsMessage = {
  EVERYTHING: 'Click New Event to create your first point',
  PAST: 'There are no past events now',
  FUTURE: 'There are no future events now',
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

export const TextSeparator = {
  TITLE: ' &mdash; ',
  DATES: '&nbsp;&mdash;&nbsp;',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export const UserAction = {
  ADD_POINT : 'ADD_POINT',
  DELETE_POINT : 'DELETE_POINT',
  UPDATE_POINT : 'UPDATE_POINT',
};
