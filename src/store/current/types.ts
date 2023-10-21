import { UserData } from '../auth/types';
import { Organisation } from '../organisations/types';

export type RequestParams = {
  offset?: number;
  limit?: number;
  page?: number;
  hasNextPage?: boolean;
  pagingCounter?: number;
  hasPrevPage?: number;
  prevPage?: number;
  nextPage?: number;
  totalDocs?: number;
  totalPages?: number;
};

export type Member = {
  user: UserData;
  role: string;
};

export type FindMembersResponse = {
  data: RequestParams & {
    docs: Member[];
  };
};

export type FindMembersParams = {
  offset?: number;
  limit?: number;
};

export type Group = {
  id: string;
  organisation: string;
  name: string;
  type: string;
  users: string[];
  course: number;
};

export type GroupsData = RequestParams & {
  docs: Group[];
};

export type FindGroupFilters = {
  name?: string;
  type?: string;
  course?: number;
  organisation?: string;
};

export enum GroupsFields {
  id = 'id',
  name = 'name',
  type = 'type',
  users = 'users',
  organisation = 'organisation',
}

export type FindGroupRequestBody = RequestParams & {
  filters?: FindGroupFilters;
  fields: GroupsFields[];
};

export type FindGroupsResponse = {
  data: GroupsData;
};

export type CreateOrganisationRequest = {
  name: string;
  shortName?: string;
  link: string;
  douLink: string;
  owner: string;
  type: string;
};

export type PatchUserRequest = {
  firstName?: string;
  lastName?: string;
  patronymic?: string;
  socialMediaLinks?: string[];
};

export type UploadProfilePictureRequest = {
  file: File;
};

export type UploadProfilePictureResponse = {
  data: {
    id: string;
    url: string;
  };
};

export type PatchOrganisationRequest = Organisation;

export type StudentsData = RequestParams & {
  docs: Member[];
};

export type State = {
  staff: Member[];
  groupsData: GroupsData;
  studentsData: StudentsData;
  selectedOrganisationId: string;
  isLoading: boolean;
  isNextPageLoading: boolean;
};
