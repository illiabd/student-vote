import { FC } from 'react';

import { Card } from '../Card';

import { MessageBoxProps } from './types';
import styles from './MessageBox.module.scss';

export const MessageBox: FC<MessageBoxProps> = ({ children }) => (
  <div className={styles.container}>
    <Card className={styles.card}>{children}</Card>
  </div>
);
