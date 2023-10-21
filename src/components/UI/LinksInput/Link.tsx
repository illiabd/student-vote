import { Dismiss12Regular } from '@fluentui/react-icons';
import clsx from 'clsx';
import { FC } from 'react';

import {
  INSTAGRAM_LINK_REGEX,
  LINKEDIN_LINK_REGEX,
  TELEGRAM_LINK_REGEX,
  UserLinks,
} from '../../../constants';
import { IconButton } from '../IconButton';
import styles from './LinksInput.module.scss';
import { LinksProps } from './types';

const detectLinkType = (link: string) => {
  if (link.match(TELEGRAM_LINK_REGEX)) {
    return UserLinks.telegram;
  }

  if (link.match(INSTAGRAM_LINK_REGEX)) {
    return UserLinks.instagram;
  }

  if (link.match(LINKEDIN_LINK_REGEX)) {
    return UserLinks.linkedin;
  }

  return UserLinks.link;
};

export const Link: FC<LinksProps> = ({ id, link, onDelete }) => {
  const type = detectLinkType(link);

  const linkText = UserLinks[type];
  const imageAlt = `${type}-logo`;
  const imageSrc = `/images/${imageAlt}.svg`;

  const handleDeleteButtonClick = () => {
    onDelete(id);
  };

  const linkClasses = clsx(styles['link-container'], styles[type]);

  return (
    <div className={linkClasses}>
      <div className={styles.content}>
        <img alt={imageAlt} src={imageSrc} width={24} height={24} />
        {linkText}
      </div>
      <IconButton onClick={handleDeleteButtonClick}>
        <Dismiss12Regular />
      </IconButton>
    </div>
  );
};
