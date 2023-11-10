import { Options } from 'rrule';

export type FindParams = {
  organisation?: string;
  division?: string;
  from?: string;
  till?: string;
  fields?: string[];
  offset?: number;
  limit?: number;
};

type Division = {
  id?: string;
  organisation?: string;
  name?: string;
  type?: string;
  users?: string[];
  course?: string;
};

type RepeatGroup = {
  id?: string;
  events?: string[];
  organisation?: string;
  rruleString?: string;
  rrule?: Options;
};

export type ScheduleEvent = {
  id: string;
  title?: string;
  link?: string;
  kind: string;
  classroomName?: string;
  mainLecturerFullName?: string;
  lecturersFullNames?: string[];
  start?: string;
  end?: string;
  divisions?: Division[];
  repeatGroup?: RepeatGroup;
};

export type ScheduleData = {
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  totalPages: 1;
  prevPage: number;
  nextPage: number;
  offset: number;
  limit: number;
  docs: ScheduleEvent[];
  page: number;
};

export type FindEventsResponse = ScheduleData;

export type State = {
  scheduleData: ScheduleData | undefined;
  selectedDivision: string | undefined;
  isLoading: boolean;
  error: string[];
};

export type CreateEventBody = {
  organisation?: string;
  divisions?: string[];
  title?: string;
  link?: string;
  kind?: string;
  classroomName?: string;
  mainLecturerFullName?: string;
  lecturersFullNames?: string[];
  start?: string;
  end?: string;

  repeat?: {
    count?: number;
    interval?: number;
    frequency?: number;
    timezone?: string;
  };
};
