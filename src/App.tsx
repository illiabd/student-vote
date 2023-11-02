import './components/UI/SeparatedInput/reactCodeInput.scss';
import './components/UI/Snackbar/snackbarStyles.scss';
import './styles/global.scss';
import './styles/reset.scss';

import { FC } from 'react';
import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import styles from './App.module.scss';
import { SideBar } from './components';
import { AuthPage } from './components/Auth';
import { CreateProfilePage } from './components/Auth/CreateProfilePage';
import { HomePage, WelcomePage } from './components/Home';
import { NewsPage } from './components/News';
import { SchedulePage } from './components/Schedule';
import { Button, MessageBox } from './components/UI';
import { VacanciesPage, VacancyCreatePage, VacancyPage } from './components/Vacancies';
import { VacancyEditPage } from './components/Vacancies/VacancyEditPage';
import { SELECTED_ORGANISATION_ID } from './constants';
import { useAppDispatch, useAppSelector, useOrganisations, useUser } from './hooks';
import { currentActions } from './store/current/slice';

const Home: FC = () => {
  const { selectedOrganisationId } = useAppSelector((state) => state.current);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user, isUserLoading } = useUser();
  const { organisationsData, isOrganisationsLoading } = useOrganisations(!!user);

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

  const hasOrganisations = organisationsData && organisationsData.docs.length > 0;
  if (!hasOrganisations && user) {
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
    <div className={styles.container}>
      <SideBar
        selectedOrganisationId={selectedOrganisationId}
        organisations={organisationsData?.docs ?? []}
        onTabSelect={handleTabNavigation}
        onChange={handleDropdownChange}
      />
      <div className={styles.main}>
        <Routes>
          <Route path="*" index Component={HomePage} />
          <Route path="/news" Component={NewsPage} />
          <Route path="/vacancies" Component={VacanciesPage} />
          <Route path="/vacancies/*" Component={VacanciesPage} />
          <Route path="/timetable" Component={SchedulePage} />
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
      <Route path="/vacancies/:vacancyId" Component={VacancyPage} />
      <Route path="/vacancies/create" Component={VacancyCreatePage} />
      <Route path="/vacancies/edit/:vacancyId" Component={VacancyEditPage} />
      <Route path="*" Component={Home} />
    </Routes>
  );
};

export default App;
