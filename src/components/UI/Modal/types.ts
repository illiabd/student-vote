import { ReactNode } from 'react';

export type ModalProps = {
  isShown: boolean;
  title?: string;
  children?: ReactNode;
  onClose?: () => void;
};
