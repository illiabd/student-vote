/* eslint-disable operator-linebreak */

import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../../UI';

import styles from './WelcomePage.module.scss';

export const WelcomePage: FC = () => {
  const navigate = useNavigate();

  const handleLoginButtonClick = () => {
    navigate('/auth');
  };

  const imageAlt = 'telegram-logo';
  const imageSrc = '/images/telegram-logo.svg';

  return (
    <>
      <div className={styles['header-container']}>
        <div className={styles['navigation-container']}>
          <div className={styles['logo-container']}>
            <img
              src="/images/univera-logo-full-white.svg"
              alt="univera-logo"
              width={120}
              height={32}
            />
          </div>
          <div className={styles['buttons-container']}>
            <Button variant="outlined" size="sm" rounded onClick={handleLoginButtonClick}>
              Увійти
            </Button>
          </div>
        </div>
        <div className={styles['content-container']}>
          <p className={styles.title}>Univera для бізнесу </p>
          <p className={styles.text}>
            Публікуйте рекламу, стажування, вакансії, вебінари та новини для тисяч студентів. Все з
            однієї зручної платформи Univera
          </p>
        </div>
      </div>
      <div className={styles.content}>
        Якщо у тебе є відгуки, пропозиції або помітив/ла які-небудь проблеми чи баги, ми радо
        приймемо твої повідомлення в нашому боті підтримки
        <a href="https://t.me/univera_bot">
          <div className={styles['telegram-button']}>
            <img alt={imageAlt} src={imageSrc} width={24} height={24} />
            @univera_bot
          </div>
        </a>
      </div>
    </>
  );
};
