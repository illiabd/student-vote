import { FC } from 'react';

import { useAppDispatch } from '../../../hooks';
import { createPoll } from '../../../store/polls/actions';
import { NewPoll } from '../../../store/polls/types';
import { PollForm } from '../PollForm';

export const CreatePollPage: FC = () => {
  const dispatch = useAppDispatch();

  const handleFormSubmit = (body: NewPoll) => {
    dispatch(createPoll(body));
  };

  return <PollForm onSubmit={handleFormSubmit} />;
};
