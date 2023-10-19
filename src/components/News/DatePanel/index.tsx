import { FC } from 'react';

import { DatePanelProps } from './types';
import { WEEK } from '../../../constants';
import styles from './DatePanel.module.scss';

export const DatePanel: FC<DatePanelProps> = ({ date }) => (
  <div className={styles.container}>
    <div className={styles.date}>
      <p>{date.getDate()}</p>
    </div>
    {WEEK[date.getDay()]}
  </div>
);
