import { NewPoll, NewQuestion, Poll } from '../../../store/polls/types';

export type CreateQuestion = NewQuestion & {
  questionId: string;
};

export type FormValues = {
  name: string;
};

export type PollFormProps = {
  defaultValues?: Poll;
  onSubmit: (poll: NewPoll) => void;
};
