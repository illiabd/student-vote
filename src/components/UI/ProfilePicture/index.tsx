import { FC } from 'react';

import styles from './ProfilePicture.module.scss';
import { ProfilePictureProps } from './types';

export const ProfilePicture: FC<ProfilePictureProps> = ({
  source,
  alternative,
  width = 42,
  height = 42,
}) => {
  if (source) {
    return (
      <div className={styles['image-container']}>
        <img src={source} alt={alternative} width={width} height={height} />
      </div>
    );
  }

  const blankImageText = alternative.slice(0, 1);

  return (
    <div className={styles['blank-image']} style={{ width, height, fontSize: width / 2 }}>
      <span>{blankImageText.toUpperCase()}</span>
    </div>
  );
};
