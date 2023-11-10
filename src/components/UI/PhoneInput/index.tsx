import clsx from 'clsx';
import { FC, useState } from 'react';
import { IMaskInput } from 'react-imask';

import { COUNTRIES, PHONE_NUMBER_MASK } from '../../../constants';
import { Dropdown } from './Dropdown';
import styles from './PhoneInput.module.scss';
import { Country, PhoneInputProps } from './types';

export const PhoneInput: FC<PhoneInputProps> = ({
  label,
  id,
  errors,
  touched,
  className,
  onChange,
}) => {
  const [selectedCountry, setSelectedCountry] = useState<Country>(COUNTRIES[0]);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleAccept = (value: string) => {
    const phoneNumber = `+${selectedCountry.callingCode}${value}`;
    onChange(phoneNumber);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const hasErrors = errors && touched;

  const inputContainerClasses = clsx(
    styles.container,
    hasErrors && styles.error,
    isFocused && styles.focused,
    className,
  );
  const hintsClasses = clsx(styles.hints, hasErrors && styles.error);
  const labelClasses = clsx(styles.label);
  const inputClasses = clsx(styles.input);

  return (
    <label className={styles.input} htmlFor={id}>
      <div className={labelClasses}>
        <h4>{label}</h4>
      </div>

      <div className={inputContainerClasses} onFocus={handleFocus} onBlur={handleBlur}>
        <Dropdown
          value={selectedCountry}
          setValue={setSelectedCountry}
          optionsData={COUNTRIES}
          isFocused={isFocused}
        />
        <p>{`+${selectedCountry.callingCode}`}</p>
        <IMaskInput
          onFocus={handleFocus}
          onBlur={handleBlur}
          mask={PHONE_NUMBER_MASK}
          unmask
          onAccept={handleAccept}
          className={inputClasses}
          id={id}
          type="tel"
          placeholder={PHONE_NUMBER_MASK}
          autoComplete="off"
        />
      </div>

      <div className={hintsClasses}>
        <p>{errors}</p>
      </div>
    </label>
  );
};
