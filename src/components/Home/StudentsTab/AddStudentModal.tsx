import { useFormik } from 'formik';
import { FC, useState } from 'react';

import api from '../../../axios';
import { useAppDispatch } from '../../../hooks';
import { findStudents } from '../../../store/current/actions';
import { Button, PhoneInput } from '../../UI';
import styles from './StudentsTab.module.scss';
import { AddStudentFormValues, AddStudentModalProps } from './types';

export const AddStudentModal: FC<AddStudentModalProps> = ({ organisationId, onClose }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const initialValues = {
    phoneNumber: '',
  };

  const handleAddButtonClick = async (values: AddStudentFormValues) => {
    const body = {
      // commentFromBackend: this will actually not work untill we create new way to add users
      phoneNumber: values.phoneNumber,
      role: 'student',
      organisationId,
    };

    setIsLoading(true);
    await api.put('/organisation/role/v1', body);
    setIsLoading(false);
    dispatch(findStudents(organisationId));
    onClose();
  };

  const formik = useFormik<AddStudentFormValues>({
    initialValues,
    onSubmit: handleAddButtonClick,
  });

  const handlePhoneInputChange = (phoneNumber: string) => {
    formik.setFieldValue('phoneNumber', phoneNumber, true);
  };

  return (
    <div className={styles['add-student-modal']}>
      <PhoneInput
        id="phone"
        label="Телефон"
        errors={formik.errors.phoneNumber}
        touched={formik.touched.phoneNumber}
        onChange={handlePhoneInputChange}
      />
      <div className={styles['buttons-container']}>
        <Button onClick={onClose} variant="outlined">
          Скасувати
        </Button>
        <Button onClick={formik.submitForm} loading={isLoading}>
          Додати
        </Button>
      </div>
    </div>
  );
};
