export type VoteCardProps = {
  data: { name: string; id: string; status: string };
};

export type DeleteModalProps = {
  data: { name: string; id: string; status: string };
  onClose: () => void;
};
