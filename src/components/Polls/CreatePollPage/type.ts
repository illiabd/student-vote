import { NewQuestion } from '../../../store/polls/types';

export type CreateQuestion = NewQuestion & {
  questionId: string;
};

export type FormValues = {
  name: string;
};
