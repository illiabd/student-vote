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
