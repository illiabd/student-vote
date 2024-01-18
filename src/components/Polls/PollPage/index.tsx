import { FC, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { findPolls } from '../../../store/polls/actions';
import { PollStatus } from '../../../store/polls/types';
import { MessageBox } from '../../UI';
import { PollResultsPage } from '..';
import { PollForm } from '../PollForm';

export const PollPage: FC = () => {
  const { selectedOrganisationId } = useAppSelector((state) => state.current);
  const { pollsData } = useAppSelector((state) => state.polls);

  const dispatch = useAppDispatch();
  const params = useParams();

  const fetchPollsData = useCallback(async () => {
    if (!selectedOrganisationId) {
      return;
    }
    if (!params.pollId) {
      return;
    }

    await dispatch(findPolls(selectedOrganisationId));
  }, [selectedOrganisationId, params]);

  useEffect(() => {
    fetchPollsData();
  }, [fetchPollsData]);

  const currentPoll = pollsData?.docs.find((poll) => poll.id === params.pollId);

  if (!currentPoll) {
    return <MessageBox>Голосування не знайдено</MessageBox>;
  }

  const isPollStarted = currentPoll?.status !== PollStatus.created;

  if (isPollStarted) {
    return <PollResultsPage pollData={currentPoll} />;
  }

  return <PollForm pollData={currentPoll} fetchPollData={fetchPollsData} />;
};
