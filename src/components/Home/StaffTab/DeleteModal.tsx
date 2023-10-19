import { FC } from 'react';
import { Button } from '../../UI';
import styles from './StaffTab.module.scss';
import { DeleteModalProps } from './types';
import { deleteStaff, findStaff } from '../../../store/current/actions';
import { useAppDispatch, useAppSelector } from '../../../hooks';

export const DeleteModal: FC<DeleteModalProps> = ({ onClose, userId, organisationId }) => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.current);

  const handleUserDeletion = async () => {
    await dispatch(deleteStaff(organisationId, userId));
    await dispatch(findStaff(organisationId));
    onClose();
  };

  const content = `Ви справді бажаєте видалити члена організації ${userId}?`;

  return (
    <div className={styles['delete-modal']}>
      <p>{content}</p>
      <div className={styles['buttons-container']}>
        <Button onClick={onClose} variant="outlined" loading={isLoading}>
          Скасувати
        </Button>
        <Button onClick={handleUserDeletion}>Видалити</Button>
      </div>
    </div>
  );
};
