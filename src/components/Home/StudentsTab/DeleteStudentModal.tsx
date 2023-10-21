import { FC } from 'react';

import api from '../../../axios';
import { useAppDispatch } from '../../../hooks';
import { findStudents } from '../../../store/current/actions';
import { Button } from '../../UI';
import styles from './StudentsTab.module.scss';
import { DeleteModalProps } from './types';

export const DeleteStudentModal: FC<DeleteModalProps> = ({ organisationId, users, onClose }) => {
  const dispatch = useAppDispatch();

  const handleUserDeletion = async () => {
    const promises = users.map((user) =>
      api.delete('/organisation/role/v1', { data: { organisationId, userId: user } }),
    );
    await Promise.all(promises);
    dispatch(findStudents(organisationId));
    onClose();
  };

  const content = 'Ви справді бажаєте видалити обраних студентів?';

  return (
    <div className={styles['delete-modal']}>
      <p>{content}</p>
      <div className={styles['buttons-container']}>
        <Button onClick={onClose} variant="outlined">
          Скасувати
        </Button>
        <Button onClick={handleUserDeletion}>Видалити</Button>
      </div>
    </div>
  );
};
