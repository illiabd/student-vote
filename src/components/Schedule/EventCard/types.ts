import { ScheduleEvent } from '../../../store/schedule/types';

export type EventCardProps = {
  scheduleEvent: ScheduleEvent;
  onSubmit: () => void;
};

export type EditEventModalProps = {
  organisationId: string;
  eventId: string;
  onClose: () => void;
  onSubmit: () => void;
};
export type EventFormValues = {
  title?: string;
  link?: string;
  kind?: string;
  mainLecturerFullName?: string;
  date?: string;
  start?: string;
  end?: string;
  divisions?: string[];
  classroomName?: string;
  interval: number;
  count: number;
  frequency: number;
};
