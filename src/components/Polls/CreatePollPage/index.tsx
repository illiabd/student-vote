import { ArrowLeft24Regular } from '@fluentui/react-icons';
import { FC, useState } from 'react';

import { IconButton, Input } from '../../UI';
import { PollQuestionCard } from '../PollQuestionCard';
import styles from './CreatePollPage.module.scss';

export const CreatePollPage: FC = () => {
  const [pollName, setPollName] = useState('');

  const handlePollTitleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPollName(event.target.value);
  };

  return (
    <div className={styles.container}>
      <IconButton>
        <ArrowLeft24Regular />
      </IconButton>
      <div className={styles.name}>
        <Input
          type="text"
          value={pollName}
          placeholder="Голосування без назви"
          onChange={handlePollTitleInputChange}
        />
      </div>
      <div className={styles.questions}>
        <PollQuestionCard />
      </div>
    </div>
  );
};
