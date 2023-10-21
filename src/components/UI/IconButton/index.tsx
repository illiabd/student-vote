import clsx from 'clsx';
import { FC } from 'react';

import styles from './IconButton.module.scss';
import { IconButtonProps } from './types';

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
