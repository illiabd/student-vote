import { LottieRefCurrentProps } from 'lottie-react';
import { FC, useRef, useState } from 'react';

import { UserTypes } from '../../../constants';
import { useAppSelector } from '../../../hooks';
import { Button, LoadingAnimation, MessageBox } from '../../UI';
import { CreateProfileForm } from '../CreateProfileForm';

export const CreateProfilePage: FC = () => {
  const [isLottiePlaying, setIsLottiePlaying] = useState(false);
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  const { userData, isLoading: isUserLoading } = useAppSelector((state) => state.auth);
  const { organisationsData, isLoading: isOrganisationsLoading } = useAppSelector(
    (state) => state.organisations,
  );

  const handleLoadingAnimationStart = () => {
    setIsLottiePlaying(true);
    lottieRef.current?.setSpeed(3);
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

  const hasOrganisations = organisationsData && organisationsData?.docs?.length > 0;
  const isSuperadmin = userData?.type === UserTypes.superadmin;

  if (!userData && !isLoading) {
    return (
      <MessageBox>
        <p>Ви не авторизовані</p>
        <Button href="/auth">Увійти до акаунту</Button>
      </MessageBox>
    );
  }

  if (!isSuperadmin && hasOrganisations && !isLoading) {
    return (
      <MessageBox>
        <span style={{ marginBottom: '12px' }}>Ви вже зареєстрували компанію</span>
        <Button href="/">На головну</Button>
      </MessageBox>
    );
  }

  return <CreateProfileForm />;
};
