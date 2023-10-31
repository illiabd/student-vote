/* eslint-disable react/no-danger */
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector, useOrganisations, useUser } from '../../../hooks';
import { findVacancies, patchVacancy } from '../../../store/vacancies/actions';
import { Vacancy } from '../../../store/vacancies/types';
import { Button, MessageBox } from '../../UI';
import { VacancyForm } from '../VacancyForm';
import { VacancyFormValues } from '../VacancyForm/types';
import styles from './VacancyEdit.module.scss';

const Vacancy = () => {
  const selectedOrganisationId = useAppSelector((state) => state.current.selectedOrganisationId);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const { user, isUserLoading } = useUser();
  const { organisationsData, isOrganisationsLoading } = useOrganisations(!!user);

  const vacanciesData = useAppSelector((state) => state.vacancies.vacanciesData);
  const vacancyData = vacanciesData?.docs.find((vacancy) => vacancy.id === params.vacancyId);

  const isLoading = isUserLoading || isOrganisationsLoading;

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
    navigate('/');
    return response;
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

  return (
    <div className={styles.container}>
      <VacancyForm onSubmit={handleFormSubmission} defaultValues={vacancyData} />
    </div>
  );
};

export default Vacancy;
