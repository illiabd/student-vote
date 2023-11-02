import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, MessageBox } from '../../../components/UI';
import { VacancyForm } from '../../../components/Vacancies/VacancyForm';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { createVacancy, findVacancies } from '../../../store/vacancies/actions';
import { VacancyFormValues } from '../VacancyForm/types';

export const VacancyCreatePage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { organisationsData } = useAppSelector((state) => state.organisations);
  const { selectedOrganisationId } = useAppSelector((state) => state.current);
  const { userData } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (selectedOrganisationId) {
      dispatch(findVacancies({ organisation: selectedOrganisationId }));
    }
  }, [dispatch, organisationsData, selectedOrganisationId]);

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
