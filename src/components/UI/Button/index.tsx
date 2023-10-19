/* eslint-disable react/button-has-type */
import { FC } from 'react';
import clsx from 'clsx';

import { ButtonProps } from './types';
import styles from './Button.module.scss';

export const Button: FC<ButtonProps> = ({
  className,
  startIcon,
  children,
  disabled,
  endIcon,
  variant = 'contained',
  rounded,
  loading = false,
  size = 'sm',
  type = 'button',
  href,
  onClick,
}) => {
  if (href) {
    return (
      <div className={styles.link}>
        <a href={href}>{children}</a>
      </div>
    );
  }

  const buttonContent = (
    <>
      {!loading && startIcon && <div className={styles['start-icon']}>{startIcon}</div>}
      {loading && <div className={clsx(styles.ring, styles[variant])} />}
      <span>{children}</span>
      {!loading && endIcon && <div className={styles['end-icon']}>{endIcon}</div>}
    </>
  );

  const buttonClasses = clsx(
    styles.button,
    styles[size],
    styles[variant],
    rounded && styles.rounded,
    disabled && styles.disabled,
    className,
    loading && styles.action,
  );

  return (
    <button className={buttonClasses} type={type} onClick={onClick} disabled={disabled}>
      {buttonContent}
    </button>
  );
};
