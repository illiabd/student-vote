import { useFormik } from 'formik';
import { FC, useState } from 'react';

import api from '../../../axios';
import { useAppDispatch } from '../../../hooks';
import { findGroups } from '../../../store/current/actions';
import { Button, Dropdown, Input } from '../../UI';
import type { Option } from '../../UI/Dropdown/types';
import styles from './GroupTab.module.scss';
import { CreateGroupFormValues, CreateGroupModalProps } from './types';

export const CreateGroupModal: FC<CreateGroupModalProps> = ({ organisationId, onClose }) => {
  const [selectedCourse, setSelectedCourse] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const initialValues = {
    name: '',
  };

  const handleDropdown = (option: Option | Option[]) => {
    const isOptionArray = Array.isArray(option);
    if (isOptionArray) {
      return;
    }

    setSelectedCourse(option?.value);
  };

  const handleCreateButtonClick = async (values: CreateGroupFormValues) => {
    if (!selectedCourse) {
      return;
    }

    const body = {
      ...values,
      type: 'division',
      course: +selectedCourse,
      organisation: organisationId,
    };

    setIsLoading(true);
    await api.post('/organisation/group/v1/', body);
    setIsLoading(false);
    dispatch(findGroups({ organisation: organisationId }));
    onClose();
  };

  const formik = useFormik<CreateGroupFormValues>({
    initialValues,
    onSubmit: handleCreateButtonClick,
  });

  const options = ['1', '2', '3', '4', '5', '6'].map(
    (course) => ({ label: course, value: course }) as Option,
  );

  return (
    <div className={styles['create-modal']}>
      <Input
        id="name"
        label="Назва"
        errors={formik.errors.name}
        touched={formik.touched.name}
        onChange={formik.handleChange}
      />

      <Dropdown onChange={handleDropdown} options={options} placeholder="Від 1 до 5" />

      <div className={styles['buttons-container']}>
        <Button onClick={onClose} variant="outlined">
          Скасувати
        </Button>
        <Button onClick={formik.submitForm} loading={isLoading}>
          Створити
        </Button>
      </div>
    </div>
  );
};
