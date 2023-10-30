import { FC } from 'react';

import { OrganisationType } from '../../../constants';
import { useAppSelector } from '../../../hooks';
import { MessageBox, Tabs } from '../../UI';
import { GroupTab } from '../GroupsTab';
import { OrganisationCard } from '../OrganisationCard';
import { StaffTab } from '../StaffTab';
import { StudentsTab } from '../StudentsTab';
import styles from './HomePage.module.scss';

export const HomePage: FC = () => {
  const { organisationsData } = useAppSelector((state) => state.organisations);

  const selectedOrganisationId = useAppSelector((state) => state.current.selectedOrganisationId);
  const selectedOrganisation =
    organisationsData &&
    organisationsData.docs.find((organisation) => organisation.id === selectedOrganisationId);

  const hasOrganisations = organisationsData && organisationsData.docs.length > 0;

  if (!selectedOrganisationId) {
    return (
      <MessageBox>
        <span>Оберіть організацію</span>
      </MessageBox>
    );
  }

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
  const selectedOrganisationData =
    organisationsData &&
    organisationsData.docs.find((organisation) => organisation.id === selectedOrganisationId);

  return (
    <div id="scrollableDiv" className={styles['content-container']}>
      {selectedOrganisationData && <OrganisationCard organisationData={selectedOrganisationData} />}{' '}
      <Tabs data={isCompany ? [tabsData[0]] : tabsData} />
    </div>
  );
};
