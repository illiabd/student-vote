/* eslint-disable react/button-has-type */
import { FC } from 'react';

import clsx from 'clsx';

import { IconButtonProps } from './types';
import styles from './IconButton.module.scss';

export const IconButton: FC<IconButtonProps> = ({
  type = 'button',
  className,
  children,
  disabled,
  onClick,
}) => {
  const iconButtonClasses = clsx(styles.button, className, disabled && styles.disabled);

  return (
    <button className={iconButtonClasses} type={type} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
