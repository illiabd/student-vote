import { FC, useState } from 'react';

import { ROLES } from '../../../constants';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { findStaff, setMemberRole } from '../../../store/current/actions';
import { Button, Dropdown } from '../../UI';
import type { Option } from '../../UI/Dropdown/types';
import styles from './StaffTab.module.scss';
import { EditModalProps } from './types';

export const EditModal: FC<EditModalProps> = ({ currentRole, userId, organisationId, onClose }) => {
  const [selectedRole, setSelectedRole] = useState(currentRole);

  const { isLoading } = useAppSelector((state) => state.current);
  const dispatch = useAppDispatch();

  const handleDropdown = (option: Option | Option[]) => {
    const isOptionArray = Array.isArray(option);
    if (isOptionArray) {
      return;
    }

    setSelectedRole(option?.value);
  };

  const handleChangesSaving = async () => {
    await dispatch(setMemberRole(userId, organisationId, selectedRole));
    await dispatch(findStaff(organisationId));
    onClose();
  };

  const options = ROLES.map((role) => ({ label: role, value: role }));

  return (
    <div className={styles['edit-modal']}>
      <Dropdown label="Роль:" placeholder="Адмін" options={options} onChange={handleDropdown} />
      <Button
        disabled={currentRole === selectedRole}
        size="sm"
        onClick={handleChangesSaving}
        loading={isLoading}
      >
        Зберегти
      </Button>
    </div>
  );
};
