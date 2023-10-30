import { Add24Regular } from '@fluentui/react-icons';
import { FC, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { findStaff } from '../../../store/current/actions';
import { Button, Card, Modal } from '../../UI';
import { AddMemberModal } from './AddMemberModal';
import { StaffCard } from './StaffCard';
import styles from './StaffTab.module.scss';
import { StaffTabProps } from './types';

export const StaffTab: FC<StaffTabProps> = ({ selectedOrganisationId, hasOrganisations }) => {
  const [showAddUserModal, setShowAddUserModal] = useState<boolean>(false);
  const members = useAppSelector((state) => state.current.staff);
  const user = useAppSelector((state) => state.auth.userData);

  const dispatch = useAppDispatch();
  const handleModalClose = () => {
    setShowAddUserModal(false);
  };

  const handleAddUserButtonClick = () => {
    setShowAddUserModal(true);
  };

  useEffect(() => {
    if (selectedOrganisationId && hasOrganisations) {
      dispatch(findStaff(selectedOrganisationId));
    }
  }, [dispatch, hasOrganisations, selectedOrganisationId]);

  const hasStaff = members && members?.length > 0;

  const membersComponent =
    hasStaff &&
    members.map((member) => {
      if (!user) {
        return;
      }

      const isCurrentUser = user.id === member.user?.id;
      return (
        <StaffCard
          key={member.user.id}
          member={member}
          isCurrentUser={isCurrentUser}
          organisationId={selectedOrganisationId}
        />
      );
    });

  return (
    <>
      <Modal onClose={handleModalClose} isShown={showAddUserModal} title="Додати учасника">
        <AddMemberModal organisationId={selectedOrganisationId} onClose={handleModalClose} />
      </Modal>
      <Button endIcon={<Add24Regular />} size="md" onClick={handleAddUserButtonClick}>
        Додати учасника
      </Button>
      {hasStaff ? (
        membersComponent
      ) : (
        <Card className={styles.card}>
          <p>Організація не має учасників</p>
        </Card>
      )}
    </>
  );
};
