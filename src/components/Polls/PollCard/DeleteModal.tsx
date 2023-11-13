import { FC } from 'react';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { deletePoll, findPolls } from '../../../store/polls/actions';
import { Button } from '../../UI';
import styles from './PollCard.module.scss';
import { DeleteModalProps } from './types';

export const DeleteModal: FC<DeleteModalProps> = ({ data, onClose }) => {
  const { isLoading } = useAppSelector((state) => state.polls);
  const dispatch = useAppDispatch();

  const handleAcceptButtonClick = async () => {
    await dispatch(deletePoll(data.id));
    await dispatch(findPolls(data.organisationId));
    onClose();
  };

  const content = 'Ви справді бажаєте видалити це голосування?';

  return (
    <div className={styles['delete-modal']}>
      <p>{content}</p>
      <div className={styles['buttons-container']}>
        <Button onClick={onClose} variant="outlined">
          Скасувати
        </Button>
        <Button onClick={handleAcceptButtonClick} loading={isLoading}>
          Видалити
        </Button>
      </div>
    </div>
  );
};
