import { Archive24Regular, Checkmark24Filled } from '@fluentui/react-icons';
import clsx from 'clsx';
import { FC, useState } from 'react';
import { Link } from 'react-router-dom';

import { PollStatusNames } from '../../../constants';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { closePoll, findPolls, publishPoll } from '../../../store/polls/actions';
import { PollStatus } from '../../../store/polls/types';
import { Button, Card, Modal } from '../../UI';
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

  // const handleDeleteButtonClick = () => {
  //   setShowDeleteModal(true);
  // };

  const handlePublishButtonClick = async () => {
    await dispatch(publishPoll(data.id));

    if (!selectedOrganisationId) {
      return;
    }

    await dispatch(findPolls(selectedOrganisationId));
  };

  const handleArchiveButtonClick = async () => {
    await dispatch(closePoll(data.id));

    if (!selectedOrganisationId) {
      return;
    }

    await dispatch(findPolls(selectedOrganisationId));
  };

  const pollLink = `/polls/${data.id}`;

  const isModalShown = showDeleteModal || showEditModal;
  const modalContent = <DeleteModal data={data} onClose={handleModalClose} />;

  const status = PollStatusNames[data.status as keyof typeof PollStatus];
  const statusClasses = clsx(styles['poll-status'], styles[data.status]);

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

          <div className={statusClasses}>{status}</div>
        </div>

        <div className={styles['tools-container']}>
          {data.status === PollStatus.created && (
            <Button
              variant="outlined"
              onClick={handlePublishButtonClick}
              endIcon={<Checkmark24Filled />}
            >
              Розпочати
            </Button>
          )}

          {data.status === PollStatus.open && (
            <Button important onClick={handleArchiveButtonClick} endIcon={<Archive24Regular />}>
              Завершити
            </Button>
          )}

          {/* <IconButton>
            <Delete24Regular onClick={handleDeleteButtonClick} />
          </IconButton> */}
        </div>
      </Card>
    </>
  );
};
