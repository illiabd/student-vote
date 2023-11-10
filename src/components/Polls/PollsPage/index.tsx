import { Add24Regular, ArrowSort24Regular, ErrorCircle20Regular } from '@fluentui/react-icons';
import clsx from 'clsx';
import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { AllowedFeatures } from '../../../constants';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { findPolls } from '../../../store/polls/actions';
import { Button, Card, IconButton, MessageBox } from '../../UI';
import { PollCard } from '../PollCard';
import styles from './PollsPage.module.scss';

export const PollsPage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { selectedOrganisationId } = useAppSelector((state) => state.current);
  const { organisationsData } = useAppSelector((state) => state.organisations);
  const { pollsData } = useAppSelector((state) => state.polls);

  useEffect(() => {
    const hasOrganisations = organisationsData && organisationsData?.docs?.length > 0;
    if (hasOrganisations && selectedOrganisationId) {
      dispatch(findPolls(selectedOrganisationId));
    }
  }, [dispatch, organisationsData, selectedOrganisationId]);

  const handleCreatePollButtonClick = () => {
    navigate('/polls/create');
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
          <Button onClick={handleCreatePollButtonClick} endIcon={<Add24Regular />}>
            Нове голосування
          </Button>
          <div>
            <IconButton>
              <ArrowSort24Regular />
            </IconButton>
          </div>
        </div>
      </Card>
      {pollsData ? pollsData.docs.map((data) => <PollCard key={data.id} data={data} />) : undefined}
    </>
  );

  return (
    <div className={styles.container}>{isPollsAllowed ? content : pollsNotAllowedContent}</div>
  );
};
