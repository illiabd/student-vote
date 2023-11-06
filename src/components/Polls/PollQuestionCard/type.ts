import { CreateQuestion } from '../CreatePollPage/type';

export type PollQuestionCardProps = {
  questionId: string;
  onChange: (id: string, value: CreateQuestion) => void;
  onDelete: (id: string) => void;
};

export type QuestionFormValues = {
  questionName: string;
};

export type OptionFormValues = {
  optionName: string;
};
