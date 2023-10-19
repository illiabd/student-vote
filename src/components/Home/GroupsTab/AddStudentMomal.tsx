import { FC, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { findGroups, findStudents, putStudentIntoGroup } from '../../../store/current/actions';
import { Button, Dropdown } from '../../UI';
import { Option } from '../../UI/Dropdown/types';

import { AddUserModalProps } from './types';
import styles from './GroupTab.module.scss';

export const AddStudentModal: FC<AddUserModalProps> = ({ organisationId, groupId, onClose }) => {
  const [selectedStudentId, setSelectedStudentId] = useState<string>('');
  const { studentsData, isLoading } = useAppSelector((state) => state.current);
  const dispatch = useAppDispatch();

  const handleAddButtonClick = async () => {
    dispatch(putStudentIntoGroup(groupId, selectedStudentId));
    await dispatch(findGroups({ organisation: organisationId }));
    await dispatch(findStudents(organisationId));
    onClose();
  };

  const handleDropdownChange = (option: Option) => {
    setSelectedStudentId(option?.value);
  };

  const options = studentsData?.docs?.map((student) => {
    const { user } = student;
    const fullName = `${user?.firstName || ''} ${user?.lastName || ''} ${user?.patronymic || ''}`;
    const hasName = fullName.trim()?.length > 0;
    return { value: user.id, label: hasName ? fullName : user.phoneNumber };
  });

  return (
    <div className={styles['create-modal']}>
      <Dropdown
        label="Оберіть студента"
        onChange={handleDropdownChange}
        options={options}
        placeholder="Надія Дія Володимирівна"
      />
      <div className={styles['buttons-container']}>
        <Button onClick={onClose} variant="outlined">
          Скасувати
        </Button>
        <Button onClick={handleAddButtonClick} loading={isLoading}>
          Додати
        </Button>
      </div>
    </div>
  );
};
