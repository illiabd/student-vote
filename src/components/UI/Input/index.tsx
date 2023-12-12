import { InputAdornment } from '@mui/material';
import TextField from '@mui/material/TextField';
import { FC } from 'react';

import styles from './Input.module.scss';
import { InputProps } from './types';

export const Input: FC<InputProps> = ({
  startIcon,
  endIcon,
  touched,
  errors,
  label,
  id,
  disabled = false,
  fullWidth,
  variant,
  onChange,
  ...props
}) => {
  const hasErrors = !!errors && errors.length > 0 && touched;

  return (
    <TextField
      id={id}
      label={label}
      error={hasErrors}
      onChange={onChange}
      disabled={disabled}
      helperText={errors}
      variant={variant}
      fullWidth={fullWidth}
      inputProps={{ ...props }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <div className={styles.icon}>{startIcon}</div>
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="start">
            <div className={styles.icon}>{endIcon}</div>
          </InputAdornment>
        ),
      }}
    />
  );
};
