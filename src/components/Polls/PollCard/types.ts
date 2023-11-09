import { Poll } from '../../../store/polls/types';

export type VoteCardProps = {
  data: Poll;
};

export type DeleteModalProps = {
  data: Poll;
  onClose: () => void;
};
