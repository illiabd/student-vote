import { ReactNode } from 'react';

export type CheckboxProps = {
  checked: boolean;
  className?: string;
  disabled?: boolean;
  checkedIcon?: ReactNode;
  id?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: boolean;
};
