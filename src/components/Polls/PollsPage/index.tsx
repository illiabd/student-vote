import { Add24Regular, ArrowSort24Regular, ErrorCircle20Regular } from '@fluentui/react-icons';
import clsx from 'clsx';
import { FC, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';

import { AllowedFeatures } from '../../../constants';
import { useAppDispatch, useAppSelector, useWindowWidth } from '../../../hooks';
import { createPoll, findPolls, loadPolls } from '../../../store/polls/actions';
import { CreatePollRequest } from '../../../store/polls/types';
import { Button, Card, IconButton, MessageBox } from '../../UI';
import { PollCard } from '../PollCard';
import styles from './PollsPage.module.scss';

export const PollsPage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { pollsData, isNextPageLoading, isLoading } = useAppSelector((state) => state.polls);
  const { selectedOrganisationId } = useAppSelector((state) => state.current);
  const { organisationsData } = useAppSelector((state) => state.organisations);

  const width = useWindowWidth();

  useEffect(() => {
    const hasOrganisations = organisationsData && organisationsData?.docs?.length > 0;
    if (hasOrganisations && selectedOrganisationId) {
      dispatch(findPolls(selectedOrganisationId));
    }
  }, [dispatch, organisationsData, selectedOrganisationId]);

  const handleCreatePollButtonClick = async () => {
    if (!selectedOrganisationId) {
      return;
    }

    const newPollData: CreatePollRequest = {
      name: 'Нове голосування',
      questions: [
        {
          name: 'Питання 1',
          options: [
            {
              name: 'Відповідь 1',
            },
          ],
        },
      ],
      organisationId: selectedOrganisationId,
    };

    const response = await dispatch(createPoll(newPollData));
    if (!response) {
      return;
    }

    navigate(`/polls/${response.id}`);
  };

  const handleInfiniteScrollLoader = () => {
    if (!selectedOrganisationId) {
      return;
    }

    if (!isNextPageLoading) {
      dispatch(loadPolls(selectedOrganisationId));
    }
  };

  const selectedOrganisation = organisationsData?.docs?.find(
    (organisation) => organisation.id === selectedOrganisationId,
  );

  const isPollsAllowed = selectedOrganisation?.allowedFeatures?.find(
    (feature) => feature === AllowedFeatures.polls,
  );

  const pollsNotAllowedContent = <MessageBox>Голосування не дозволені</MessageBox>;

  const statusBadgeClasses = clsx(
    styles['status-badge'],
    selectedOrganisation?.isActive ? styles.active : styles.inactive,
  );

  const statusBadgeIcon = <ErrorCircle20Regular />;

  const statusBadge = (
    <div className={statusBadgeClasses}>
      <span>Діяльність організації тимчасово обмежена</span>
      <div className={styles.icon}>{statusBadgeIcon}</div>
    </div>
  );

  const content = (
    <>
      <Card className={styles['info-container']}>
        <div className={styles.info}>
          <p>Мої голосування</p>
          <div className={styles.stats}>
            {/* <span>{`Створених: ${createdPollsAmount} `}</span>
            <span>{`Активні: ${publishedPollsAmount}`}</span> */}
          </div>
        </div>
        {!selectedOrganisation?.isActive && (
          <div className={styles['badge-container']}>{statusBadge}</div>
        )}
        <div className={styles['buttons-container']}>
          <Button
            loading={isLoading}
            onClick={handleCreatePollButtonClick}
            endIcon={<Add24Regular />}
          >
            Нове голосування
          </Button>
          <div>
            <IconButton>
              <ArrowSort24Regular />
            </IconButton>
          </div>
        </div>
      </Card>
      {pollsData ? (
        <InfiniteScroll
          dataLength={pollsData?.docs?.length ?? 0}
          next={handleInfiniteScrollLoader}
          hasMore={pollsData.hasNextPage}
          loader={<>Loading...</>}
          scrollableTarget="scrollableDiv"
        >
          <div className={styles['polls-container']}>
            {pollsData.docs.map((data) => (
              <PollCard key={data.id} data={data} />
            ))}
          </div>
        </InfiniteScroll>
      ) : undefined}
    </>
  );

  return (
    <div className={styles.container} id={width >= 1025 ? 'scrollableDiv' : ''}>
      {isPollsAllowed ? content : pollsNotAllowedContent}
    </div>
  );
};
