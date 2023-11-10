import { NewQuestion } from '../../../store/polls/types';
import { CreateQuestion } from '../PollForm/type';

export type PollQuestionCardProps = {
  questionId: string;
  defaultQuestion?: NewQuestion;
  onChange: (id: string, value: CreateQuestion) => void;
  onDelete: (id: string) => void;
};

export type QuestionFormValues = {
  questionName: string;
};

export type OptionFormValues = {
  optionName: string;
};
