import { Add24Regular, ArrowSort24Regular, ErrorCircle20Regular } from '@fluentui/react-icons';
import clsx from 'clsx';
import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { AllowedFeatures } from '../../../constants';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { findVacancies } from '../../../store/vacancies/actions';
import { Button, Card, IconButton, MessageBox } from '../../UI';
import { VacancyCard } from '../VacancyCard';
import styles from './VacanciesPage.module.scss';

export const VacanciesPage: FC = () => {
  const { organisationsData, isLoading: isOrganisationsLoading } = useAppSelector(
    (state) => state.organisations,
  );
  const { vacanciesData, isLoading: isVacanciesLoading } = useAppSelector(
    (state) => state.vacancies,
  );

  const selectedOrganisationId = useAppSelector((state) => state.current.selectedOrganisationId);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const hasOrganisations = organisationsData && organisationsData?.docs?.length > 0;
    if (hasOrganisations && selectedOrganisationId) {
      dispatch(findVacancies({ organisation: selectedOrganisationId }));
    }
  }, [dispatch, organisationsData, selectedOrganisationId]);

  const handleCreateVacancyButtonClick = () => {
    navigate('/vacancies/create');
  };

  const selectedOrganisation = organisationsData?.docs?.find(
    (organisation) => organisation.id === selectedOrganisationId,
  );

  const isVacanciesAllowed = selectedOrganisation?.allowedFeatures.find(
    (feature) => feature === AllowedFeatures.vacancies,
  );

  const vacanciesNotAllowedContent = (
    <MessageBox>Вакансії не дозволені поточній організації</MessageBox>
  );

  const isLoading = isOrganisationsLoading || isVacanciesLoading;
  const data = vacanciesData?.docs;
  const hasVacancies = data?.length > 0;

  const publishedVacanciesAmount = data?.filter((vacancy) => vacancy.isPublished)?.length ?? 0;
  const createdVacanciesAmount = data?.length ?? 0;

  const vacancies = hasVacancies
    ? data?.map((vacancy) => <VacancyCard key={vacancy.id} data={vacancy} />)
    : undefined;

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
          <p>Мої вакансії</p>
          <div className={styles.stats}>
            <span>{`Створених: ${createdVacanciesAmount} `}</span>
            <span>{`Активні: ${publishedVacanciesAmount}`}</span>
          </div>
        </div>
        {!selectedOrganisation?.isActive && (
          <div className={styles['badge-container']}>{statusBadge}</div>
        )}
        <div className={styles['buttons-container']}>
          <Button onClick={handleCreateVacancyButtonClick} endIcon={<Add24Regular />}>
            Нова вакансія
          </Button>
          <div>
            <IconButton>
              <ArrowSort24Regular />
            </IconButton>
          </div>
        </div>
      </Card>
      {!isLoading ? vacancies : <MessageBox>Loading..</MessageBox>}
    </>
  );

  return (
    <div className={styles.container}>
      {isVacanciesAllowed ? content : vacanciesNotAllowedContent}
    </div>
  );
};
