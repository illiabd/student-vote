import { Organisation } from '../../../store/organisations/types';

export type OrganisationCardProps = {
  organisationData: Organisation;
};

export type EditModalProps = {
  organisationData: Organisation;
  onClose: () => void;
};

export type CompanyFormValues = {
  name: string;
  link: string;
  email: string;
  douLink: string;
};
