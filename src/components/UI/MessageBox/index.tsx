import { FC } from 'react';

import { Card } from '../Card';
import styles from './MessageBox.module.scss';
import { MessageBoxProps } from './types';

export const MessageBox: FC<MessageBoxProps> = ({ children }) => (
  <div className={styles.container}>
    <Card className={styles.card}>{children}</Card>
  </div>
);
