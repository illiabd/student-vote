import { useNavigate, Routes, Route } from 'react-router-dom';
import { FC } from 'react';

import { useEffect } from 'react';

import { useAppDispatch, useAppSelector, useOrganisations, useUser } from './hooks';
import { SELECTED_ORGANISATION_ID } from './constants';
import { Button, MessageBox } from './components/UI';
import { WelcomePage, HomePage } from './components/Home';
import { currentActions } from './store/current/slice';
import { VacanciesPage } from './components/Vacancies';
import { NewsPage } from './components/News';

import styles from './App.module.scss';
import { SchedulePage } from './components/Schedule';
// import { VotesPage } from './components/Votes';
import { SideBar } from './components';
import { AuthPage } from './components/Auth';

const Home: FC = () => {
  const { user, isUserLoading } = useUser();
  const { organisationsData, isOrganisationsLoading } = useOrganisations(!!user);

  const selectedOrganisationId = useAppSelector((state) => state.current.selectedOrganisationId);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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

  const handleDropdownChange = (option: string) => {
    dispatch(currentActions.setSelectedOrganisationId(option));
    localStorage.setItem(SELECTED_ORGANISATION_ID, option);
  };

  const handleTabNavigation = (path: string) => {
    navigate(path);
  };

  const isLoading = isOrganisationsLoading || isUserLoading;

  if (isLoading) {
    return (
      <MessageBox>
        <p>Loading</p>
      </MessageBox>
    );
  }

  if (!user && !isLoading) {
    return <WelcomePage />;
  }

  const hasOrganisations = organisationsData?.docs?.length > 0;
  if (!hasOrganisations) {
    const handleButtonClick = () => {
      navigate('/create-profile');
    };
    return (
      <MessageBox>
        <span style={{ marginBottom: '12px' }}>
          Вітаємо в Univera, для продовження завершіть процес реєстрації компанії
        </span>
        <Button onClick={handleButtonClick}>Продовжити</Button>
      </MessageBox>
    );
  }

  return (
    <>
      <div className={styles.container}>
        <SideBar
          selectedOrganisationId={selectedOrganisationId}
          organisations={organisationsData.docs}
          onTabSelect={handleTabNavigation}
          onChange={handleDropdownChange}
        />
        <div className={styles.main}>
          <Routes>
            <Route path="/" index Component={HomePage} />
            <Route path="/*" index Component={HomePage} />
            <Route path="/news" Component={NewsPage} />
            <Route path="/vacancies" Component={VacanciesPage} />
            <Route path="/vacancies/*" Component={VacanciesPage} />
            <Route path="/timetable" Component={SchedulePage} />
          </Routes>
        </div>
      </div>
    </>
  );
};

const App: FC = () => {
  return (
    <Routes>
      <Route path="/auth" Component={AuthPage} />
      <Route path="/" Component={Home} />
      <Route path="*" Component={Home} />
    </Routes>
  );
};

export default App;
