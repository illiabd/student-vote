import { FC } from 'react';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { deleteVacancy, findVacancies } from '../../../store/vacancies/actions';
import { Button } from '../../UI';
import styles from './PollCard.module.scss';
import { DeleteModalProps } from './types';

export const DeleteModal: FC<DeleteModalProps> = ({ data, onClose }) => {
  const { isLoading } = useAppSelector((state) => state.news);
  const dispatch = useAppDispatch();

  const handleAcceptButtonClick = async () => {
    await dispatch(deleteVacancy(data.id));
    await dispatch(findVacancies({ organisation: data.organisation }));
    onClose();
  };

  const content = 'Ви справді бажаєте видалити цю вакансію?';

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
