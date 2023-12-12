import { NewQuestion } from '../../../store/polls/types';

export type PollQuestionCardProps = {
  questionId: string;
  pollId?: string;
  defaultQuestion?: NewQuestion;
  fetchPollData: () => void;
};

export type QuestionFormValues = {
  questionName: string;
};

export type OptionFormValues = {
  optionName: string;
};
