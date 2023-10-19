import { FC } from 'react';

import styles from './NewsBadge.module.scss';
import { NewsBadgeProps } from './types';

export const NewsBadge: FC<NewsBadgeProps> = ({ content }) => (
  <div className={styles.badge}>{content}</div>
);
