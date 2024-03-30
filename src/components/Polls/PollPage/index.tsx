import { FC, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { findPollById } from '../../../store/polls/actions';
import { Poll, PollStatus } from '../../../store/polls/types';
import { MessageBox } from '../../UI';
import { PollResultsPage } from '..';
import { PollForm } from '../PollForm';

export const PollPage: FC = () => {
  const { selectedOrganisationId } = useAppSelector((state) => state.current);
  const [pollData, setPollData] = useState<Poll>();

  const dispatch = useAppDispatch();
  const params = useParams();

  const fetchPollsData = useCallback(async () => {
    if (!selectedOrganisationId) {
      return;
    }
    if (!params.pollId) {
      return;
    }

    const response = await dispatch(findPollById(params.pollId));
    setPollData(response);
  }, [selectedOrganisationId, params]);

  useEffect(() => {
    fetchPollsData();
  }, [fetchPollsData]);

  if (!pollData) {
    return <MessageBox>Голосування не знайдено</MessageBox>;
  }

  switch (pollData?.status) {
    case PollStatus.created:
      return <PollForm pollData={pollData} fetchPollData={fetchPollsData} />;
    case PollStatus.closed:
    case PollStatus.open:
      return <PollResultsPage pollData={pollData} />;
    default:
      return <PollForm pollData={pollData} fetchPollData={fetchPollsData} />;
  }
};
