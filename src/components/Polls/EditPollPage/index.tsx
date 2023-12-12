import { FC, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { findPollById } from '../../../store/polls/actions';
import { Poll } from '../../../store/polls/types';
import { MessageBox } from '../../UI';
import { PollForm } from '../PollForm';

export const EditPollPage: FC = () => {
  const [pollData, setPollData] = useState<Poll>();

  const { selectedOrganisationId } = useAppSelector((state) => state.current);
  // const { isLoading } = useAppSelector((state) => state.polls);

  const dispatch = useAppDispatch();
  const params = useParams();

  const findPollData = useCallback(async () => {
    if (!selectedOrganisationId) {
      return;
    }
    if (!params.pollId) {
      return;
    }

    const response = await dispatch(findPollById(params.pollId));
    setPollData(response);
  }, []);

  useEffect(() => {
    findPollData();
  }, []);

  if (!pollData) {
    return <MessageBox>Голосування не знайдено</MessageBox>;
  }

  return <PollForm pollData={pollData} fetchPollData={findPollData} />;
};
