/* eslint-disable operator-linebreak */
import { FC, useState } from 'react';
import { Delete24Regular, Add24Regular } from '@fluentui/react-icons';

import { Card, IconButton, Modal } from '../../UI';

import { DeleteSelectedModal } from './DeleteSelectedModal';
import { DeleteGroupModal } from './DeleteGroupModal';
import { GroupCardProps } from './types';
import styles from './GroupTab.module.scss';
import { AddStudentModal } from './AddStudentMomal';

export const GroupCard: FC<GroupCardProps> = ({ groupData, studentsData, organisationId }) => {
  const [showDeleteSelectedModal, setShowDeleteSelectedModal] = useState(false);
  const [showDeleteGroupModal, setShowDeleteGroupModal] = useState(false);
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [selected, setSelected] = useState<readonly string[]>([]);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = studentsData.map((student) => student.user.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const handleModalClose = () => {
    setShowDeleteSelectedModal(false);
    setShowDeleteGroupModal(false);
    setShowAddStudentModal(false);
  };

  const handleDeleteButtonClick = () => {
    if (selected?.length > 0) {
      setShowDeleteSelectedModal(true);
      return;
    }
    setShowDeleteGroupModal(true);
  };

  const handleAddButtonClick = () => {
    setShowAddStudentModal(true);
  };

  const hasStudents = studentsData?.length > 0;

  const isMainCheckboxChecked = selected?.length > 0;
  const isModalShown = showDeleteGroupModal || showDeleteSelectedModal || showAddStudentModal;
  const modalTitle = '';

  const renderModal = () => {
    if (showDeleteGroupModal) {
      return (
        <DeleteGroupModal
          organisationId={organisationId}
          group={groupData}
          onClose={handleModalClose}
        />
      );
    }

    if (showDeleteSelectedModal) {
      return (
        <DeleteSelectedModal
          organisationId={organisationId}
          groupId={groupData.id}
          selected={selected}
          onClose={handleModalClose}
        />
      );
    }

    if (showAddStudentModal) {
      return (
        <AddStudentModal
          organisationId={organisationId}
          groupId={groupData.id}
          onClose={handleModalClose}
        />
      );
    }

    return null;
  };

  const students =
    hasStudents &&
    studentsData.map(({ user }) => {
      const hasFullNAme = user.lastName || user.firstName || user.patronymic;
      const fullName = hasFullNAme
        ? `${user?.lastName || ''} ${user?.firstName || ''} ${user?.patronymic || ''}`
        : '—';

      const isStudentSelected = isSelected(user.id);

      const handleClick = () => {
        const selectedIndex = selected.indexOf(user.id);
        let newSelected: readonly string[] = [];

        if (selectedIndex === -1) {
          newSelected = newSelected.concat(selected, user.id);
        } else if (selectedIndex === 0) {
          newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
          newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
          newSelected = newSelected.concat(
            selected.slice(0, selectedIndex),
            selected.slice(selectedIndex + 1),
          );
        }

        setSelected(newSelected);
      };

      return (
        <tr key={user.id} className={styles.row}>
          <td className={styles.cell}>
            <input type="checkbox" checked={isStudentSelected} onChange={handleClick} />
          </td>
          <td className={styles.cell}>{fullName}</td>
          <td className={styles.cell}>{user.phoneNumber}</td>
        </tr>
      );
    });

  return (
    <Card className={styles['group-card']}>
      <Modal onClose={handleModalClose} isShown={isModalShown} title={modalTitle}>
        {renderModal()}
      </Modal>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span>
          <p>Група: </p>
          {groupData.name}
        </span>
        <div className={styles['tools-container']}>
          <IconButton onClick={handleAddButtonClick}>
            <Add24Regular primaryFill="#323333" />
          </IconButton>
          <IconButton onClick={handleDeleteButtonClick}>
            <Delete24Regular primaryFill="#323333" />
          </IconButton>
        </div>
      </div>
      {hasStudents ? (
        <table className={styles.table}>
          <thead>
            <tr className={styles.row}>
              <td className={styles.cell}>
                <input
                  type="checkbox"
                  checked={isMainCheckboxChecked}
                  onChange={handleSelectAllClick}
                />
              </td>
              <td className={styles.cell}>ПІБ</td>
              <td className={styles.cell}>Телефон</td>
            </tr>
          </thead>
          <tbody>{students}</tbody>
        </table>
      ) : (
        <>У цій групі немає студентів</>
      )}
    </Card>
  );
};
