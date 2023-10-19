import { useFormik } from 'formik';
import { FC } from 'react';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { addMember, findStaff } from '../../../store/current/actions';
import { Button, PhoneInput } from '../../UI';

import { AddMemberFormValues, AddMemberModalProps } from './types';
import styles from './StaffTab.module.scss';

export const AddMemberModal: FC<AddMemberModalProps> = ({ organisationId, onClose }) => {
  const { isLoading } = useAppSelector((state) => state.current);
  const dispatch = useAppDispatch();

  const initialValues = {
    phoneNumber: '',
  };

  const handleAddButtonClick = async (values: AddMemberFormValues) => {
    await dispatch(addMember(values.phoneNumber, organisationId));
    await dispatch(findStaff(organisationId));
    onClose();
  };

  const formik = useFormik<AddMemberFormValues>({
    initialValues,
    onSubmit: handleAddButtonClick,
  });

  const handlePhoneInputChange = (phoneNumber: string) => {
    formik.setFieldValue('phoneNumber', phoneNumber, true);
  };

  return (
    <div className={styles['add-modal-container']}>
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
