import { FC } from 'react';

import api from '../../../axios';
import { useAppDispatch } from '../../../hooks';
import { findGroups } from '../../../store/current/actions';
import { Button } from '../../UI';
import styles from './GroupTab.module.scss';
import { DeleteSelectedModalProps } from './types';

export const DeleteSelectedModal: FC<DeleteSelectedModalProps> = ({
  organisationId,
  groupId,
  selected,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const content = 'Ви справді бажаєте видалити обраних студентів?';

  // BUG: multiple deletion is not working
  const handleDeleteButtonCLick = async () => {
    const promises = selected.map((item) =>
      api.delete(`/organisation/group/v1/${groupId}/member/${item}`),
    );
    await Promise.all(promises);
    dispatch(findGroups({ organisation: organisationId }));
    onClose();
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
