import {
  Add24Regular,
  Delete24Regular,
  Dismiss24Regular,
  RadioButton24Regular,
} from '@fluentui/react-icons';
import { FC, useState } from 'react';

import { Card, IconButton, Input } from '../../UI';
import styles from './PollQuestionCard.module.scss';

export const PollQuestionCard: FC = () => {
  const [questionName, setQuestionName] = useState('');
  const [newOption, setNewOption] = useState('');
  const [options, setOptions] = useState<string[]>([]);

  const handleQuestionInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuestionName(event.target.value);
  };

  const handleNewOptionInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewOption(event.target.value);
  };

  const handleAddOptionButtonClick = () => {
    setOptions((prev) => {
      const prevCopy = Array.from(prev);
      prevCopy.push(newOption);
      return prevCopy;
    });

    setNewOption('');
  };

  const optionsElement = options.map((value, index) => {
    const handleDeleteOptionButton = () => {
      setOptions((prev) => {
        const prevCopy = Array.from(prev);
        const filtered = prevCopy.filter((item) => item !== value);
        return filtered;
      });
    };
    return (
      <div key={index} className={styles.option}>
        <div className={styles['option-content']}>
          <RadioButton24Regular color="#1784cc" />
          {value}
        </div>
        <IconButton onClick={handleDeleteOptionButton}>
          <Dismiss24Regular />
        </IconButton>
      </div>
    );
  });

  const hasOptions = optionsElement.length > 0;
  return (
    <Card className={styles.card}>
      <div className={styles.name}>
        <Input
          value={questionName}
          noLabel
          placeholder="Ваше питання"
          onChange={handleQuestionInputChange}
        />
      </div>

      <div className={styles['add-section']}>
        <Input
          value={newOption}
          noLabel
          placeholder="Додати варіант"
          onChange={handleNewOptionInputChange}
        />
        <IconButton>
          <Add24Regular onClick={handleAddOptionButtonClick} />
        </IconButton>
      </div>

      {hasOptions && <div className={styles.options}>{optionsElement}</div>}

      <div style={{ margin: '0 auto' }}>
        <IconButton>
          <Delete24Regular />
        </IconButton>
      </div>
    </Card>
  );
};
