/* eslint-disable operator-linebreak */
import { FC } from 'react';

import { OrganisationType } from '../../../constants';
import { OrganisationCard } from '../OrganisationCard';
import { useAppSelector } from '../../../hooks';
import { StudentsTab } from '../StudentsTab';
import { StaffTab } from '../StaffTab';
import { GroupTab } from '../GroupsTab';
import { Tabs } from '../../UI';

import styles from './HomePage.module.scss';

export const HomePage: FC = () => {
  const { organisationsData, isLoading: isOrganisationsLoading } = useAppSelector(
    (state) => state.organisations,
  );

  const selectedOrganisationId = useAppSelector((state) => state.current.selectedOrganisationId);
  const selectedOrganisation = organisationsData.docs.find(
    (organisation) => organisation.id === selectedOrganisationId,
  );

  const hasOrganisations = organisationsData?.docs?.length > 0;

  const tabsData = [
    {
      title: 'Співробітники',
      content: (
        <StaffTab
          selectedOrganisationId={selectedOrganisationId}
          hasOrganisations={!!hasOrganisations}
        />
      ),
    },
    {
      title: 'Студенти',
      content: (
        <StudentsTab
          selectedOrganisationId={selectedOrganisationId}
          hasOrganisations={!!hasOrganisations}
        />
      ),
    },
    {
      title: 'Групи',
      content: (
        <GroupTab
          selectedOrganisationId={selectedOrganisationId}
          hasOrganisations={!!hasOrganisations}
        />
      ),
    },
  ];

  const isCompany = selectedOrganisation?.type === OrganisationType.company;
  const selectedOrganisationData = organisationsData?.docs?.find(
    (organisation) => organisation.id === selectedOrganisationId,
  );

  return (
    <div id="scrollableDiv" className={styles['content-container']}>
      <OrganisationCard organisationData={selectedOrganisationData} />
      <Tabs data={isCompany ? [tabsData[0]] : tabsData} />
    </div>
  );
};
