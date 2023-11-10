export type AddEventModalProps = {
  organisationId: string;
  onSubmit: () => void;
  onClose: () => void;
};

export type UploadFileModalProps = {
  weekDate: string;
  organisationId: string;
  onClose: () => void;
};
