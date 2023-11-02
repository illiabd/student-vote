/* eslint-disable react/no-danger */
import { FC, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { findVacancies, patchVacancy } from '../../../store/vacancies/actions';
import { Button, MessageBox } from '../../UI';
import { VacancyForm } from '../VacancyForm';
import { VacancyFormValues } from '../VacancyForm/types';
import styles from './VacancyEdit.module.scss';

export const VacancyEditPage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const { selectedOrganisationId } = useAppSelector((state) => state.current);
  const { organisationsData } = useAppSelector((state) => state.organisations);
  const { vacanciesData } = useAppSelector((state) => state.vacancies);
  const { userData } = useAppSelector((state) => state.auth);

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

  if (!userData) {
    return (
      <MessageBox>
        <p>Ви не авторизовані</p>
        <Button href="/auth">Увійти до акаунту</Button>
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

  return (
    <div className={styles.container}>
      <VacancyForm onSubmit={handleFormSubmission} defaultValues={vacancyData} />
    </div>
  );
};
