/* eslint-disable jsx-a11y/anchor-is-valid */
import { Checkmark24Regular, Edit24Regular, ErrorCircle20Regular } from '@fluentui/react-icons';
import { FC, useState } from 'react';

import clsx from 'clsx';
import { Button, Card, Modal } from '../../UI';

import { OrganisationCardProps } from './types';
import { EditModal } from './EditModal';
import styles from './OrganisationCard.module.scss';

export const OrganisationCard: FC<OrganisationCardProps> = ({ organisationData }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const handleModalClose = () => {
    setShowEditModal(false);
  };

  const statusBadgeClasses = clsx(
    styles['status-badge'],
    organisationData?.isActive ? styles.active : styles.inactive,
  );

  const statusBadgeIcon = organisationData?.isActive ? undefined : <ErrorCircle20Regular />;

  const statusBadgeText = organisationData?.isActive
    ? 'Організація активна. Телеграм бот підтримки —'
    : 'Діяльність організації тимчасово обмежена, телеграм бот підтримки —';

  const statusBadge = (
    <div className={statusBadgeClasses}>
      <span>
        {statusBadgeText}
        <a href="https://t.me/univera_bot" className={styles['telegram-link']}>
          @univera_bot
        </a>
      </span>
      <div className={styles.icon}>{statusBadgeIcon}</div>
    </div>
  );

  const approvedBadge = (
    <span className={styles['approved-badge']}>
      <Checkmark24Regular />
    </span>
  );

  const modalTitle = 'Редагування даних компанії';

  return (
    <>
      <Modal onClose={handleModalClose} isShown={showEditModal} title={modalTitle}>
        <EditModal organisationData={organisationData} onClose={handleModalClose} />
      </Modal>

      <Card className={styles.card}>
        <div className={styles.header}>
          <div className={styles['name-container']}>
            <div className={styles.name}>
              <p style={{ fontSize: '24px' }}>
                {organisationData?.name}
                {organisationData?.isApproved && approvedBadge}
              </p>
              {organisationData?.shortName}
            </div>
            <div className={styles['tools-container']}>
              <Button
                size="sm"
                variant="outlined"
                endIcon={<Edit24Regular />}
                onClick={() => setShowEditModal(true)}
              >
                Редагувати
              </Button>
            </div>
          </div>
        </div>
        <div className={styles.info}>{statusBadge}</div>
      </Card>
    </>
  );
};
