import { FC } from 'react';

import { Button } from '../../UI';

import { DeleteGroupModalProps } from './types';
import styles from './GroupTab.module.scss';
import api from '../../../axios';
import { useAppDispatch } from '../../../hooks';
import { findGroups } from '../../../store/current/actions';

export const DeleteGroupModal: FC<DeleteGroupModalProps> = ({ organisationId, group, onClose }) => {
  const dispatch = useAppDispatch();
  const content = `Ви справді бажаєте видалити групу ${group.name}?`;

  const handleDeleteButtonCLick = async () => {
    await api.delete(`/organisation/group/v1/${group.id}`);
    dispatch(findGroups({ organisation: organisationId }));
  };

  return (
    <div className={styles['delete-modal']}>
      <p>{content}</p>
      <div className={styles['buttons-container']}>
        <Button onClick={onClose} variant="outlined">
          Скасувати
        </Button>
        <Button onClick={handleDeleteButtonCLick}>Видалити</Button>
      </div>
    </div>
  );
};
