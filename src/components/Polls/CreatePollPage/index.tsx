import { ArrowLeft24Regular } from '@fluentui/react-icons/lib/fonts';
import { FC, useState } from 'react';

import { IconButton, Input } from '../../UI';
import styles from './CreatePollPage.module.scss';

export const CreatePollPage: FC = () => {
  const [pollTitle, setPollTitle] = useState('Голосування без назви');

  const handlePollTitleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPollTitle(event.target.value);
  };
  return (
    <div className={styles.container}>
      <IconButton>
        <ArrowLeft24Regular />
      </IconButton>
      <div className={styles.title}>
        <Input type="text" value={pollTitle} onChange={handlePollTitleInputChange} />
      </div>
    </div>
  );
};
