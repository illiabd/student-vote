import {
  Checkmark24Filled,
  ClockRegular,
  Delete24Regular,
  Edit24Regular,
} from '@fluentui/react-icons';
import clsx from 'clsx';
import { FC, useState } from 'react';

import { useAppDispatch } from '../../../hooks';
import { findNews, publishArticle } from '../../../store/news/actions';
import { Button, Card, IconButton, Modal } from '../../UI';
import { TextEditor } from '../../UI/TextEditor';
import { DeleteArticleModal } from './DeleteArticleModal';
import { EditArticleModal } from './EditArticleModal';
import styles from './NewsCard.module.scss';
import { NewsCardProps } from './types';

export const NewsCard: FC<NewsCardProps> = ({ className, data }) => {
  const dispatch = useAppDispatch();
  const [showEditArticleModal, setShowEditArticleModal] = useState(false);
  const [showDeleteArticleModal, setShowDeleteArticleModal] = useState(false);

  const handleModalClose = () => {
    setShowDeleteArticleModal(false);
    setShowEditArticleModal(false);
  };

  const handlePublishButtonClick = async () => {
    if (!data.id) {
      return;
    }

    await dispatch(publishArticle(data.id));
    await dispatch(findNews({ organisation: data.organisation }));
  };

  const handleEditButtonClick = () => {
    setShowEditArticleModal(true);
  };

  const handleDeleteButtonClick = () => {
    setShowDeleteArticleModal(true);
  };

  const date = (
    <div className={styles.date}>
      <ClockRegular width={12} height={12} />
      {data.publicationDate
        ? new Date(data.publicationDate).toLocaleDateString()
        : new Date().toLocaleDateString()}
    </div>
  );

  const isModalShown = showDeleteArticleModal || showEditArticleModal;
  const modalContent = showDeleteArticleModal ? (
    <DeleteArticleModal data={data} onClose={handleModalClose} />
  ) : (
    <EditArticleModal data={data} onClose={handleModalClose} />
  );

  // const badges = data.tags.map((tag) => <NewsBadge content={tag} />);
  const title = `${data.title} ${!data.isPublished ? '(Не опубліковано)' : ''}`;
  const titleClasses = clsx(styles.title, !data.isPublished && styles['not-published']);
  const cardClasses = clsx(className);

  return (
    <>
      <Modal onClose={handleModalClose} isShown={isModalShown}>
        {modalContent}
      </Modal>
      <Card className={cardClasses}>
        {/* <div className={styles['image-container']}>
          <Image
            src={data.imageUrl || '/mock-image.png'}
            alt="news-image"
            width={753}
            height={115}
          />
        </div> */}
        <div className={styles.content}>
          <div className={styles.header}>
            <p className={titleClasses}>{title}</p>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              {!data.isPublished && (
                <Button
                  size="sm"
                  variant="text"
                  onClick={handlePublishButtonClick}
                  endIcon={<Checkmark24Filled />}
                >
                  Опублікувати
                </Button>
              )}
              <IconButton>
                <Edit24Regular fill="#1784CC" onClick={handleEditButtonClick} />
              </IconButton>
              <IconButton>
                <Delete24Regular fill="#1784CC" onClick={handleDeleteButtonClick} />
              </IconButton>
            </div>
          </div>
          <TextEditor editable={false} defaultContentHTML={data?.text} />
          <div className={styles.info}>
            {date}
            {/* <div className={styles['badge-container']}>{badges}</div> */}
          </div>
        </div>
      </Card>
    </>
  );
};
