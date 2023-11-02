import { Archive24Regular, Checkmark24Filled, Delete24Regular } from '@fluentui/react-icons';
import { FC, useState } from 'react';

import { useAppDispatch } from '../../../hooks';
import { findPolls } from '../../../store/polls/actions';
import { Card, IconButton, Modal } from '../../UI';
import { DeleteModal } from './DeleteModal';
import styles from './PollCard.module.scss';
import { VoteCardProps } from './types';

export const PollCard: FC<VoteCardProps> = ({ data }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const dispatch = useAppDispatch();

  const handleModalClose = () => {
    setShowDeleteModal(false);
    setShowEditModal(false);
  };

  const handleDeleteButtonClick = () => {
    setShowDeleteModal(true);
  };

  const handlePublishButtonClick = async () => {
    // await dispatch(publishPoll(data.id));
    await dispatch(findPolls(data.organisation));
  };

  const handleArchiveButtonClick = async () => {
    // await dispatch(archivePoll(data.id));
    await dispatch(findPolls(data.organisation));
  };

  const pollLink = `/polls/${data.id}`;

  const isModalShown = showDeleteModal || showEditModal;
  const modalContent = <DeleteModal data={data} onClose={handleModalClose} />;

  return (
    <>
      <Modal onClose={undefined} isShown={isModalShown}>
        {modalContent}
      </Modal>
      <Card className={styles.card}>
        <div className={styles['title-container']}>
          <a href={pollLink} className={styles.link}>
            {data.title}
          </a>
          {!data.isPublished && <span className={styles.isActive}>(неактивна)</span>}
        </div>
        <div className={styles['tools-container']}>
          {!data.isPublished && (
            <IconButton onClick={handlePublishButtonClick}>
              <Checkmark24Filled primaryFill="#1784cc" />
            </IconButton>
          )}
          {data.isPublished && (
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
