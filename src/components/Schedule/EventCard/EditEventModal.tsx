import { FC, useCallback, useEffect, useState } from 'react';

import api from '../../../axios';
import { useAppDispatch } from '../../../hooks';
import { patchEvent } from '../../../store/schedule/actions';
import { ScheduleEvent } from '../../../store/schedule/types';
import { EventForm } from '../EventForm';
import { EventFormValues } from '../EventForm/types';
import styles from './EventCard.module.scss';
import { EditEventModalProps } from './types';

export const EditEventModal: FC<EditEventModalProps> = ({
  organisationId,
  eventId,
  onClose,
  onSubmit,
}) => {
  const [eventData, setEventData] = useState<ScheduleEvent>();
  const dispatch = useAppDispatch();

  const handleFormSubmission = async (values: EventFormValues) => {
    const repeat = {
      ...(values.frequency && { frequency: values.frequency }),
      ...(values.interval && { interval: values.interval }),
      ...(values.count && { count: values.count }),
    };
    const body = {
      ...values,
      ...(Object.keys(repeat).length > 0 && { repeat }),
    };
    await dispatch(patchEvent(eventId, body));
    onSubmit();
    onClose();
  };

  const fetchEventData = useCallback(async () => {
    const response = await api.get<ScheduleEvent>(`schedule/v1/events/${eventId}`);
    setEventData(response.data);
  }, [eventId]);

  useEffect(() => {
    fetchEventData();
  }, [fetchEventData]);

  // FIXME: rerender form
  if (!eventData) {
    return <div>Loading</div>;
  }

  return (
    <div className={styles['modal-container']}>
      <EventForm
        organisationId={organisationId}
        defaultValues={eventData}
        onSubmit={handleFormSubmission}
      />
    </div>
  );
};
