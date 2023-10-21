import clsx from 'clsx';
import { FormikProps, useFormik } from 'formik';
import { FC, useEffect, useState } from 'react';

import { useAppSelector } from '../../../hooks';
import { verificationSchema } from '../../../schemas/verification-schema';
import { Button, SeparatedInput } from '../../UI';
import { VerificationFormProps, VerificationFormValues } from './types';
import styles from './VerificationForm.module.scss';

export const VerificationForm: FC<VerificationFormProps> = ({
  className,
  onSubmit,
  onResendCode,
}) => {
  const isLoading = useAppSelector((state) => state.auth.isLoading);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        clearInterval(myInterval);
      }
    }, 1000);

    return () => {
      clearInterval(myInterval);
    };
  });

  const initialValues = {
    code: '',
  };

  const formik: FormikProps<VerificationFormValues> = useFormik<VerificationFormValues>({
    initialValues,
    validationSchema: verificationSchema,
    onSubmit,
  });

  const handleCodeInputChange = (code: string) => {
    formik.setFieldTouched('code, true');
    formik.setFieldValue('code', code, true);
  };

  const handleResendButtonClick = () => {
    if (!onResendCode) {
      return;
    }

    setSeconds(60);
    onResendCode();
  };

  const isTimerCountdown = seconds > 0;
  const timer = `(${seconds})`;
  const buttonClasses = clsx(styles['button-container']);

  return (
    <form className={className} onSubmit={formik.handleSubmit}>
      <div className={styles['input-container']}>
        <p>Введіть 6-ти значний код з SMS</p>
        <SeparatedInput
          className={styles.input}
          length={6}
          touched={formik.touched.code}
          errors={formik.errors.code}
          onChange={handleCodeInputChange}
          value=""
        />
      </div>
      <div className={buttonClasses}>
        <Button variant="underlined" onClick={handleResendButtonClick} disabled={isTimerCountdown}>
          {`Я не отримав код ${isTimerCountdown ? timer : ''}`}
        </Button>

        <Button
          type="submit"
          size="lg"
          variant="contained"
          loading={isLoading}
          className={styles.button}
        >
          <h3>Продовжити</h3>
        </Button>
      </div>
    </form>
  );
};
