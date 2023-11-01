import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, MessageBox } from '../../../components/UI';
import { VacancyForm } from '../../../components/Vacancies/VacancyForm';
import { useAppDispatch, useAppSelector, useOrganisations, useUser } from '../../../hooks';
import { createVacancy, findVacancies } from '../../../store/vacancies/actions';
import { VacancyFormValues } from '../VacancyForm/types';

export const VacancyCreatePage: FC = () => {
  const selectedOrganisationId = useAppSelector((state) => state.current.selectedOrganisationId);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user, isUserLoading } = useUser();
  const { organisationsData, isOrganisationsLoading } = useOrganisations(!!user);

  const isLoading = isUserLoading || isOrganisationsLoading;

  useEffect(() => {
    if (selectedOrganisationId) {
      dispatch(findVacancies({ organisation: selectedOrganisationId }));
    }
  }, [dispatch, organisationsData, selectedOrganisationId]);

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

  const handleFormSubmission = async (values: VacancyFormValues) => {
    if (!selectedOrganisationId) {
      return false;
    }

    const vacancy = {
      organisation: selectedOrganisationId,
      ...values,
    };
    const response = await dispatch(createVacancy(vacancy));
    navigate('/vacancies');
    return response;
  };

  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <VacancyForm onSubmit={handleFormSubmission} />
    </div>
  );
};
