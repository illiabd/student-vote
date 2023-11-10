import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../../UI';
import styles from './SuccessWindow.module.scss';

export const SuccessWindow: FC = () => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate('/');
  };

  const imageAlt = 'success-image';
  const imageSrc = '/images/success-image.svg';

  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <img alt={imageAlt} src={imageSrc} width={99} height={73.5} />
      </div>
      <div className={styles.message}>
        <h3>Вітаємо! Ви авторизувалися</h3>
      </div>
      <Button className={styles.button} size="lg" onClick={handleButtonClick} variant="contained">
        <h3>Перейти до профілю</h3>
      </Button>
    </div>
  );
};
