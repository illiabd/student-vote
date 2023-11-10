import dayjs from 'dayjs';
import { FC, useState } from 'react';

import { EventKindNames } from '../../../constants';
import { useAppSelector } from '../../../hooks';
import { Card, Modal } from '../../UI';
import { EditEventModal } from './EditEventModal';
import styles from './EventCard.module.scss';
import { EventCardProps } from './types';

export const EventCard: FC<EventCardProps> = ({ scheduleEvent, onSubmit }) => {
  const [showEditEventModal, setShowEditEventModal] = useState(false);

  const { selectedOrganisationId } = useAppSelector((state) => state.current);

  const handleCardClick = () => {
    setShowEditEventModal(true);
  };

  const handleModalClose = () => {
    setShowEditEventModal(false);
  };

  const cardStartEndTime = `${dayjs(scheduleEvent?.start).format('HH:mm')} - ${dayjs(
    scheduleEvent?.end,
  ).format('HH:mm')}`;

  return (
    <>
      <Modal onClose={handleModalClose} isShown={showEditEventModal} title="Додати подію">
        {showEditEventModal && (
          <EditEventModal
            organisationId={selectedOrganisationId as string}
            onClose={handleModalClose}
            eventId={scheduleEvent.id}
            onSubmit={onSubmit}
          />
        )}
      </Modal>

      <Card className={styles.card} onClick={handleCardClick}>
        <div className={styles.info}>
          <div className={styles.header}>
            <span>
              <b>{scheduleEvent?.title}</b>
            </span>
          </div>
          <span>{scheduleEvent?.mainLecturerFullName}</span>

          <span>{EventKindNames[scheduleEvent.kind as keyof typeof EventKindNames]}</span>
          <span>{cardStartEndTime}</span>
        </div>
      </Card>
    </>
  );
};