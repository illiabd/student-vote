import { LottieRefCurrentProps } from 'lottie-react';
import { MutableRefObject } from 'react';

export type LoadingAnimationProps = {
  onAnimationStart: () => void;
  onAnimationEnd: () => void;
  lottieRef: MutableRefObject<LottieRefCurrentProps | null>;
};
