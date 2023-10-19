// import { Vote } from '../../../store/vacancies/types';

import { string } from 'yup';

type Vote = {
  id: string;
  organisation: string;
  title: string;
  isPublished: boolean;
};

export type VoteCardProps = {
  data: Vote;
};

export type DeleteModalProps = {
  data: Vote;
  onClose: () => void;
};
