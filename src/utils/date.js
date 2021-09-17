import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import {HumanDateFormatPattern} from '../const';
import {addLeadZero} from './common';

dayjs.extend(duration);

export const formatDate = (date, pattern = HumanDateFormatPattern.DEFAULT) => dayjs(date).format(pattern);

export const getDatesDiff = (from, to) => dayjs(to).diff(dayjs(from));

export const getDuration = (from, to) => dayjs.duration(getDatesDiff(from, to));

export const humanizeDuration = (from, to) => {
  const durationValue = to ? getDuration(from, to) : dayjs.duration(from);
  const days = Math.floor(durationValue.asDays());
  const hours = durationValue.hours();
  const minutes = durationValue.minutes();
  let humanizesDuration = `${addLeadZero(minutes)}M`;

  if (hours) {
    humanizesDuration = `${addLeadZero(hours)}H ${humanizesDuration}`;
  }

  if (days) {
    humanizesDuration = `${addLeadZero(days)}D ${humanizesDuration}`;
  }

  return humanizesDuration;
};

export const getHumanizedDuration = (from, to) => humanizeDuration(from, to);

export const getISOString = (date) => dayjs(date).toISOString();

export const getTimestamp = (date) => dayjs(date).valueOf();

export const isPastDate = (date) => {
  const now = dayjs();
  return dayjs(date).isBefore(now, 'ms');
};

export const isFutureDate = (date) => {
  const now = dayjs();
  return dayjs(now).isBefore(date, 'ms');
};

export const isOneYearDates = (firstDate, secondDate) => dayjs(firstDate).year() === dayjs(secondDate).year();

export const isOneMonthDates = (firstDate, secondDate) => dayjs(firstDate).month() === dayjs(secondDate).month();

export const isOneDayDates = (firstDate, secondDate) => dayjs(firstDate).day() === dayjs(secondDate).day();
