import { ReactNode } from 'react';

export type CardProps = {
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
};
