import 'dayjs/plugin/isToday';

import {
  Add24Regular,
  CalendarToday24Regular,
  ChevronLeft24Regular,
  ChevronRight24Regular,
  DocumentAdd24Regular,
} from '@fluentui/react-icons';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';

import api from '../../../axios';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { FindGroupsResponse, Group } from '../../../store/current/types';
import { findEvents } from '../../../store/schedule/actions';
import { scheduleActions } from '../../../store/schedule/slice';
import { ScheduleEvent } from '../../../store/schedule/types';
import { Button, Card, Dropdown, IconButton, Modal } from '../../UI';
import type { Option } from '../../UI/Dropdown/types';
import { EventCard } from '../EventCard';
import { AddEventModal } from './AddEventModal';
import styles from './ScheduleView.module.scss';
import { UploadFileModal } from './UploadFileModal';

const getTransformedEvents = (events: ScheduleEvent[] | undefined) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const transformedDocs: any = {};

  if (!events) {
    return undefined;
  }

  events?.forEach((item) => {
    const startDate = dayjs(item.start).format('YYYY-MM-DD');
    const hasProperty = Array.isArray(transformedDocs[startDate]);

    if (hasProperty) {
      transformedDocs[startDate].push(item);
      return;
    }

    transformedDocs[startDate] = [item] as ScheduleEvent[];
  });

  return transformedDocs;
};

const getStartOfWeek = () => {
  const startOfWeek = dayjs().startOf('week');
  return startOfWeek;
};

