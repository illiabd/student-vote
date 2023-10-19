import { Group, Member } from '../../../store/current/types';

export type GroupsTabProps = {
  selectedOrganisationId: string;
  hasOrganisations: boolean;
};

export type GroupCardProps = {
  groupData: Group;
  studentsData: Member[];
  organisationId: string;
};

type ModalProps = {
  onClose: () => void;
};

export type DeleteGroupModalProps = ModalProps & {
  organisationId: string;
  group: Group;
};

export type DeleteSelectedModalProps = ModalProps & {
  groupId: string;
  organisationId: string;
  selected: readonly string[];
};

export type AddUserModalProps = ModalProps & {
  organisationId: string;
  groupId: string;
};

export type CreateGroupModalProps = ModalProps & {
  organisationId: string;
};

export type CreateGroupFormValues = {
  name: string;
};
