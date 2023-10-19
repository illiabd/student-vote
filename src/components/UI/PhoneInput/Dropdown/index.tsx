import { ChevronRight16Filled } from '@fluentui/react-icons';
import { FC, useRef, useState } from 'react';
import Flag from 'react-world-flags';
import clsx from 'clsx';

import { DropdownOption } from './DropdownOption';

import { DropdownProps } from './types';
import { Country } from '../types';
import styles from './Dropdown.module.scss';
import { useOutsideClick } from '../../../../hooks';

export const Dropdown: FC<DropdownProps> = ({ value, isFocused, setValue, optionsData }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleDropdownClose = () => {
    setIsOpen(false);
  };

  const handleOptionClick = (option: Country) => {
    setValue(option);
    setIsOpen(false);
  };

  useOutsideClick(dropdownRef, handleDropdownClose, isOpen);

  const options = optionsData.map((option) => {
    const isSelected = value.ISOCode === option.ISOCode;
    return (
      <DropdownOption
        key={option.ISOCode}
        option={option}
        selected={isSelected}
        onOptionClick={handleOptionClick}
      />
    );
  });

  const isOpenClass = clsx(isOpen && styles.open);

  const dropdownBodyClasses = clsx(styles['dropdown-body'], isOpenClass);
  const dropdownIconClasses = clsx(styles.icon, isOpenClass);
  const dropdownClasses = clsx(styles.dropdown, isFocused && styles.focused);

  return (
    <div className={dropdownClasses} ref={dropdownRef}>
      <div className={styles['dropdown-header']} onClick={toggleDropdown} aria-hidden="true">
        <Flag code={value.ISOCode} width="29" height="21.75" />
        <ChevronRight16Filled className={dropdownIconClasses} width={10} height={10} />
      </div>
      <div className={dropdownBodyClasses}>{options}</div>
    </div>
  );
};
