import { ArrowLeft24Regular } from '@fluentui/react-icons';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { FC, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '../../../axios';
import { PollStatusNames } from '../../../constants';
import { PollStatus } from '../../../store/polls/types';
import { Card, IconButton } from '../../UI';
import { PollResultsQuestion } from '..';
import { GetUniversityResponse, University } from '../PollForm/type';
import styles from './PollResultsPage.module.scss';
import { PollResults, PollResultsPageProps } from './types';

export const PollResultsPage: FC<PollResultsPageProps> = ({ pollData }) => {
  const [pollResults, setPollResults] = useState<PollResults>();
  const [university, setUniversity] = useState<University>();

  const navigate = useNavigate();

  const fetchPollResults = useCallback(async () => {
    const response = await api.get<PollResults>(`vote/v1/polls/results/${pollData?.id}`);
    setPollResults(response.data);
  }, []);

  const fetchUniversity = useCallback(async () => {
    const response = await api.get<GetUniversityResponse>(
      `/university/v1/${pollData.organisationId}`,
    );
    setUniversity(response?.data?.data.university);
  }, []);

  useEffect(() => {
    fetchPollResults();
    fetchUniversity();
  }, []);

  const handleBackButtonClick = () => {
    navigate('/polls');
  };

  const pollStatusClasses = clsx(styles['poll-status'], styles[pollData.status]);
  const pollStatus = PollStatusNames[pollData?.status as keyof typeof PollStatus];

  const pollFor = pollData.facultyName ?? university?.shortName;

  const formattedPollOpenDate = dayjs(pollData.openedAt).format('MMMM D, о H:mm YYYY року');
  const formattedPollCloseDate = dayjs(pollData.closedAt).format('MMMM D, о H:mm YYYY року');

  const isHaveAnswers = pollData?.answersAmount >= 0;

  return (
    <div className={styles.container}>
      <IconButton onClick={handleBackButtonClick}>
        <ArrowLeft24Regular />
      </IconButton>
      <div className={styles['poll-container']}>
        <Card className={styles['info-container']}>
          <div className={styles['info-header']}>
            <div className={styles['poll-name']}>
              <p>{pollData.name}</p>
              {pollFor && <>Для {pollFor} </>}
            </div>
            <div className={pollStatusClasses}>{pollStatus}</div>
          </div>

          {pollData.openedAt && <span> {'Відкрито: ' + formattedPollOpenDate} </span>}
          {pollData.closedAt && <span> {'Закрито: ' + formattedPollCloseDate} </span>}
          {isHaveAnswers && <span>{'Кількість відповідей: ' + pollData.answersAmount} </span>}
        </Card>

        {pollResults?.questions.map((question) => (
          <PollResultsQuestion key={question.id} question={question} />
        ))}
      </div>
    </div>
  );
};
