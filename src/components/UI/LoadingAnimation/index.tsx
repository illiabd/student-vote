import Lottie from 'lottie-react';
import { FC, useEffect } from 'react';

import univeraLoadingAnimation from '../../../static/lottie/univera-loading.json';
import styles from './LoadingAnimation.module.scss';
import { LoadingAnimationProps } from './types';

export const LoadingAnimation: FC<LoadingAnimationProps> = ({
  lottieRef,
  onAnimationStart,
  onAnimationEnd,
}) => {
  useEffect(() => {
    onAnimationStart();
    lottieRef.current?.setSpeed(3);
  }, []);
  return (
    <div className={styles.container}>
      <Lottie
        className={styles.lottie}
        lottieRef={lottieRef}
        animationData={univeraLoadingAnimation}
        onLoopComplete={onAnimationEnd}
      />
    </div>
  );
};
