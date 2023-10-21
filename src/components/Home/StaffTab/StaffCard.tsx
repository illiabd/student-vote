import { Delete24Regular, Edit24Regular } from '@fluentui/react-icons';
import clsx from 'clsx';
import { FC, useState } from 'react';

import { Card, IconButton, Modal } from '../../UI';
import { DeleteModal } from './DeleteModal';
import { EditModal } from './EditModal';
import styles from './StaffTab.module.scss';
import { StaffCardProps } from './types';

export const StaffCard: FC<StaffCardProps> = ({ member, isCurrentUser, organisationId }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteEditModal] = useState(false);
  const { user } = member;

  const handleModalClose = () => {
    setShowDeleteEditModal(false);
    setShowEditModal(false);
  };

  const handleEditButtonClick = () => {
    setShowEditModal(true);
  };

  const handleDeleteButtonClick = () => {
    setShowDeleteEditModal(true);
  };

  const fullName = clsx(user.lastName, user.firstName, user.patronymic);
  const modalTitle = showEditModal ? 'Зміна ролі учасника' : '';
  const modalContent = showEditModal ? (
    <EditModal
      currentRole={member.role}
      organisationId={organisationId}
      userId={user.id}
      onClose={handleModalClose}
    />
  ) : (
    <DeleteModal userId={user.id} organisationId={organisationId} onClose={handleModalClose} />
  );

  return (
    <Card className={styles['member-card']}>
      <Modal
        onClose={handleModalClose}
        isShown={showEditModal || showDeleteModal}
        title={modalTitle}
      >
        {modalContent}
      </Modal>

      <div className={styles.container}>
        <div className={styles['info-wrapper']}>
          <div className={styles.info}>
            <p>ID:</p>
            {user.id}
          </div>
          <div className={styles.info}>
            <p>Телефон:</p>
            {user.phoneNumber || '—'}
          </div>
          <div className={styles.info}>
            <p>ПІБ:</p>
            {fullName || (isCurrentUser && '(Ви)') || '—'}
          </div>
          <div className={styles.info}>
            <p>Роль:</p>
            {member.role || '—'}
          </div>
        </div>
        <div className={styles['tools-container']}>
          <IconButton onClick={handleEditButtonClick} disabled={isCurrentUser}>
            <Edit24Regular primaryFill={(isCurrentUser && '#b2b3b3') || '#323333'} />
          </IconButton>
          <IconButton disabled={isCurrentUser} onClick={handleDeleteButtonClick}>
            <Delete24Regular primaryFill={(isCurrentUser && '#b2b3b3') || '#323333'} />
          </IconButton>
        </div>
      </div>
    </Card>
  );
};
