import { Checkmark16Regular } from '@fluentui/react-icons';
import clsx from 'clsx';
import { FC } from 'react';
import Flag from 'react-world-flags';

import styles from './Dropdown.module.scss';
import { DropdownOptionProps } from './types';

export const DropdownOption: FC<DropdownOptionProps> = ({ option, selected, onOptionClick }) => {
  const optionContent = (
    <>
      <Flag code={option.ISOCode} width="29" height="21.75" />
      {`+${option.callingCode}`}
    </>
  );

  return (
    <div
      className={clsx(styles['dropdown-item'], selected && styles.selected)}
      onClick={onOptionClick.bind(undefined, option)}
      aria-hidden="true"
    >
      {optionContent}
      {selected && (
        <div className={styles['selected-icon']}>
          <Checkmark16Regular />
        </div>
      )}
    </div>
  );
};
