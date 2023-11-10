import React, { ReactNode } from 'react';

type ButtonType = JSX.IntrinsicElements['button']['type'];

export type ButtonProps = {
  className?: string;
  startIcon?: ReactNode;
  disabled?: boolean;
  children?: ReactNode;
  endIcon?: ReactNode;
  rounded?: boolean;
  loading?: boolean;
  variant?: 'text' | 'contained' | 'outlined' | 'underlined';
  size?: 'sm' | 'md' | 'lg';
  type?: ButtonType;
  href?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};
