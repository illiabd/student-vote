import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import { FC } from 'react';
import Select, { StylesConfig } from 'react-select';
import CreatableSelect from 'react-select/creatable';

import { DropdownProps, Option } from './types';

export const Dropdown: FC<DropdownProps> = ({
  errors,
  onChange,
  touched,
  multi,
  noLabel = false,
  disabled = false,
  creatable = false,
  ...props
}) => {
  const hasErrors = errors && touched;

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
        backgroundColor: hasErrors ? '#f5e1e1' : baseStyles.backgroundColor,
        color: '#666767;',
        fontWeight: '500',
        fontSize: '14px',
        cursor: 'pointer',
        boxShadow: 'none',
        minHeight: '50px',
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
      backgroundColor: state.isSelected ? '#f0f5f9 !important' : provided.backgroundColor,
      color: state.isSelected ? '#05568c !important' : '#323333 !important',
      fontSize: '14px',
      '&:hover': {
        color: '#05568c !important',
      },
    }),

    menuPortal: (baseStyles) => ({
      ...baseStyles,
      zIndex: 999,
    }),
  };

  const handleChange = (newValue: unknown) => {
    onChange(newValue as Option);
  };

  const select = creatable ? (
    <CreatableSelect
      styles={dropdownStyles}
      onChange={handleChange}
      isMulti={multi}
      isClearable
      isDisabled={disabled}
      menuPortalTarget={document.body}
      {...props}
    />
  ) : (
    <Select
      styles={dropdownStyles}
      onChange={handleChange}
      isMulti={multi}
      isClearable
      isDisabled={disabled}
      menuPortalTarget={document.body}
      {...props}
    />
  );

  if (noLabel) {
    return select;
  }

  return (
    <>
      <FormControl fullWidth>
        {select}
        <FormHelperText>{errors}</FormHelperText>
      </FormControl>
    </>
  );
};
