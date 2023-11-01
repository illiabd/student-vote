/* eslint-disable react/no-danger */
import {
  ArrowLeft24Filled,
  Building24Regular,
  Edit24Regular,
  Location24Regular,
  Share24Regular,
} from '@fluentui/react-icons';
import { FC, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Button, Card, MessageBox } from '../../../components/UI';
import { RemoteTypes } from '../../../constants';
import { useAppDispatch, useAppSelector, useOrganisations, useUser } from '../../../hooks';
import { findVacancies } from '../../../store/vacancies/actions';
import { TextEditor } from '../../UI/TextEditor';
import styles from './Vacancy.module.scss';

export const VacancyPage: FC = () => {
  const selectedOrganisationId = useAppSelector((state) => state.current.selectedOrganisationId);

  const dispatch = useAppDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const { user, isUserLoading } = useUser();
  const { organisationsData, isOrganisationsLoading } = useOrganisations(!!user);
  const selectedOrganisation = organisationsData?.docs?.find(
    (organisation) => organisation.id === selectedOrganisationId,
  );

  const vacanciesData = useAppSelector((state) => state.vacancies.vacanciesData);
  const vacancyData = vacanciesData?.docs.find((vacancy) => vacancy.id === params.vacancyId);

  const isLoading = isUserLoading || isOrganisationsLoading;

  useEffect(() => {
    if (selectedOrganisationId) {
      dispatch(findVacancies({ organisation: selectedOrganisationId }));
    }
  }, [dispatch, organisationsData, selectedOrganisationId]);

  const handleBackButtonClick = () => {
    navigate('/vacancies');
  };

  const handleEditButtonClick = () => {
    navigate(`/vacancies/edit/:${vacancyData?.id}`);
  };

  if (isLoading) {
    return (
      <MessageBox>
        <p>Loading</p>
      </MessageBox>
    );
  }

  if (!user && !isLoading) {
    return (
      <MessageBox>
        Увійдіть для перегляду цієї сторінки
        <a href="/">На головну</a>
      </MessageBox>
    );
  }

  const hasOrganisations = organisationsData && organisationsData?.docs?.length > 0;
  if (!hasOrganisations) {
    return (
      <MessageBox>
        <p>У вас немає прав на жодну з організацій</p>
        <Button href="/">Завершіть процес реєстрації</Button>
      </MessageBox>
    );
  }

  const isVacanciesAllowed = organisationsData?.docs[0]?.allowedFeatures?.includes('vacancies');
  if (!isVacanciesAllowed) {
    return (
      <MessageBox>
        <span>Вакансії не дозволені для вашої організації, чат-бот підтримки -</span>
        <Button href="https://t.me/univera_bot">@univera_bot</Button>
      </MessageBox>
    );
  }

  const hasVacancies = vacanciesData && vacanciesData?.docs?.length > 0;
  if (!hasVacancies) {
    return (
      <MessageBox>
        <p>Вакансію не знайдено</p>
        <a href="/">На головну</a>
      </MessageBox>
    );
  }

  const companyImageHref = '/mock-organization-logo.png';
  const companyImageAlt = `${selectedOrganisation?.name}-logo`;

  const remoteType = RemoteTypes[vacancyData?.remoteType as keyof typeof RemoteTypes];

  const hasDouKLink = selectedOrganisation?.douLink?.length;
  const douLink = (
    <div className={styles.link}>
      Сторінка компанії на DOU
      <a href={`https://${selectedOrganisation?.douLink}`}>
        <Share24Regular />
      </a>
    </div>
  );

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <div>
          <Button variant="text" startIcon={<ArrowLeft24Filled />} onClick={handleBackButtonClick}>
            До усіх вакансій
          </Button>
        </div>
        <div className={styles.title}>
          <p>{vacancyData?.title}</p>
          <span className={styles.salary}>
            {` $${vacancyData?.minSalary}-$${vacancyData?.maxSalary}`}
          </span>
          {!vacancyData?.isPublished && <span className={styles.isActive}> (неактивна)</span>}
        </div>

        <div className={styles.header}>
          <div className={styles['company-info']}>
            <div className={styles['image-container']}>
              <img
                src={companyImageHref}
                alt={companyImageAlt}
                style={{ width: '50px', height: '50px' }}
              />
            </div>
            <span>{selectedOrganisation?.name}</span>
          </div>

          <Button variant="outlined" endIcon={<Edit24Regular />} onClick={handleEditButtonClick}>
            Редагувати
          </Button>
        </div>
        <div className={styles['additional-info']}>
          {vacancyData?.city && (
            <>
              <Location24Regular />
              <span>{`${vacancyData?.city}`}</span>
            </>
          )}
          {remoteType && (
            <>
              <Building24Regular />
              <span>{remoteType}</span>
            </>
          )}
        </div>
        <div className={styles.text}>
          <TextEditor editable={false} defaultContentHTML={vacancyData?.description} />
        </div>
        <div>{hasDouKLink && douLink}</div>
      </Card>
    </div>
  );
};
