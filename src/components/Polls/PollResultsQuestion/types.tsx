import { PollOptions } from '../../../store/polls/types';

export type PollResultsQuestionProps = {
  question: {
    id: string;
    name: string;
    options: PollOptions[];
  };
};
