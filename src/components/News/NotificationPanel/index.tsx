import { Alert24Filled } from '@fluentui/react-icons';
import { FC } from 'react';

import styles from './NotificationPanel.module.scss';

export const NotificationPanel: FC = () => (
  <div className={styles.container}>
    <div className={styles.header}>
      Останні сповіщення
      <Alert24Filled primaryFill="#1784CC" />
    </div>
    <div className={styles.main} />
  </div>
);
