import { Archive24Regular, Checkmark24Filled, Delete24Regular } from '@fluentui/react-icons';
import { FC, useState } from 'react';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { archivePoll, findPolls, publishPoll } from '../../../store/polls/actions';
import { Card, IconButton, Modal } from '../../UI';
import { DeleteModal } from './DeleteModal';
import styles from './PollCard.module.scss';
import { VoteCardProps } from './types';

export const PollCard: FC<VoteCardProps> = ({ data }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const { selectedOrganisationId } = useAppSelector((state) => state.current);

  const dispatch = useAppDispatch();

  const handleModalClose = () => {
    setShowDeleteModal(false);
    setShowEditModal(false);
  };

  const handleDeleteButtonClick = () => {
    setShowDeleteModal(true);
  };

  const handlePublishButtonClick = async () => {
    await dispatch(publishPoll(data.id));

    if (!selectedOrganisationId) {
      return;
    }

    await dispatch(findPolls(selectedOrganisationId));
  };

  const handleArchiveButtonClick = async () => {
    await dispatch(archivePoll(data.id));

    if (!selectedOrganisationId) {
      return;
    }

    await dispatch(findPolls(selectedOrganisationId));
  };

  const pollLink = `/polls/edit/${data.id}`;

  const isModalShown = showDeleteModal || showEditModal;
  const modalContent = <DeleteModal data={data} onClose={handleModalClose} />;

  return (
    <>
      <Modal onClose={undefined} isShown={isModalShown}>
        {modalContent}
      </Modal>
      <Card className={styles.card}>
        <div className={styles['title-container']}>
          <Link to={pollLink} className={styles.link}>
            {data.name}
          </Link>
          {data.status === 'created' && <span className={styles.isActive}>(неактивне)</span>}
        </div>

        <div className={styles['tools-container']}>
          {data.status === 'created' && (
            <IconButton onClick={handlePublishButtonClick}>
              <Checkmark24Filled primaryFill="#1784cc" />
            </IconButton>
          )}

          {data.status === 'active' && (
            <IconButton onClick={handleArchiveButtonClick}>
              <Archive24Regular />
            </IconButton>
          )}

          <IconButton>
            <Delete24Regular onClick={handleDeleteButtonClick} />
          </IconButton>
        </div>
      </Card>
    </>
  );
};
