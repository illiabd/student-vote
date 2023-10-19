/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Archive24Regular,
  Checkmark24Filled,
  Delete24Regular,
  Edit24Regular,
} from '@fluentui/react-icons';
import { useNavigate } from 'react-router-dom';
import { FC, useState } from 'react';

import { Card, IconButton, Modal } from '../../UI';
import { archiveVacancy, findVacancies, publishVacancy } from '../../../store/vacancies/actions';
import { useAppDispatch } from '../../../hooks';

import { VacancyCardProps } from './types';
import { DeleteModal } from './DeleteModal';
import styles from './Vacancy.module.scss';

export const VacancyCard: FC<VacancyCardProps> = ({ data }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleModalClose = () => {
    setShowDeleteModal(false);
    setShowEditModal(false);
  };

  const handleEditButtonClick = () => {
    navigate(`/vacancies/edit/${data.id}`);
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

  const vacancyLink = `/vacancies/${data.id}`;

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
          <IconButton>
            <Edit24Regular onClick={handleEditButtonClick} />
          </IconButton>
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
