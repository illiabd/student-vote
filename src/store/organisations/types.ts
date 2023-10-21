export type Owner = {
  id: string;
  phoneNumber: string;
  isSuperadmin: boolean;
};
export type Organisation = {
  profilePictureLink?: string;
  allowedFeatures?: string[];
  isApproved?: boolean;
  shortName?: string;
  isActive?: boolean;
  douLink?: string;
  email?: string;
  owner?: Owner;
  name?: string;
  type?: string;
  link?: string;
  id?: string;
};

export type OrganisationsData = {
  docs: Organisation[];
  totalDocs: number;
  offset: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: boolean;
  nextPage: boolean;
};

export type FindOrganisationRequest = {
  filters: {
    name?: string;
    role?: string;
  };
  offset?: number;
  limit?: number;
};

export type FindOrganisationResponse = {
  data: OrganisationsData;
};

export type State = {
  organisationsData: OrganisationsData | undefined;
  isLoading: boolean;
  error: string[];
};