export const ScheduleView: FC = () => {
  const [weekStartDate, setWeekStartDate] = useState(getStartOfWeek());
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [showUploadFileModal, setShowUploadFileModal] = useState(false);

  const [groupNameFilter, setGroupNameFilter] = useState('');

  const [groups, setGroups] = useState<Group[]>();

  const { scheduleData, selectedDivision } = useAppSelector((state) => state.schedule);
  const { selectedOrganisationId } = useAppSelector((state) => state.current);

  const transformedEvents = useMemo(() => getTransformedEvents(scheduleData?.docs), [scheduleData]);

  const dispatch = useAppDispatch();

  const findEventsWithParams = useCallback(() => {
    const fromDate = weekStartDate?.subtract(1, 'week').toISOString();
    const tillDate = weekStartDate?.add(1, 'week').toISOString();
    const isDivisionSelected = selectedDivision && selectedDivision?.length > 0;

    dispatch(
      findEvents({
        division: isDivisionSelected ? selectedDivision : undefined,
        organisation: selectedOrganisationId,
        from: fromDate,
        till: tillDate,
        limit: 50,
      }),
    );
  }, [dispatch, selectedDivision, selectedOrganisationId, weekStartDate]);

  const findGroups = useCallback(
    async (name: string) => {
      const body = {
        filters: {
          organisation: selectedOrganisationId,
          name,
        },
        fields: ['name', 'users'],
      };

      try {
        const response = await api.post<FindGroupsResponse>('organisation/group/v1/find', body);
        const groupDocs = response.data.data.docs;

        if (!groupDocs) {
          setGroups([]);
          return;
        }

        setGroups(response.data.data.docs);
      } catch (e) {
        console.warn(e);
      }
    },
    [selectedOrganisationId],
  );

  useEffect(() => {
    findGroups(groupNameFilter);
  }, [findGroups, groupNameFilter]);

  useEffect(() => {
    findEventsWithParams();
  }, [findEventsWithParams]);

  const handleNextWeekButtonClick = () => {
    setWeekStartDate((prev) => {
      const prevValue = prev.clone();
      const nextWeekStartDate = prevValue.add(1, 'week');
      return nextWeekStartDate;
    });
  };

  const handlePrevWeekButtonClick = () => {
    setWeekStartDate((prev) => {
      const prevValue = prev.clone();
      const prevWeekStartDate = prevValue.subtract(1, 'week');
      return prevWeekStartDate;
    });
  };

  const handleTodayButtonClick = () => {
    setWeekStartDate((prev) => {
      const weekStart = getStartOfWeek();
      if (prev.isSame(weekStart)) {
        return prev;
      }

      return weekStart;
    });
  };

  const handleModalClose = () => {
    setShowAddEventModal(false);
    setShowUploadFileModal(false);
  };

  const handleCreateEventButtonClick = () => {
    setShowAddEventModal(true);
  };

  const handleUploadFileButtonClick = () => {
    setShowUploadFileModal(true);
  };

  const handleDivisionDropdownChange = (value: Option | Option[]) => {
    const option = value as Option;
    if (!option) {
      dispatch(scheduleActions.setSelectedDivision(''));
      return;
    }

    dispatch(scheduleActions.setSelectedDivision(option.value));
  };

  const handleDivisionDropdownInputChange = (value: string) => {
    setGroupNameFilter(value);
  };

  const weekDays = dayjs
    .weekdaysMin(true)
    .slice(0, -1)
    .map((item, index) => {
      const date = weekStartDate.add(index, 'day').get('date');

      const isCurrentWeek = dayjs().isBetween(
        weekStartDate.startOf('week'),
        weekStartDate.endOf('week'),
      );

      const isToday = isCurrentWeek && dayjs().get('date') === date;

      return (
        <div className={clsx(styles['header-item'], isToday && styles.today)} key={date}>
          <span>{`${item} `}</span>
          <span>{date}</span>
        </div>
      );
    });

  const days = weekDays.map((label, index) => {
    const dayDateString = weekStartDate.add(index, 'day').format('YYYY-MM-DD');

    if (!transformedEvents) {
      return <div key={dayDateString}>{label}</div>;
    }

    const dayEvents = transformedEvents[dayDateString];

    if (!dayEvents) {
      return <div key={dayDateString}>{label}</div>;
    }

    const eventCards = dayEvents.map((item: ScheduleEvent) => {
      if (!item) {
        return undefined;
      }

      return <EventCard key={item?.id} scheduleEvent={item} onSubmit={findEventsWithParams} />;
    });

    return (
      <div className={styles['day-column']} key={Math.random()}>
        {label}
        {eventCards}
      </div>
    );
  });

  const divisionsOptions = groups?.map<Option>((data) => ({
    label: data.name,
    value: data.id,
  }));

  const isModalShown = showAddEventModal || showUploadFileModal;
  const modalTitle = showAddEventModal ? 'Нова подія' : 'Завантажуємо розклад';
  const modalContent = showAddEventModal ? (
    <AddEventModal
      organisationId={selectedOrganisationId as string}
      onClose={handleModalClose}
      onSubmit={findEventsWithParams}
    />
  ) : (
    <UploadFileModal
      organisationId={selectedOrganisationId as string}
      weekDate={weekStartDate.add(3, 'days').toISOString()}
      onClose={handleModalClose}
    />
  );

  return (
    <>
      <Modal onClose={handleModalClose} isShown={isModalShown} title={modalTitle}>
        {modalContent}
      </Modal>
      <Card className={styles.card}>
        <div className={styles.header}>
          <div className={styles['controls-container']}>
            <IconButton onClick={handlePrevWeekButtonClick}>
              <ChevronLeft24Regular />
            </IconButton>
            {dayjs.months()[weekStartDate.get('month')]}
            <IconButton onClick={handleNextWeekButtonClick}>
              <ChevronRight24Regular />
            </IconButton>
            <IconButton onClick={handleTodayButtonClick}>
              <CalendarToday24Regular />
            </IconButton>

            <Button
              endIcon={<DocumentAdd24Regular />}
              size="sm"
              variant="text"
              onClick={handleUploadFileButtonClick}
            >
              Завантажити файл
            </Button>

            <Button
              endIcon={<Add24Regular />}
              size="sm"
              variant="text"
              onClick={handleCreateEventButtonClick}
            >
              Створити подію
            </Button>
          </div>

          <div className={styles['tools-container']}>
            <Dropdown
              placeholder="Введіть назву групи"
              options={divisionsOptions ?? []}
              defaultValue={[]}
              onChange={handleDivisionDropdownChange}
              onInputChange={handleDivisionDropdownInputChange}
              noLabel
            />
          </div>
        </div>

        <div className={clsx(styles.content)}>{days}</div>
      </Card>
    </>
  );
};
