import { Poll } from '../../../store/polls/types';

export type PollResultsPageProps = {
  pollData: Poll;
};

type Option = {
  id: string;
  name: string;
  amount: number;
};

type Question = {
  id: string;
  name: string;
  options: Option[];
};

export type PollResults = {
  id: string;
  organisationId: string;
  questions: Question[];
};
