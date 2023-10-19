import { FC } from 'react';
import clsx from 'clsx';

import { CardProps } from './types';
import styles from './Card.module.scss';

export const Card: FC<CardProps> = ({ className, children, onClick }) => {
  const classes = clsx(styles.card, className);

  return (
    <div className={classes} onClick={onClick} aria-hidden="true">
      {children}
    </div>
  );
};
