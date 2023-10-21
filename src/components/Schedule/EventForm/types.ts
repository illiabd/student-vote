import { ScheduleEvent } from '../../../store/schedule/types';

export type EventFormProps = {
  organisationId: string;
  defaultValues?: ScheduleEvent;
  onSubmit?: (
    body: EventFormValues & {
      organisation?: string;
      repeat: { interval: number; count: number; frequency: number };
    },
  ) => void;
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
  interval?: number;
  count?: number | null;
  frequency?: number;
};
