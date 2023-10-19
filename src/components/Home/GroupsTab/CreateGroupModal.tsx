import { FC, useState } from 'react';
import { useFormik } from 'formik';

import { Button, Input, Dropdown } from '../../UI';
import { useAppDispatch } from '../../../hooks';
import { findGroups } from '../../../store/current/actions';
import { Option } from '../../UI/Dropdown/types';
import api from '../../../axios';

import { CreateGroupFormValues, CreateGroupModalProps } from './types';
import styles from './GroupTab.module.scss';

export const CreateGroupModal: FC<CreateGroupModalProps> = ({ organisationId, onClose }) => {
  const [selectedCourse, setSelectedCourse] = useState<string>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const initialValues = {
    name: '',
  };

  const handleDropdown = (option: Option) => {
    setSelectedCourse(option?.value);
  };

  const handleCreateButtonClick = async (values: CreateGroupFormValues) => {
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
    (course) => ({ label: course, value: course } as Option),
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

      <Dropdown label="Курс" onChange={handleDropdown} options={options} placeholder="Від 1 до 5" />

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
