import { Member } from '../../../store/current/types';

export type StudentTabProps = {
  selectedOrganisationId: string;
  hasOrganisations: boolean;
};

export type StudentCardProps = {
  member: Member;
  organisationId: string;
};

export type AddStudentModalProps = {
  organisationId: string;
  onClose: () => void;
};

export type AddStudentFormValues = {
  phoneNumber: string;
};

export type DeleteModalProps = {
  organisationId: string;
  users: readonly string[];
  onClose: () => void;
};
