import { NewQuestion, Poll } from '../../../store/polls/types';

export type CreateQuestion = NewQuestion & {
  questionId: string;
};

export type FormValues = {
  name: string;
  facultyName?: string;
};

export type PollFormProps = {
  pollData: Poll;
  fetchPollData: () => Promise<void>;
};

export type University = {
  id: string;
  name: string;
  shortName: string;
  roles: [];
  faculties: string[];
  kind: string;
};

export type GetUniversityResponse = {
  data: {
    university: University;
  };
};
