import { PersonInfo20Filled } from '@fluentui/react-icons';
import { useFormik } from 'formik';
import { FC } from 'react';

import { Input, Button, LinksInput } from '../../UI';
import { userInfoSchema } from '../../../schemas';
import { useAppDispatch } from '../../../hooks';
import { patchUser } from '../../../store/current/actions';

import { UserFormProps, UserFormValues } from './types';
import styles from './CreateProfileForm.module.scss';
import { ScreenOrientation } from '../../../constants';

export const UserForm: FC<UserFormProps> = ({ onNext, orientation }) => {
  const dispatch = useAppDispatch();
  const initialValues: UserFormValues = {
    firstName: '',
    lastName: '',
    socialMediaLinks: [],
  };

  const onSubmit = async (values: UserFormValues) => {
    const response = await dispatch(patchUser(values));
    if (!response) {
      return;
    }
    onNext();
  };

  const formik = useFormik<UserFormValues>({
    initialValues,
    validationSchema: userInfoSchema,
    onSubmit,
  });

  const handleUserLinksChange = (value: string[]) => {
    formik.setFieldValue('socialMediaLinks', value);
  };

  const handleNextButtonClick = () => {
    formik.handleSubmit();
  };

  return (
    <div className={styles['form-container']}>
      {orientation === ScreenOrientation.portrait && (
        <div className={styles.icon}>
          <PersonInfo20Filled />
        </div>
      )}
      <div className={styles['description-container']}>
        <p className={styles.title}>Особисті дані</p>
      </div>
      <form onSubmit={formik.handleSubmit} className={styles['inputs-container']}>
        <Input
          id="firstName"
          type="text"
          label="Ваше ім'я*"
          placeholder="Данило"
          className={styles.input}
          value={formik.values.firstName}
          errors={formik.errors.firstName}
          touched={formik.touched.firstName}
          onChange={formik.handleChange}
        />
        <Input
          id="lastName"
          type="text"
          label="Ваше прізвище*"
          placeholder="Дерменжи"
          className={styles.input}
          value={formik.values.lastName}
          errors={formik.errors.lastName}
          touched={formik.touched.lastName}
          onChange={formik.handleChange}
        />
        <LinksInput
          id="socialMediaLinks"
          type="text"
          label="Соціальні мережі"
          placeholder="t.me/username"
          value={formik.values.socialMediaLinks}
          errors={formik.errors.socialMediaLinks}
          touched={formik.touched.socialMediaLinks}
          onChange={handleUserLinksChange}
        />
        <span />
      </form>
      <div className={styles['buttons-container']} style={{ marginTop: 0 }}>
        <Button
          type="submit"
          size="md"
          className={styles.button}
          loading={false}
          onClick={handleNextButtonClick}
        >
          Далі
        </Button>
      </div>
    </div>
  );
};
