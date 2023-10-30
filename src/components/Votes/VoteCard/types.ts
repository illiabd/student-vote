type Vote = {
  id: string;
  organisation: string;
  title: string;
  isPublished: boolean;
};

export type VoteCardProps = {
  data: Vote;
};

export type DeleteModalProps = {
  data: Vote;
  onClose: () => void;
};
