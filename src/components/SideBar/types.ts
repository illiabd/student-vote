import { Organisation } from '../../store/organisations/types';

export type SideBarProps = {
  organisations: Organisation[];
  selectedOrganisationId?: string;
  onChange: (option: string) => void;
  onTabSelect: (tab: string) => void;
};
