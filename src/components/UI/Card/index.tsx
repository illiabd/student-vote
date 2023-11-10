import clsx from 'clsx';
import { FC } from 'react';

import styles from './Card.module.scss';
import { CardProps } from './types';

export const Card: FC<CardProps> = ({ className, children, onClick }) => {
  const classes = clsx(styles.card, className);

  return (
    <div className={classes} onClick={onClick} aria-hidden="true">
      {children}
    </div>
  );
};
