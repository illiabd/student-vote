import {
  ArrowLeft24Filled,
  Building24Regular,
  Edit24Regular,
  Location24Regular,
  Share24Regular,
} from '@fluentui/react-icons';
import { LottieRefCurrentProps } from 'lottie-react';
import { FC, useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { Button, Card, LoadingAnimation, MessageBox } from '../../../components/UI';
import { RemoteTypes } from '../../../constants';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { findVacancies } from '../../../store/vacancies/actions';
import { TextEditor } from '../../UI/TextEditor';
import styles from './Vacancy.module.scss';

export const VacancyPage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const [isLottiePlaying, setIsLottiePlaying] = useState(false);
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  const { selectedOrganisationId } = useAppSelector((state) => state.current);
  const { vacanciesData } = useAppSelector((state) => state.vacancies);
  const { userData, isLoading: isUserLoading } = useAppSelector((state) => state.auth);
  const { organisationsData, isLoading: isOrganisationsLoading } = useAppSelector(
    (state) => state.organisations,
  );

  const vacancyData = vacanciesData?.docs.find((vacancy) => vacancy.id === params.vacancyId);

  const selectedOrganisation = organisationsData?.docs?.find(
    (organisation) => organisation.id === selectedOrganisationId,
  );

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

  const handleLoadingAnimationStart = () => {
    setIsLottiePlaying(true);
  };

  const handleLoadingAnimationEnd = () => {
    setIsLottiePlaying(false);
  };

  const isLoading = isUserLoading || isOrganisationsLoading;

  if (isLoading || isLottiePlaying) {
    return (
      <LoadingAnimation
        lottieRef={lottieRef}
        onAnimationStart={handleLoadingAnimationStart}
        onAnimationEnd={handleLoadingAnimationEnd}
      />
    );
  }

  if (!userData && !isLoading) {
    return (
      <MessageBox>
        <p>Ви не авторизовані</p>
        <Button href="/auth">Увійти до акаунту</Button>
      </MessageBox>
    );
  }

  const hasOrganisations = organisationsData && organisationsData?.docs?.length > 0;
  if (!hasOrganisations && !isLoading) {
    return (
      <MessageBox>
        <p>У вас немає прав на жодну з організацій</p>
        <Button href="/">Завершіть процес реєстрації</Button>
      </MessageBox>
    );
  }

  const isVacanciesAllowed = organisationsData?.docs[0]?.allowedFeatures?.includes('vacancies');
  if (!isVacanciesAllowed && !isLoading) {
    return (
      <MessageBox>
        <span>Вакансії не дозволені для вашої організації, чат-бот підтримки -</span>
        <Button href="https://t.me/univera_bot">@univera_bot</Button>
      </MessageBox>
    );
  }

  const hasVacancies = vacanciesData && vacanciesData?.docs?.length > 0;
  if (!hasVacancies && !isLoading) {
    return (
      <MessageBox>
        <p>Вакансію не знайдено</p>
        <Link to="/">На головну</Link>
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
