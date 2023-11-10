import { Member } from '../../../store/current/types';

export type StaffTabProps = {
  selectedOrganisationId: string;
  hasOrganisations: boolean;
};

export type StaffCardProps = {
  member: Member;
  isCurrentUser: boolean;
  organisationId: string;
};

export type EditModalProps = {
  organisationId: string;
  currentRole: string;
  userId: string;
  onClose: () => void;
};

export type DeleteModalProps = {
  userId: string;
  organisationId: string;
  onClose: () => void;
};

export type AddMemberModalProps = {
  organisationId: string;
  onClose: () => void;
};

export type AddMemberFormValues = {
  phoneNumber: string;
};
