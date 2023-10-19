import { Dispatch, SetStateAction } from 'react';
import { Country } from '../types';

export type DropdownProps = {
  value: Country;
  isFocused: boolean;
  optionsData: Country[];
  setValue: Dispatch<SetStateAction<Country>>;
};

export type DropdownOptionProps = {
  option: Country;
  selected: boolean;
  onOptionClick: (option: Country) => void;
};
