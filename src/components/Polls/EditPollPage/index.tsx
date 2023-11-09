import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { editPoll, findPolls } from '../../../store/polls/actions';
import { NewPoll } from '../../../store/polls/types';
import { MessageBox } from '../../UI';
import { PollForm } from '../PollForm';

export const EditPollPage: FC = () => {
  const dispatch = useAppDispatch();
  const params = useParams();

  const { pollsData } = useAppSelector((state) => state.polls);
  const { selectedOrganisationId } = useAppSelector((state) => state.current);

  useEffect(() => {
    if (!selectedOrganisationId) {
      return;
    }

    dispatch(findPolls(selectedOrganisationId));
  }, []);

  const pollByParamId = pollsData?.docs.find((poll) => poll.id === params.pollId);

  if (!pollByParamId) {
    return <MessageBox>Голосування не знайдено</MessageBox>;
  }

  const handleFormSubmit = (poll: NewPoll) => {
    const body = {
      id: pollByParamId.id,
      name: poll.name,
      status: pollByParamId.status,
      organisationId: pollByParamId.organisationId,
      questions: poll.questions,
    };

    dispatch(editPoll(body));
  };

  return <PollForm defaultValues={pollByParamId} onSubmit={handleFormSubmit} />;
};
