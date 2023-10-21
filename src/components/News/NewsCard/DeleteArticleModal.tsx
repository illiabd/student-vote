import { FC } from 'react';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { deleteArticle, findNews } from '../../../store/news/actions';
import { Button } from '../../UI';
import styles from './NewsCard.module.scss';
import { DeleteArticleModalProps } from './types';

export const DeleteArticleModal: FC<DeleteArticleModalProps> = ({ data, onClose }) => {
  const { isLoading } = useAppSelector((state) => state.news);
  const dispatch = useAppDispatch();

  const handleAcceptButtonClick = async () => {
    await dispatch(deleteArticle(data.id));
    await dispatch(findNews({ organisation: data.organisation }));
    onClose();
  };

  const content = 'Ви справді бажаєте видалити цю новину?';

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
