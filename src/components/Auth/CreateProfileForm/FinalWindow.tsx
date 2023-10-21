import { ThumbLike24Filled } from '@fluentui/react-icons';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../../hooks';
import { findOrganisations } from '../../../store/organisations/actions';
import { Button } from '../../UI';
import styles from './CreateProfileForm.module.scss';

export const FinalWindow: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleHomeButtonClick = async () => {
    await dispatch(
      findOrganisations({
        filters: { role: 'admin' },
      }),
    );

    navigate('/');
  };

  return (
    <div className={styles['form-container']} style={{ alignItems: 'center' }}>
      <div className={styles.icon}>
        <ThumbLike24Filled />
      </div>
      <div
        className={styles['description-container']}
        style={{ textAlign: 'center', fontWeight: '500' }}
      >
        <p className={styles.title}>
          Вітаємо!
          <br />
          Ваш профіль знаходиться на перевірці.
        </p>
        <p className={styles.description}>
          Як тільки його буде підтверджено модератором ви зможете публікувати створені вакансії і
          пропозиції.
        </p>
      </div>
      <div className={styles['buttons-container']} style={{ width: '100%' }}>
        <Button type="submit" size="md" className={styles.button} onClick={handleHomeButtonClick}>
          До профілю
        </Button>
      </div>
    </div>
  );
};
