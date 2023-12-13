import { TextFieldVariants } from '@mui/material';
import React, { HTMLProps, ReactNode } from 'react';

export type InputProps = HTMLProps<HTMLInputElement> & {
  startIcon?: ReactNode;
  className?: string;
  endIcon?: ReactNode;
  touched?: boolean;
  rounded?: boolean;
  errors?: string | string[];
  value?: string;
  variant?: TextFieldVariants;
  fullWidth?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
