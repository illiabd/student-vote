import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { findPolls } from '../../../store/polls/actions';
import { MessageBox } from '../../UI';
import { PollForm } from '../PollForm';

export const EditPollPage: FC = () => {
  const dispatch = useAppDispatch();
  const params = useParams();

  const { pollsData } = useAppSelector((state) => state.polls);
  const { selectedOrganisationId } = useAppSelector((state) => state.current);
  const pollByParamId = pollsData?.docs.find((poll) => poll.id === params.pollId);

  useEffect(() => {
    if (!selectedOrganisationId) {
      return;
    }

    if (pollByParamId) {
      return;
    }

    dispatch(findPolls(selectedOrganisationId));
  }, []);

  if (!pollByParamId) {
    return <MessageBox>Голосування не знайдено</MessageBox>;
  }

  return <PollForm pollData={pollByParamId} />;
};
