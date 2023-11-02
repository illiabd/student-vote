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
  active = 'active',
  finished = 'finished',
}

export type Poll = {
  id: string;
  name: string;
  userIds: string[];
  status: PollStatus;
  organisationId: string;
  questions: PollQuestion[];
};

export type State = {
  pollsData: Poll[] | undefined;
  isLoading: boolean;
};
