export type Vacancy = {
  id: string;
  organisation: string;
  title: string;
  text: string;
  description: string;
  vacancyType: string;
  remoteType: string;
  minSalary: number;
  maxSalary: number;
  isPublished: boolean;
  specialization: string;
  tags: string[];
  city: string;
};

export type VacanciesData = {
  docs: Vacancy[];
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
export type FindParams = {
  organisation?: string;
  title?: string;
  tags?: string[];
  specialization?: string;
  fields?: string[];
  offset?: number;
  limit?: number;
  page?: number;
};

export type FindVacanciesResponse = {
  data: VacanciesData;
};

export type CreateVacancyRequest = Vacancy & {
  organisation: string;
};

export type State = {
  vacanciesData: VacanciesData | undefined;
  isLoading: boolean;
};

export type EditVacancyRequest = {
  id: string;
  title: string;
  description: string;
  remoteType: string;
  city: string;
  minSalary: number;
  maxSalary: number;
  textLength?: number | undefined;
};
