import { FC } from 'react';
import dayjs from 'dayjs';

import { EventForm } from '../EventForm';
import { AddEventModalProps } from './types';
import { useAppDispatch } from '../../../hooks';
import { createEvent } from '../../../store/schedule/actions';

import styles from './ScheduleView.module.scss';
import { EventFormValues } from '../EventForm/types';

export const AddEventModal: FC<AddEventModalProps> = ({ organisationId, onClose, onSubmit }) => {
  const dispatch = useAppDispatch();

  const handleFormSubmission = async (formValues: EventFormValues) => {
    const { count, interval, frequency, ...values } = formValues;
    const body = {
      ...values,
      repeat: {
        timezone: dayjs.tz.guess(),
        count: formValues?.count,
        interval: formValues?.interval,
        frequency: Number(formValues?.frequency),
      },
    };
    await dispatch(createEvent(body));
    onSubmit();
    onClose();
  };

  return (
    <div className={styles['modal-container']}>
      <EventForm organisationId={organisationId} onSubmit={handleFormSubmission} />
    </div>
  );
};
