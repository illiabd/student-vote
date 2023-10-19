import ReactCodeInput from 'react-code-input';
import { FC } from 'react';
import clsx from 'clsx';

import { SeparatedInputProps } from './types';
import styles from './SeparatedInput.module.scss';

export const SeparatedInput: FC<SeparatedInputProps> = ({
  value,
  length,
  errors,
  touched,
  onChange,
  className,
}) => {
  const hasErrors = errors && touched;
  const containerClasses = clsx(styles.container, className);
  const hintsClasses = clsx(styles.hints, hasErrors && styles.error);

  return (
    <div className={containerClasses}>
      <ReactCodeInput
        type="tel"
        value={value}
        fields={length}
        inputMode="tel"
        name="code-input"
        onChange={onChange}
        className="react-code-input"
        isValid={!hasErrors}
        inputStyleInvalid={{
          backgroundColor: '#F5E1E1',
          borderColor: '#9A0000',
        }}
      />
      <div className={hintsClasses}>
        <p>{errors}</p>
      </div>
    </div>
  );
};
