import { ReactNode } from 'react';

import { ButtonProps } from '../Button/types';

export type IconButtonProps = ButtonProps & {
  children?: ReactNode;
  iconFill?: string | undefined;
  disabled?: boolean;
};
