import { NewQuestion } from '../../../store/polls/types';

export type PollQuestionCardProps = {
  questionId: string;
  pollId?: string;
  disabled?: boolean;
  defaultQuestion?: NewQuestion;
  fetchPollData: () => Promise<void>;
};

export type QuestionFormValues = {
  questionName: string;
};

export type OptionFormValues = {
  optionName: string;
};
