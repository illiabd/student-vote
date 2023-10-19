import { FC } from 'react';
import clsx from 'clsx';

import Select, { StylesConfig } from 'react-select';
import { DropdownProps } from './types';
import styles from './Dropdown.module.scss';

export const Dropdown: FC<DropdownProps> = ({
  options,
  label,
  errors,
  onChange,
  touched,
  multi,
  noLabel = false,
  ...props
}) => {
  const hasErrors = errors && touched;

  const labelClasses = clsx(styles.label, hasErrors && styles.error);
  const hintsClasses = clsx(styles.hints, hasErrors && styles.error);

  const dropdownStyles: StylesConfig = {
    control: (baseStyles, state) => {
      const borderColor = state.isFocused ? '#1784cc !important' : '#8a8a8a !important';
      return {
        ...baseStyles,
        padding: '0 8px',
        paddingTop: '16px',
        paddingBottom: '11px',
        border: '1px solid #8a8a8a',
        borderRadius: '4px',
        borderColor: hasErrors ? '#9a0000 !important' : borderColor,
        backgroundColor: hasErrors && '#f5e1e1',
        color: '#666767;',
        fontWeight: '500',
        fontSize: '14px',
        cursor: 'pointer',
        boxShadow: 'none',
        height: '50px',
      };
    },
    input: (baseStyles) => ({ ...baseStyles, padding: '0 !important' }),
    valueContainer: (baseStyles) => ({ ...baseStyles, padding: '0 !important' }),
    clearIndicator: (baseStyles) => ({
      ...baseStyles,
      padding: '0px !important',
    }),
    dropdownIndicator: (baseStyles) => ({
      ...baseStyles,
      padding: '0px !important',
    }),

    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected && '#f0f5f9 !important',
      color: state.isSelected ? '#05568c !important' : '#323333 !important',
      fontSize: '14px',
      '&:hover': {
        color: '#05568c !important',
      },
    }),
  };

  if (noLabel) {
    return (
      <Select
        styles={dropdownStyles}
        options={options}
        onChange={onChange}
        isMulti={multi}
        isClearable
        {...props}
      />
    );
  }

  return (
    <div className={styles.container}>
      <div className={labelClasses}>
        <h4>{label}</h4>
      </div>

      <Select
        styles={dropdownStyles}
        options={options}
        onChange={onChange}
        isMulti={multi}
        isClearable
        {...props}
      />

      <div className={hintsClasses}>
        <p>{errors}</p>
      </div>
    </div>
  );
};
