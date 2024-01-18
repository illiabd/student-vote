import { Vote24Regular } from '@fluentui/react-icons';
import { FC } from 'react';

import { Card, LinearProgressWithLabel } from '../../UI';
import styles from './PollResultsQuestion.module.scss';
import { PollResultsQuestionProps } from './types';

export const PollResultsQuestion: FC<PollResultsQuestionProps> = ({ question }) => {
  const questionAnswersSum = question.options.reduce((sum, option) => {
    return sum + option.amount;
  }, 0);

  const options = question.options.map((option) => {
    const percentage = (option.amount * 100) / questionAnswersSum;
    const roundedPercentage = Math.round(percentage * 100) / 100;
    return (
      <div key={option.id}>
        {option.name}
        <LinearProgressWithLabel value={isNaN(roundedPercentage) ? 0 : percentage} />
        <div className={styles['answers-amount']}>
          <Vote24Regular />
          {option.amount}
        </div>
      </div>
    );
  });

  return (
    <Card className={styles['question-container']}>
      <p>{question.name}</p>
      {options}
    </Card>
  );
};
