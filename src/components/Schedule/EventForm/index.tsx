import dayjs from 'dayjs';
import { FormikProps, useFormik } from 'formik';
import { ChangeEvent, FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Frequency } from 'rrule';

import api from '../../../axios';
import { EventFrequencyLabels, EventKind, EventKindNames } from '../../../constants';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { createEventSchema } from '../../../schemas/create-event-schema';
import { FindGroupsResponse, Group } from '../../../store/current/types';
import { deleteEvent, findEvents } from '../../../store/schedule/actions';
import { Button, Dropdown, Input } from '../../UI';
import type { Option } from '../../UI/Dropdown/types';
import styles from './EventForm.module.scss';
import { EventFormProps, EventFormValues } from './types';

export const EventForm: FC<EventFormProps> = ({ onSubmit, defaultValues }) => {
  const { selectedOrganisationId } = useAppSelector((state) => state.current);
  const [groups, setGroups] = useState<Group[]>();
  const [groupNameFilter, setGroupNameFilter] = useState('');

  const defaultStartDate = dayjs(defaultValues?.start);
  const defaultEndDate = dayjs(defaultValues?.end);

  const findGroups = useCallback(
    async (name?: string) => {
      const body = {
        filters: {
          name,
          organisation: selectedOrganisationId,
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
        console.log(e);
      }
    },
    [selectedOrganisationId],
  );

  useEffect(() => {
    findGroups(groupNameFilter);
  }, [findGroups, groupNameFilter]);

  const defaultDivisions = defaultValues?.divisions?.reduce<string[]>((array, divisions) => {
    if (divisions.id) {
      array.push(divisions.id);
    }
    return array;
  }, []);

  const initialValues: EventFormValues = {
    title: defaultValues?.title,
    link: defaultValues?.link,
    kind: defaultValues?.kind,
    mainLecturerFullName: defaultValues?.mainLecturerFullName,
    classroomName: defaultValues?.classroomName,
    date: defaultStartDate.format('YYYY-MM-DD'),
    start: defaultValues?.start ? defaultStartDate?.format('HH:mm') : undefined,
    end: defaultValues?.end ? defaultEndDate?.format('HH:mm') : undefined,
    interval: defaultValues?.repeatGroup?.rrule?.interval,
    count: defaultValues?.repeatGroup?.rrule?.count,
    frequency: defaultValues?.repeatGroup?.rrule?.freq,
    divisions: defaultDivisions && defaultDivisions.length > 0 ? defaultDivisions : [],
  };

  const formik: FormikProps<EventFormValues> = useFormik<EventFormValues>({
    initialValues,
    validationSchema: createEventSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const {
        title,
        link,
        kind,
        start,
        end,
        date,
        mainLecturerFullName,
        classroomName,
        interval,
        count,
        frequency,
      } = values;
      const [startHours, startMinutes] = start?.split(':') ?? ['0', '0'];
      const startDate = dayjs(date).set('hour', +startHours).set('minute', +startMinutes);

      const [endHours, endMinutes] = end?.split(':') ?? ['0', '0'];
      const endDate = dayjs(date).set('hour', +endHours).set('minute', +endMinutes);

      const body = defaultValues
        ? {
            divisions: values.divisions,

            ...(defaultValues?.title !== title && { title }),
            ...(defaultValues?.link !== link && { link }),
            ...(defaultValues?.kind !== kind && { kind }),
            ...(defaultValues?.mainLecturerFullName !== mainLecturerFullName && {
              mainLecturerFullName,
            }),
            ...(defaultValues?.start !== startDate.toISOString() && {
              start: startDate.toISOString(),
            }),
            ...(defaultValues?.end !== endDate.toISOString() && { end: endDate.toISOString() }),
            ...(defaultValues?.classroomName !== classroomName && { classroomName }),

            repeat: {
              ...(defaultValues.repeatGroup?.rrule &&
                defaultValues.repeatGroup.rrule.interval !== Number(interval) && {
                  interval: Number(interval),
                }),
              ...(defaultValues.repeatGroup?.rrule &&
                defaultValues?.repeatGroup.rrule.count !== Number(count) && {
                  count: Number(count),
                }),
              ...(defaultValues.repeatGroup?.rrule &&
                defaultValues?.repeatGroup.rrule.freq !== Number(frequency) && {
                  frequency: Number(frequency),
                }),
            },
          }
        : {
            ...values,
            mainLecturerFullName: values?.mainLecturerFullName,
            organisation: selectedOrganisationId,
            start: startDate.toISOString(),
            end: endDate.toISOString(),
            repeat: {
              interval: Number(interval),
              count: Number(count),
              frequency: Number(frequency),
            },
          };

      onSubmit(body);
    },
  });

  const handleDivisionDropdownChange = async (value: Option[] | Option) => {
    const isOptionArray = Array.isArray(value);
    if (!isOptionArray) {
      return;
    }

    formik.setFieldValue(
      'divisions',
      value.reduce<string[]>((array, option) => {
        if (option) {
          array.push(option.value);
        }
        return array;
      }, []),
    );
  };

  const handleFrequencyDropdownChange = (option: Option | Option[]) => {
    const isOption = option instanceof Option;
    if (!option || !isOption) {
      return;
    }

    formik.setFieldValue('frequency', option.value);
  };

  const handleDivisionDropdownInputChange = (value: string) => {
    if (!value) {
      return;
    }

    setGroupNameFilter(value);
  };

  const handleKindDropdownChange = (value: Option | Option[]) => {
    const isOption = value instanceof Option;
    if (!value || !isOption) {
      return;
    }

    formik.setFieldValue('kind', value.value);
  };

  const handleStartTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    formik.setFieldValue('start', value);

    const [hours, minutes] = value.split(':');
    const date = dayjs()
      .set('hours', +hours)
      .set('minutes', +minutes + 90);

    formik.setFieldValue('end', date.format('HH:mm'));
  };

  const dispatch = useAppDispatch();

  const handleDeleteButtonClick = async () => {
    if (!defaultValues?.id) {
      return;
    }
    await dispatch(deleteEvent(defaultValues?.id));
    await dispatch(findEvents({ organisation: selectedOrganisationId }));
  };

  const divisionsOptions = groups?.map<Option>((data) => ({
    label: data.name,
    value: data.id,
  }));

  const defaultSelectedDivisions = defaultValues?.divisions?.map<Option>((item) => ({
    label: item.name,
    value: item.id ?? '',
  }));

  const defaultDivisionOptions = useMemo(() => {
    if (!divisionsOptions) {
      return [];
    }

    const options = [...divisionsOptions];

    if (!defaultSelectedDivisions) {
      return options;
    }

    options.unshift(...defaultSelectedDivisions);
    return options;
  }, [defaultSelectedDivisions, divisionsOptions]);

  const kindOptions: Option[] = useMemo(
    () => [
      { label: EventKindNames.exam, value: EventKind.exam },
      { label: EventKindNames.lecture, value: EventKind.lecture },
      { label: EventKindNames.practice, value: EventKind.practice },
      { label: EventKindNames.lab, value: EventKind.lab },
    ],
    [],
  );
  const defaultKindOption = kindOptions.find((option) => {
    if (!defaultValues) {
      return;
    }
    return option.value === defaultValues.kind;
  });

  const frequencyOption = [
    { label: EventFrequencyLabels.DAILY, value: Frequency.DAILY.toString() },
    { label: EventFrequencyLabels.WEEKLY, value: Frequency.WEEKLY.toString() },
  ];

  const submitButtonText = defaultValues ? 'Зберегти' : 'Створити';

  return (
    <div className={styles.container}>
      <form onSubmit={formik.handleSubmit} className={styles['form-container']}>
        <div className={styles['input-block']}>
          <Dropdown
            id="divisions"
            label="Оберіть групу"
            placeholder="Введіть назву групи"
            options={defaultDivisionOptions}
            defaultValue={defaultSelectedDivisions}
            onInputChange={handleDivisionDropdownInputChange}
            onChange={handleDivisionDropdownChange}
            touched
            errors={formik.errors.divisions}
            multi
          />

          <Dropdown
            id="kind"
            label="Тип"
            placeholder="Пара/Екзамен"
            defaultValue={defaultKindOption}
            options={kindOptions}
            onChange={handleKindDropdownChange}
            touched
            errors={formik.errors.kind}
          />
        </div>

        <div className={styles['input-block']}>
          <Input
            id="title"
            type="text"
            label="Назва"
            placeholder="Дискретна математика"
            value={formik.values.title}
            touched={formik.touched.title}
            onChange={formik.handleChange}
            errors={formik.errors.title}
          />

          <Input
            id="mainLecturerFullName"
            type="text"
            label="Викладач"
            placeholder="Дія Н.В."
            value={formik.values.mainLecturerFullName}
            touched={formik.touched.mainLecturerFullName}
            onChange={formik.handleChange}
            errors={formik.errors.mainLecturerFullName}
          />
        </div>

        <div className={styles['input-block']}>
          <Input
            id="classroomName"
            type="text"
            label="Аудиторія"
            placeholder="411Ф"
            value={formik.values.classroomName}
            touched={formik.touched.classroomName}
            onChange={formik.handleChange}
            errors={formik.errors.classroomName}
          />

          <Input
            id="link"
            type="text"
            label="Посилання"
            placeholder="meet.google.com/meeting/Gf1Jku"
            value={formik.values.link}
            touched={formik.touched.link}
            onChange={formik.handleChange}
            errors={formik.errors.link}
          />
        </div>

        <div className={styles['input-block']}>
          <Input
            id="date"
            type="date"
            label="Дата"
            placeholder=""
            value={formik.values.date}
            touched={formik.touched.date}
            onChange={formik.handleChange}
            errors={formik.errors.date}
          />

          <Input
            id="start"
            type="time"
            label="Початок"
            placeholder=""
            value={formik.values.start}
            touched={formik.touched.start}
            onChange={handleStartTimeChange}
            errors={formik.errors.start}
          />

          <Input
            id="end"
            type="time"
            label="Кінець"
            placeholder=""
            value={formik.values.end}
            touched={formik.touched.end}
            onChange={formik.handleChange}
            errors={formik.errors.end}
          />
        </div>

        <div className={styles['input-block']}>
          <Input
            id="interval"
            type="number"
            label="Кожні"
            placeholder=""
            value={formik.values?.interval?.toString()}
            touched={formik.touched.interval}
            onChange={formik.handleChange}
            errors={formik.errors.interval}
          />

          <Dropdown
            id="frequency"
            label="Частота"
            placeholder=""
            options={frequencyOption}
            defaultValue={frequencyOption.find((item) => {
              const defaultFrequency = defaultValues?.repeatGroup?.rrule?.freq.toString();
              return item?.value.toString() === defaultFrequency;
            })}
            onChange={handleFrequencyDropdownChange}
            touched
            errors={formik.errors.frequency}
          />

          <Input
            id="count"
            type="number"
            label="Кількість повторень"
            placeholder=""
            value={formik.values?.count?.toString()}
            touched={formik.touched.count}
            onChange={formik.handleChange}
            errors={formik.errors.count}
          />
        </div>

        <div className={styles['button-container']}>
          <Button
            type="submit"
            size="md"
            className={styles.button}
            disabled={defaultValues && !formik.dirty}
          >
            {submitButtonText}
          </Button>

          {defaultValues && (
            <Button size="md" onClick={handleDeleteButtonClick} className={styles.button}>
              Видалити
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};
