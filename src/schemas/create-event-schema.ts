import * as Yup from 'yup';

import {
  EVENT_COUNT_MIN_VALUE,
  EVENT_COUNT_NOT_PROVIDED,
  EVENT_DATE_NOT_PROVIDED,
  EVENT_DIVISIONS_NOT_PROVIDED,
  EVENT_END_NOT_PROVIDED,
  EVENT_FREQUENCY_NOT_PROVIDED,
  EVENT_INTERVAL_MIN_VALUE,
  EVENT_INTERVAL_NOT_PROVIDED,
  EVENT_KIND_NOT_PROVIDED,
  EVENT_MAIN_LECTURER_FULL_NAME,
  EVENT_START_NOT_PROVIDED,
  EVENT_TITLE_NOT_PROVIDED,
  LINK_INVALID,
  LINK_REGEX,
} from '../constants';

const title = Yup.string().required(EVENT_TITLE_NOT_PROVIDED);
const link = Yup.string().matches(LINK_REGEX, LINK_INVALID);
const kind = Yup.string().required(EVENT_KIND_NOT_PROVIDED);
const classroomName = Yup.string();
const mainLecturerFullName = Yup.string().required(EVENT_MAIN_LECTURER_FULL_NAME);
const start = Yup.string().required(EVENT_START_NOT_PROVIDED);
const end = Yup.string().required(EVENT_END_NOT_PROVIDED);
const date = Yup.string().required(EVENT_DATE_NOT_PROVIDED);
const divisions = Yup.array().min(1, EVENT_DIVISIONS_NOT_PROVIDED);
const frequency = Yup.string().required(EVENT_FREQUENCY_NOT_PROVIDED);
const count = Yup.number().required(EVENT_COUNT_NOT_PROVIDED).min(1, EVENT_COUNT_MIN_VALUE);
const interval = Yup.number()
  .required(EVENT_INTERVAL_NOT_PROVIDED)
  .min(1, EVENT_INTERVAL_MIN_VALUE);

export const createEventSchema = Yup.object().shape({
  title,
  link,
  kind,
  classroomName,
  mainLecturerFullName,
  start,
  end,
  divisions,
  date,
  interval,
  count,
  frequency,
});
