export type PollOptions = {
  id: string;
  name: string;
  amount: number;
};

export type PollQuestion = {
  id: string;
  name: string;
  options: PollOptions[];
};

export enum PollStatus {
  created = 'created',
  open = 'open',
  closed = 'closed',
}

export type Poll = {
  id: string;
  name: string;
  facultyName: string;
  answersAmount: number;
  userIds: string[];
  status: PollStatus;
  closedAt: string;
  openedAt: string;
  organisationId: string;
  questions: PollQuestion[];
};

export type NewOption = {
  name: string;
};

export type NewQuestion = {
  name: string;
  options: NewOption[];
};

export type NewPoll = {
  name: string;
  organisationId: string;
  questions: NewQuestion[];
};

export type CreatePollRequest = {
  name: string;
  questions: NewQuestion[];
  organisationId: string;
};

export type CreatePollResponse = Poll;

export type PollData = {
  docs: Poll[];
  totalDocs: number;
  offset: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number;
  nextPage: number;
};

export type State = {
  pollsData: PollData | undefined;
  isLoading: boolean;
  isNextPageLoading: boolean;
};
