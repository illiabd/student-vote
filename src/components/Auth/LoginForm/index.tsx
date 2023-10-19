import { FormikProps, useFormik } from 'formik';
import { FC } from 'react';
import clsx from 'clsx';

import { Button, PhoneInput } from '../../UI';
import { loginSchema } from '../../../schemas';

import { LoginFormProps, LoginFormValues } from './types';
import styles from './LoginForm.module.scss';
import { useAppSelector } from '../../../hooks';

export const LoginForm: FC<LoginFormProps> = ({ className, onSubmit }) => {
  const isLoading = useAppSelector((state) => state.auth.isLoading);

  const initialValues = {
    phoneNumber: '',
    password: '',
  };

  const formik: FormikProps<LoginFormValues> = useFormik<LoginFormValues>({
    initialValues,
    validationSchema: loginSchema,
    onSubmit,
  });

  const handlePhoneInputChange = (phoneNumber: string) => {
    formik.setFieldValue('phoneNumber', phoneNumber, true);
  };

  const formClasses = clsx(styles.form, className);

  return (
    <form className={formClasses} onSubmit={formik.handleSubmit}>
      <div className={styles.container}>
        <PhoneInput
          id="phone"
          label="Телефон"
          errors={formik.errors.phoneNumber}
          touched={formik.touched.password}
          onChange={handlePhoneInputChange}
        />
      </div>
      <Button type="submit" size="lg" className={styles.button} loading={isLoading}>
        Продовжити
      </Button>
    </form>
  );
};
