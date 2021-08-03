export const Point = {
  TYPES: [
    { name: 'taxi', label: 'Taxi' },
    { name: 'bus', label: 'Bus' },
    { name: 'train', label: 'Train' },
    { name: 'ship', label: 'Ship' },
    { name: 'drive', label: 'Drive' },
    { name: 'flight', label: 'Flight' },
    { name: 'check-in', label: 'Check-in' },
    { name: 'sightseeing', label: 'Sightseeing' },
    { name: 'restaurant', label: 'Restaurant' },
  ],
  MOCK_CITIES: ['Rome', 'Paris', 'Prague', 'London', 'Istanbul', 'Amsterdam', 'Barcelona', 'Saint Petersburg', 'Dubrovnik', 'Berlin', 'Vienna', 'Athens', 'Lisbon', 'Warsaw', 'Stockholm', 'Tallinn', 'Venice', 'Seville', 'Belgrade', 'Bruges', 'Budapest', 'Brasov', 'Edinburgh', 'Copenhagen', 'Dublin'],
};

export const DateFormatPattern = {
  HUMAN: {
    DEFAULT: 'DD/MM/YY HH:mm',
    ONLY_DAY: 'DD',
    MONTH_DAY: 'MMM DD',
    ONLY_TIME: 'HH:mm',
    DURATION_MIN: 'mm[M]',
    DURATION_HOURS: 'HH[H] mm[M]',
    DURATION_DAYS: 'DD[D] HH[H] mm[M]',
  },
  MACHINE: {
    DEFAULT: 'YYYY-MM-DD',
    WITH_HOURS: 'YYYY-MM-DDTHH:mm',
  },
};

export const RANDOM_SEPARATOR = 0.5;

