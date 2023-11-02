/* eslint-disable react/no-danger */
import { LottieRefCurrentProps } from 'lottie-react';
import { FC, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { findVacancies, patchVacancy } from '../../../store/vacancies/actions';
import { Button, LoadingAnimation, MessageBox } from '../../UI';
import { VacancyForm } from '../VacancyForm';
import { VacancyFormValues } from '../VacancyForm/types';
import styles from './VacancyEdit.module.scss';

export const VacancyEditPage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const [isLottiePlaying, setIsLottiePlaying] = useState(false);
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  const { selectedOrganisationId } = useAppSelector((state) => state.current);
  const { organisationsData, isLoading: isOrganisationsLoading } = useAppSelector(
    (state) => state.organisations,
  );
  const { vacanciesData } = useAppSelector((state) => state.vacancies);
  const { userData, isLoading: isUserLoading } = useAppSelector((state) => state.auth);

  const vacancyData = vacanciesData?.docs.find((vacancy) => vacancy.id === params.vacancyId);

  useEffect(() => {
    if (selectedOrganisationId) {
      dispatch(findVacancies({ organisation: selectedOrganisationId }));
    }
  }, [dispatch, organisationsData, selectedOrganisationId]);

  const handleFormSubmission = async (values: VacancyFormValues) => {
    if (!vacancyData) {
      return false;
    }

    const vacancy = {
      id: vacancyData.id,
      ...values,
    };

    const response = await dispatch(patchVacancy(vacancy));
    navigate('/vacancies');
    return response;
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
        <a href="/">На головну</a>
      </MessageBox>
    );
  }

  return (
    <div className={styles.container}>
      <VacancyForm onSubmit={handleFormSubmission} defaultValues={vacancyData} />
    </div>
  );
};
