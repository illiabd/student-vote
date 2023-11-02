import { LottieRefCurrentProps } from 'lottie-react';
import { FC, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, LoadingAnimation, MessageBox } from '../../../components/UI';
import { VacancyForm } from '../../../components/Vacancies/VacancyForm';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { createVacancy, findVacancies } from '../../../store/vacancies/actions';
import { VacancyFormValues } from '../VacancyForm/types';

export const VacancyCreatePage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isLottiePlaying, setIsLottiePlaying] = useState(false);
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  const { selectedOrganisationId } = useAppSelector((state) => state.current);
  const { userData, isLoading: isUserLoading } = useAppSelector((state) => state.auth);
  const { organisationsData, isLoading: isOrganisationsLoading } = useAppSelector(
    (state) => state.organisations,
  );

  useEffect(() => {
    if (selectedOrganisationId) {
      dispatch(findVacancies({ organisation: selectedOrganisationId }));
    }
  }, [dispatch, organisationsData, selectedOrganisationId]);

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
