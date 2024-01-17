import { Add24Regular, ArrowLeft24Regular } from '@fluentui/react-icons';
import { useFormik } from 'formik';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '../../../axios';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { pollNameSchema } from '../../../schemas';
import { createQuestion, updatePollData } from '../../../store/polls/actions';
import { Button, Card, Dropdown, IconButton, Input } from '../../UI';
import { Option } from '../../UI/Dropdown/types';
import { PollQuestionCard } from '../PollQuestionCard';
import styles from './PollForm.module.scss';
import { FormValues, PollFormProps } from './type';

type University = {
  data: {
    university: {
      id: string;
      name: string;
      shortName: string;
      roles: [];
      faculties: string[];
      kind: string;
    };
  };
};

export const PollForm: FC<PollFormProps> = ({ pollData, fetchPollData }) => {
  const [faculties, setFaculties] = useState<string[]>([]);
  const { selectedOrganisationId } = useAppSelector((state) => state.current);
  const { isLoading } = useAppSelector((state) => state.polls);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const formik = useFormik<FormValues>({
    initialValues: { name: pollData?.name ?? '', facultyName: pollData?.facultyName },
    validationSchema: pollNameSchema,
    onSubmit: (values) => {
      if (!selectedOrganisationId) {
        return;
      }
      dispatch(updatePollData(pollData.id, values.name, values.facultyName));
    },
  });

  const getFaculties = useCallback(async () => {
    const response = await api.get<University>(`/university/v1/${selectedOrganisationId}`);
    setFaculties(response?.data?.data?.university?.faculties ?? []);
  }, [selectedOrganisationId]);

  useEffect(() => {
    getFaculties();
  }, [getFaculties]);

  const handleFacultyDropdownChange = async (value: Option | Option[]) => {
    const option = value as Option;
    const isFacultySelected = option?.value.length > 0;
    await formik.setFieldValue('facultyName', isFacultySelected ? option.value : undefined);
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
            value={formik.values.name}
            errors={formik.errors.name}
            touched={formik.touched.name}
            onChange={formik.handleChange}
            onBlur={handleBlur}
            label="Назва голосування"
          />

          <Dropdown
            id="facultyName"
            label="Факультет (опціонально)"
            placeholder=""
            defaultValue={{ value: pollData.facultyName, label: pollData.facultyName } as Option}
            options={facultiesOptions}
            onChange={handleFacultyDropdownChange}
            touched
            errors={formik.errors.facultyName}
          />
        </Card>

        {questionsComponents.length > 0 && questionsComponents}

        <div className={styles.buttons}>
          <Button
            variant="outlined"
            endIcon={<Add24Regular />}
            onClick={handleAddQuestionButtonClick}
            loading={isLoading}
          >
            Додати питання
          </Button>
        </div>
      </div>
    </div>
  );
};
