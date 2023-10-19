'use client';

import { Dismiss24Regular } from '@fluentui/react-icons';
import { FC, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import { IconButton } from '../IconButton';

import { ModalProps } from './types';
import styles from './Modal.module.scss';
import { Card } from '../Card';

export const Modal: FC<ModalProps> = ({ isShown, onClose, children, title }) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  useEffect(() => {
    if (isShown) {
      document.body.style.overflow = 'hidden';
      return;
    }
    document.body.style.overflow = 'unset';
  }, [isShown]);

  if (!isBrowser) {
    return null;
  }

  const modalHeader = title && (
    <div className={styles.header}>
      <p>{title}</p>
      <IconButton onClick={onClose}>
        <Dismiss24Regular />
      </IconButton>
    </div>
  );

  const modalContent = (
    <div className={styles.overlay}>
      <Card className={styles.card}>
        {modalHeader}
        <div className={styles.body}>{children}</div>
      </Card>
    </div>
  );

  const modalRoot = document.getElementById('modal-root');

  return ReactDOM.createPortal(isShown && modalContent, modalRoot);
};
