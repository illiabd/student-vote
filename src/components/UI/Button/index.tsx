import clsx from 'clsx';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import styles from './Button.module.scss';
import { ButtonProps } from './types';

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
  important = false,
  href,
  onClick,
}) => {
  if (href) {
    return (
      <div className={styles.link}>
        <Link to={href}>{children}</Link>
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
    important && styles.important,
    className,
    loading && styles.action,
  );

  return (
    <button className={buttonClasses} type={type} onClick={onClick} disabled={disabled}>
      {buttonContent}
    </button>
  );
};
