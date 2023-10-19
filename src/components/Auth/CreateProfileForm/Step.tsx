import { FC } from 'react';
import clsx from 'clsx';

import styles from './CreateProfileForm.module.scss';
import { StepProps } from './types';

export const Step: FC<StepProps> = ({ number, selectedNumber, title, orientation, onClick }) => {
  const isFirst = number === 1;
  const isSelected = number === selectedNumber;
  const isVisited = number < selectedNumber;

  const statesClasses = clsx(isSelected && styles.selected, isVisited && styles.visited);
  const separatorClasses = clsx(styles.separator, statesClasses);
  const stepClasses = clsx(styles.step, statesClasses);

  const landscapeStep = (
    <div
      role="button"
      className={styles['step-container']}
      onClick={onClick}
      onKeyDown={null}
      tabIndex={0}
    >
      {!isFirst && (
        <>
          <div className={separatorClasses} />
          <span />
        </>
      )}

      <div className={stepClasses}>{number}</div>
      <p>{title}</p>
    </div>
  );

  const portraitStep = (
    <div className={styles['step-container']}>
      {!isFirst && <div className={separatorClasses} />}
      <div className={stepClasses}>
        <span>{number}</span>
      </div>
    </div>
  );

  switch (orientation) {
    case 'portrait':
      return portraitStep;
    default:
      return landscapeStep;
  }
};
