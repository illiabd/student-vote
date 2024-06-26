import { Briefcase24Filled } from '@fluentui/react-icons';
import { useFormik } from 'formik';
import { FC } from 'react';

import { ScreenOrientation } from '../../../constants';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { companyInfoSchema } from '../../../schemas';
import { createOrganisation } from '../../../store/current/actions';
import { Button, Input } from '../../UI';
import styles from './CreateProfileForm.module.scss';
import { CompanyFormProps, CompanyFormValues } from './types';

export const CompanyForm: FC<CompanyFormProps> = ({ onNext, orientation }) => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.current);
  const { userData } = useAppSelector((state) => state.auth);

  const initialValues: CompanyFormValues = {
    name: '',
    link: '',
    email: '',
    douLink: '',
  };

  const onSubmit = async (values: CompanyFormValues) => {
    if (!userData) {
      return;
    }

    const body = {
      shortName: values.name,
      owner: userData.id,
      type: 'company',
      ...values,
    };

    const response = await dispatch(createOrganisation(body));

    if (response) {
      onNext();
    }
  };

  const formik = useFormik<CompanyFormValues>({
    initialValues,
    validationSchema: companyInfoSchema,
    onSubmit,
  });

  const handleNextButtonClick = () => {
    formik.handleSubmit();
  };

  return (
    <div className={styles['form-container']}>
      {orientation === ScreenOrientation.landscape && (
        <div className={styles.icon}>
          <Briefcase24Filled />
        </div>
      )}
      <div className={styles['description-container']}>
        <p className={styles.title}>Про компанію</p>
        {/* <p className={styles.description}></p> */}
      </div>
      <form className={styles['inputs-container']}>
        <Input
          id="name"
          type="text"
          label="Назва компанії*"
          placeholder="Student Vote"
          className={styles.input}
          value={formik.values.name}
          errors={formik.errors.name}
          touched={formik.touched.name}
          onChange={formik.handleChange}
        />
        <Input
          id="email"
          type="email"
          label="E-mail*"
          className={styles.input}
          value={formik.values.email}
          errors={formik.errors.email}
          touched={formik.touched.email}
          onChange={formik.handleChange}
        />
        <Input
          id="link"
          type="text"
          label="Сайт компанії"
          className={styles.input}
          value={formik.values.link}
          errors={formik.errors.link}
          touched={formik.touched.link}
          onChange={formik.handleChange}
        />
        <Input
          id="douLink"
          type="text"
          label="DOU.ua"
          placeholder="jobs.dou.ua"
          className={styles.input}
          value={formik.values.douLink}
          errors={formik.errors.douLink}
          touched={formik.touched.douLink}
          onChange={formik.handleChange}
        />
      </form>
      <div className={styles['buttons-container']}>
        <Button
          type="submit"
          size="md"
          className={styles.button}
          loading={isLoading}
          onClick={handleNextButtonClick}
        >
          Далі
        </Button>
      </div>
    </div>
  );
};
