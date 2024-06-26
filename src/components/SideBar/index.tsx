import {
  Add24Regular,
  Briefcase24Regular,
  ChevronDown20Filled,
  ChevronRight20Filled,
  Home24Regular,
  News24Regular,
  Timeline24Regular,
  Vote24Regular,
} from '@fluentui/react-icons';
import { FC } from 'react';
import Dropdown, { Option } from 'react-dropdown';
import { Link, useNavigate } from 'react-router-dom';

import { AllowedFeatures, AllowedFeaturesLinks, UserTypes } from '../../constants';
import { useAppDispatch, useAppSelector, useWindowWidth } from '../../hooks';
import { logout } from '../../store/auth/actions';
import { Button, ProfilePicture } from '../UI';
import styles from './SideBar.module.scss';
import { SideBarProps } from './types';

export const SideBar: FC<SideBarProps> = ({
  organisations,
  selectedOrganisationId,
  onTabSelect,
  onChange,
}) => {
  const { userData } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const windowWidth = useWindowWidth();

  const selectedOrganisation =
    organisations.find((value) => value.id === selectedOrganisationId) ?? organisations[0];

  const handleDropdownChange = (option: Option) => {
    onChange(option?.value);
  };

  const handleLogoutButtonClick = async () => {
    await dispatch(logout());
    navigate('/');
  };

  const options = organisations.reduce<Option[]>((result, organisation) => {
    if (!organisation) {
      return result;
    }

    const content = <div className={styles.option}>{organisation?.name}</div>;
    result.push({ label: content, value: organisation.id ?? '' });
    return result;
  }, []);

  const arrowOpen = (
    <div className={styles.arrow}>
      <ChevronDown20Filled />
    </div>
  );

  const arrowClosed = (
    <div className={styles.arrow}>
      <ChevronRight20Filled />
    </div>
  );

  const organisationInfo =
    organisations?.length > 1 ? (
      <Dropdown
        value={selectedOrganisationId}
        options={options}
        onChange={handleDropdownChange}
        placeholder="Оберіть організацію"
        arrowOpen={arrowOpen}
        arrowClosed={arrowClosed}
        className={styles.dropdown}
        menuClassName={styles.menu}
        controlClassName={styles.control}
        placeholderClassName={styles['place-holder']}
      />
    ) : (
      <Link to="/" style={{ all: 'unset' }}>
        <div className={styles.option}>{organisations[0]?.name}</div>
      </Link>
    );

  const links = selectedOrganisation.allowedFeatures?.map((feature) => {
    if (!AllowedFeaturesLinks[feature as keyof typeof AllowedFeatures]) {
      return undefined;
    }

    const iconsMap = new Map([
      [AllowedFeatures.news, News24Regular],
      [AllowedFeatures.vacancies, Briefcase24Regular],
      [AllowedFeatures.timetable, Timeline24Regular],
      [AllowedFeatures.polls, Vote24Regular],
    ]);

    const Icon = iconsMap.get(AllowedFeatures[feature as keyof typeof AllowedFeatures]);
    const handleButtonClick = () => {
      onTabSelect(`/${feature}`);
    };

    return (
      <Button
        key={feature}
        variant="text"
        size="md"
        startIcon={Icon && <Icon />}
        onClick={handleButtonClick}
      >
        {AllowedFeaturesLinks[feature as keyof typeof AllowedFeatures]}
      </Button>
    );
  });

  const isSuperadmin = userData?.type === UserTypes.superadmin;

  const handleCreateOrganisationButton = () => {
    navigate('/create-profile');
  };

  const handleHomeButtonClick = () => {
    onTabSelect('/');
  };

  const createNewOrganisationButton = (
    <Button
      variant="text"
      size="md"
      startIcon={<Add24Regular />}
      onClick={handleCreateOrganisationButton}
    >
      Нова організація
    </Button>
  );

  return (
    <div className={styles.sidebar}>
      {windowWidth > 1025 ? (
        <ProfilePicture
          source={selectedOrganisation?.profilePictureLink}
          alternative={selectedOrganisation?.name ?? ''}
          width={120}
          height={120}
        />
      ) : undefined}
      {organisationInfo}

      <div className={styles['navigation-container']}>
        <div className={styles.navigation}>
          <Button
            variant="text"
            size="md"
            startIcon={<Home24Regular />}
            onClick={handleHomeButtonClick}
          >
            Додому
          </Button>
          {links?.sort()}
          {isSuperadmin && createNewOrganisationButton}
        </div>

        <Button size="sm" onClick={handleLogoutButtonClick}>
          Вийти
        </Button>
      </div>
    </div>
  );
};
