import { ErrorCircle20Regular } from '@fluentui/react-icons';
import clsx from 'clsx';
import { FC, useState } from 'react';

import styles from './Input.module.scss';
import { InputProps } from './types';

export const Input: FC<InputProps> = ({
  startIcon,
  className,
  endIcon,
  touched,
  rounded,
  errors,
  label,
  id,
  noLabel = false,
  disabled = false,
  onChange,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(false);
  };

  const hasErrors = errors && touched;

  const labelClasses = clsx(styles.label, hasErrors && styles.error);
  const hintsClasses = clsx(styles.hints, hasErrors && styles.error);
  const iconsClasses = clsx(styles.icon, hasErrors && styles.error);

  const inputContainerClasses = clsx(
    styles.container,
    disabled && styles.disabled,
    rounded && styles.rounded,
    isFocused && styles.focused,
    hasErrors && styles.error,
    className,
  );

  const hintsIsShown = isFocused || hasErrors;

  const input = (
    <>
      <div className={inputContainerClasses}>
        {startIcon && <div className={styles.icon}>{startIcon}</div>}
        <input
          id={id}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          {...props}
        />
        {hasErrors && (
          <div className={iconsClasses}>
            <ErrorCircle20Regular />
          </div>
        )}
        {endIcon && !hasErrors && <div className={iconsClasses}>{endIcon}</div>}
      </div>

      {hintsIsShown && (
        <div className={hintsClasses}>
          <p>{errors}</p>
        </div>
      )}
    </>
  );

  if (noLabel) {
    return input;
  }

  return (
    <label className={styles.input} htmlFor={id}>
      <div className={labelClasses}>
        <h4>{label}</h4>
      </div>
      {input}
    </label>
  );
};
