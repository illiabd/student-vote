import { FC, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { loginUser, verifyCode } from '../../../store/auth/actions';
import { Card } from '../../UI';
import { LoginForm, SuccessWindow, VerificationForm } from '../';
import type { LoginFormValues } from '../LoginForm/types';
import type { VerificationFormValues } from '../VerificationForm/types';
import styles from './AuthPage.module.scss';

export const AuthPage: FC = () => {
  const dispatch = useAppDispatch();
  const needVerification = useAppSelector((state) => state.auth.needVerification);

  const [isAuthSuccess, setIsAuthSuccess] = useState<boolean>(false);
  const [authData, setAuthData] = useState<LoginFormValues>();

  const handleLoginFormSubmission = async (values: LoginFormValues) => {
    setAuthData(values);
    await dispatch(loginUser(values.phoneNumber, values.password));
  };

  const handleVerificationFormSubmission = async (values: VerificationFormValues) => {
    const isSuccess = await dispatch(verifyCode(values.code));
    setIsAuthSuccess(isSuccess);
  };

  const handleResendCodeButtonClick = async () => {
    if (!authData) {
      return;
    }

    await dispatch(loginUser(authData.phoneNumber, authData.password));
  };

  const currentForm = !needVerification ? (
    <LoginForm className={styles.form} onSubmit={handleLoginFormSubmission} />
  ) : (
    <VerificationForm
      className={styles.form}
      onSubmit={handleVerificationFormSubmission}
      onResendCode={handleResendCodeButtonClick}
    />
  );

  const content = isAuthSuccess ? <SuccessWindow /> : currentForm;

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <div>
          <h1>Авторизація</h1>
        </div>
        {content}
      </Card>
    </div>
  );
};
