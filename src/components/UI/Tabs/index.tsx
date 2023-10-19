'use client';

/* eslint-disable react/no-array-index-key */
import { FC, useState } from 'react';
import clsx from 'clsx';

import { TabsProps } from './types';
import styles from './Tabs.module.scss';

export const Tabs: FC<TabsProps> = ({ data }) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  const tabs = data.map((item, index) => {
    const isTabActive = index === selectedTabIndex;
    const tabClasses = clsx(styles.tab, isTabActive && styles.active);

    const handleTabClick = () => {
      setSelectedTabIndex(index);
    };

    return (
      <div key={`tab-${index}`} className={tabClasses} onClick={handleTabClick} aria-hidden="true">
        {item.title}
      </div>
    );
  });

  return (
    <div className={styles.container}>
      <div className={styles['tabs-container']}>{tabs}</div>
      <div className={styles['tabs-content']}>{data[selectedTabIndex].content}</div>
    </div>
  );
};
