import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { HumanDateFormatPattern } from '../const';
import { addLeadZero } from './common';

dayjs.extend(duration);

export const formatDate = (timestamp, pattern = HumanDateFormatPattern.DEFAULT) => dayjs(timestamp).format(pattern);

export const getDatesDiff = (lower, upper) => dayjs(upper).diff(dayjs(lower));

export const getDuration = (firstTimestamp, secondTimestamp) => {
  const lower = Math.min(firstTimestamp, secondTimestamp);
  const upper = Math.max(firstTimestamp, secondTimestamp);
  return dayjs.duration(getDatesDiff(lower, upper)).asMilliseconds();
};

export const humanizeDuration = (dur) => {
  const diff = dayjs.duration(dur);
  const days = Math.floor(diff.asDays());
  const hours = diff.hours();
  const minutes = diff.minutes();
  let humanizesDuration = `${addLeadZero(minutes)}M`;

  if (hours) {
    humanizesDuration = `${addLeadZero(hours)}H ${humanizesDuration}`;
  }

  if (days) {
    humanizesDuration = `${addLeadZero(days)}D ${humanizesDuration}`;
  }

  return humanizesDuration;
};

export const getHumanizedDateDuration = (firstTimestamp, secondTimestamp) => {
  const diff = getDuration(firstTimestamp, secondTimestamp);
  return humanizeDuration(diff);
};

export const getTimestamp = (date) => dayjs(date).valueOf();

export const isPastDate = (timestamp) => {
  const now = dayjs();
  return dayjs(timestamp).isBefore(now, 'ms');
};

export const isFutureDate = (timestamp) => {
  const now = dayjs();
  return dayjs(now).isBefore(timestamp, 'ms');
};

export const isOneMonthDates = (firstTimestamp, secondTimestamp) =>
  dayjs(firstTimestamp).month() === dayjs(secondTimestamp).month();
