export const MAIN_TITLE_MAX_LENGTH = 3;

export const MOCK_CITIES = ['Rome', 'Paris', 'Prague', 'London', 'Istanbul', 'Amsterdam', 'Barcelona', 'Saint Petersburg', 'Dubrovnik', 'Berlin', 'Vienna', 'Athens', 'Lisbon', 'Warsaw', 'Stockholm', 'Tallinn', 'Venice', 'Seville', 'Belgrade', 'Bruges', 'Budapest', 'Brasov', 'Edinburgh', 'Copenhagen', 'Dublin'];

export const POINT_TYPES = [
  { name: 'taxi', label: 'Taxi' },
  { name: 'bus', label: 'Bus' },
  { name: 'train', label: 'Train' },
  { name: 'ship', label: 'Ship' },
  { name: 'drive', label: 'Drive' },
  { name: 'flight', label: 'Flight' },
  { name: 'check-in', label: 'Check-in' },
  { name: 'sightseeing', label: 'Sightseeing' },
  { name: 'restaurant', label: 'Restaurant' },
];

export const RANDOM_SEPARATOR = 0.5;

export const HumanDateFormatPattern = {
  DEFAULT: 'DD/MM/YY HH:mm',
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

export const TextSeparator = {
  TITLE: ' &mdash; ',
  DATES: '&nbsp;&mdash;&nbsp;',
};
