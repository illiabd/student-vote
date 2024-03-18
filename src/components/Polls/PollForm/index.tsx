import { Add24Regular, ArrowLeft24Regular } from '@fluentui/react-icons';
import { useFormik } from 'formik';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '../../../axios';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { pollNameSchema } from '../../../schemas';
import { createQuestion, updatePollData } from '../../../store/polls/actions';
import { PollStatus } from '../../../store/polls/types';
import { Button, Card, Dropdown, IconButton, Input } from '../../UI';
import { Option } from '../../UI/Dropdown/types';
import { PollQuestionCard } from '../PollQuestionCard';
import styles from './PollForm.module.scss';
import { FormValues, GetUniversityResponse, PollFormProps } from './type';

export const PollForm: FC<PollFormProps> = ({ pollData, fetchPollData }) => {
  const [faculties, setFaculties] = useState<string[]>([]);
  const { selectedOrganisationId } = useAppSelector((state) => state.current);
  const { isLoading } = useAppSelector((state) => state.polls);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isPollStarted = pollData?.status !== PollStatus.created;

  const formik = useFormik<FormValues>({
    initialValues: { name: pollData?.name ?? '', facultyNames: pollData?.facultyNames },
    validationSchema: pollNameSchema,
    onSubmit: (values) => {
      if (!selectedOrganisationId) {
        return;
      }

      if (isPollStarted) {
        return;
      }

      dispatch(updatePollData(pollData.id, values.name, values.facultyNames));
    },
  });

  const getFaculties = useCallback(async () => {
    const response = await api.get<GetUniversityResponse>(
      `/university/v1/${selectedOrganisationId}`,
    );
    setFaculties(response?.data?.data?.university?.faculties ?? []);
  }, [selectedOrganisationId]);

  useEffect(() => {
    getFaculties();
  }, [getFaculties]);

  const handleFacultyDropdownChange = async (value: Option | Option[]) => {
    const options = value as Option[];
    const isFacultySelected = options?.length > 0;
    const values = options.map((option) => option.value);
    await formik.setFieldValue('facultyNames', isFacultySelected ? values : undefined);
    await formik.submitForm();
  };

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(e);
    formik.submitForm();
  };

  const handleBackButtonClick = () => {
    navigate('/polls');
  };

  const handleAddQuestionButtonClick = async () => {
    const initialQuestion = {
      name: 'Нове питання',
      options: [
        {
          name: 'Нова відповідь',
        },
      ],
      isSingleChoice: true,
      minOptions: null,
      maxOptions: null,
    };

    await dispatch(createQuestion(pollData.id, initialQuestion));
    await fetchPollData();
  };

  const facultiesOptions = faculties?.map<Option>((faculty) => ({
    label: faculty,
    value: faculty,
  }));

  const questionsComponents = pollData.questions.map((question) => {
    return (
      <PollQuestionCard
        key={question.id}
        pollId={pollData.id}
        questionId={question.id}
        defaultQuestion={question}
        fetchPollData={fetchPollData}
        disabled={isPollStarted}
      />
    );
  });

  return (
    <div className={styles.container}>
      <IconButton onClick={handleBackButtonClick}>
        <ArrowLeft24Regular />
      </IconButton>

      <div className={styles.questions}>
        <Card className={styles['name-card']}>
          <Input
            id="name"
            type="text"
            label="Назва голосування"
            value={formik.values.name}
            errors={formik.errors.name}
            touched={formik.touched.name}
            disabled={isPollStarted}
            onChange={formik.handleChange}
            onBlur={handleBlur}
          />

          <Dropdown
            id="facultyName"
            label="Факультет (опціонально)"
            placeholder=""
            defaultValue={facultiesOptions}
            options={facultiesOptions}
            onChange={handleFacultyDropdownChange}
            disabled={isPollStarted}
            errors={formik.errors.facultyNames}
            creatable
            touched
            multi
          />
        </Card>

        {questionsComponents.length > 0 && questionsComponents}

        <div className={styles.buttons}>
          <Button
            variant="outlined"
            endIcon={<Add24Regular />}
            onClick={handleAddQuestionButtonClick}
            loading={isLoading}
            disabled={isPollStarted}
          >
            Додати питання
          </Button>
        </div>
      </div>
    </div>
  );
};
