'use client';

/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, useState } from 'react';

import { Button } from '../Button';
import { Input } from '../Input';

import { LinksInputProps } from './types';
import styles from './LinksInput.module.scss';
import { Link } from './Link';

export const LinksInput: FC<LinksInputProps> = ({ value, onChange, ...props }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [links, setLinks] = useState<string[]>([]);

  const handleAddButtonClick = () => {
    setLinks((prev) => {
      prev.unshift(inputValue);
      return prev;
    });
    setInputValue('');
    onChange(links);
  };

  const handleDeleteButtonClick = (id: number) => {
    setLinks((prev) => {
      prev.splice(id, 1);
      return prev;
    });
    onChange(links);
  };

  const linksComponents = value.map((link, index) => (
    <a key={index} id={index} link={link} onDelete={handleDeleteButtonClick} />
  ));

  const isButtonDisabled = inputValue.trim()?.length === 0;

  return (
    <div className={styles.container}>
      <div className={styles['input-wrapper']}>
        <Input
          {...props}
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
        <div className={styles['links-wrapper']}>{linksComponents}</div>
      </div>
      <Button onClick={handleAddButtonClick} size="sm" disabled={isButtonDisabled}>
        Додати
      </Button>
    </div>
  );
};
