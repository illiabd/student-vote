import { LottieRefCurrentProps } from 'lottie-react';
import { FC, useRef, useState } from 'react';
import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import styles from './App.module.scss';
import { SideBar } from './components';
import { AuthPage } from './components/Auth';
import { CreateProfilePage } from './components/Auth/CreateProfilePage';
import { HomePage } from './components/Home';
import { PollsPage } from './components/Polls/';
import { PollPage } from './components/Polls/PollPage';
import { Button, LoadingAnimation, MessageBox } from './components/UI';
import { SELECTED_ORGANISATION_ID } from './constants';
import { useAppDispatch, useAppSelector, useOrganisations, useUser, useWindowWidth } from './hooks';
import { currentActions } from './store/current/slice';

const Home: FC = () => {
  const { user, isUserLoading } = useUser();
  const { organisationsData, isOrganisationsLoading } = useOrganisations(!!user);
  const { selectedOrganisationId } = useAppSelector((state) => state.current);

  const [isLottiePlaying, setIsLottiePlaying] = useState(true);
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const width = useWindowWidth();

  const handleDropdownChange = (option: string) => {
    dispatch(currentActions.setSelectedOrganisationId(option));
    localStorage.setItem(SELECTED_ORGANISATION_ID, option);
  };

  const handleTabNavigation = (path: string) => {
    navigate(path);
  };

  const handleLoadingAnimationStart = () => {
    setIsLottiePlaying(true);
  };

  const handleLoadingAnimationEnd = () => {
    setIsLottiePlaying(false);
  };

  const isLoading = isOrganisationsLoading || isUserLoading;

  if (isLoading || isLottiePlaying) {
    return (
      <LoadingAnimation
        lottieRef={lottieRef}
        onAnimationStart={handleLoadingAnimationStart}
        onAnimationEnd={handleLoadingAnimationEnd}
      />
    );
  }

  const hasOrganisations = organisationsData && organisationsData.docs.length > 0;
  if (!hasOrganisations && user && !isLoading) {
    const handleButtonClick = () => {
      navigate('/create-profile');
    };
    return (
      <MessageBox>
        <span style={{ marginBottom: '12px' }}>
          Вітаємо в Student Vote, для продовження завершіть процес реєстрації компанії
        </span>
        <Button onClick={handleButtonClick}>Продовжити</Button>
      </MessageBox>
    );
  }

  return (
    <div className={styles.container} id={width < 1025 ? 'scrollableDiv' : ''}>
      <SideBar
        selectedOrganisationId={selectedOrganisationId}
        organisations={organisationsData?.docs ?? []}
        onTabSelect={handleTabNavigation}
        onChange={handleDropdownChange}
      />
      <div className={styles.main}>
        <Routes>
          <Route path="*" index Component={HomePage} />
          <Route path="/polls/*" Component={PollsPage} />
          <Route path="/polls/:pollId" Component={PollPage} />
        </Routes>
      </div>
    </div>
  );
};

const App: FC = () => {
  const dispatch = useAppDispatch();

  const { user } = useUser();
  const { organisationsData } = useOrganisations(!!user);

  useEffect(() => {
    const organisationId = localStorage.getItem(SELECTED_ORGANISATION_ID);
    if (!organisationId) {
      const newOrganisationId = organisationsData?.docs[0]?.id;

      if (!newOrganisationId) {
        return;
      }

      dispatch(currentActions.setSelectedOrganisationId(newOrganisationId));
      localStorage.setItem(SELECTED_ORGANISATION_ID, newOrganisationId);
      return;
    }
    dispatch(currentActions.setSelectedOrganisationId(organisationId));
  }, [dispatch, organisationsData]);

  return (
    <Routes>
      <Route path="/auth" Component={AuthPage} />
      <Route path="/create-profile" Component={CreateProfilePage} />
      <Route path="*" Component={Home} />
    </Routes>
  );
};

export default App;
