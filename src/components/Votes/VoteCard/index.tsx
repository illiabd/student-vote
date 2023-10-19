import { Archive24Regular, Checkmark24Filled, Delete24Regular } from '@fluentui/react-icons';
import { FC, useState } from 'react';

import { Card, IconButton, Modal } from '../../UI';
import { archiveVacancy, findVacancies, publishVacancy } from '../../../store/vacancies/actions';
import { useAppDispatch } from '../../../hooks';

import { VoteCardProps } from './types';
import { DeleteModal } from './DeleteModal';
import styles from './VoteCard.module.scss';

export const VoteCard: FC<VoteCardProps> = ({ data }) => {
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
    await dispatch(publishVacancy(data.id));
    await dispatch(findVacancies({ organisation: data.organisation }));
  };

  const handleArchiveButtonClick = async () => {
    await dispatch(archiveVacancy(data.id));
    await dispatch(findVacancies({ organisation: data.organisation }));
  };

  const vacancyLink = `/votes/${data.id}`;

  const isModalShown = showDeleteModal || showEditModal;
  const modalContent = <DeleteModal data={data} onClose={handleModalClose} />;

  return (
    <>
      <Modal onClose={undefined} isShown={isModalShown}>
        {modalContent}
      </Modal>
      <Card className={styles.card}>
        <div className={styles['title-container']}>
          <a href={vacancyLink} className={styles.link}>
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
