import { Add24Regular, ArrowLeft24Regular } from '@fluentui/react-icons';
import { useFormik } from 'formik';
import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '../../../axios';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { pollNameSchema } from '../../../schemas';
import { createQuestion } from '../../../store/polls/actions';
import { NewOption } from '../../../store/polls/types';
import { Button, Card, IconButton, Input } from '../../UI';
import { PollQuestionCard } from '../PollQuestionCard';
import styles from './PollForm.module.scss';
import { FormValues, PollFormProps } from './type';

export const PollForm: FC<PollFormProps> = ({ pollData }) => {
  const { selectedOrganisationId } = useAppSelector((state) => state.current);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const formik = useFormik<FormValues>({
    initialValues: { name: pollData?.name ?? '' },
    validationSchema: pollNameSchema,
    onSubmit: (values) => {
      if (!selectedOrganisationId) {
        return;
      }

      api.patch(`/vote/v1/polls/${pollData.id}`, { name: values.name });
    },
  });

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(e);
    formik.submitForm();
  };

  const handleBackButtonClick = () => {
    navigate('/polls');
  };

  const handleAddQuestionButtonClick = () => {
    const initialQuestion = {
      name: 'Питання 1',
      options: [
        {
          name: 'Відповідь 1',
        },
      ],
    };

    dispatch(createQuestion(pollData.id, initialQuestion));
  };

  const questionsComponents = pollData.questions.map((question) => {
    return (
      <PollQuestionCard
        key={question.id}
        pollId={pollData.id}
        questionId={question.id}
        defaultQuestion={question}
        // onChange={handleChange}
        // onDelete={handleDelete}
      />
    );
  });

  return (
    <div className={styles.container}>
      <IconButton onClick={handleBackButtonClick}>
        <ArrowLeft24Regular />
      </IconButton>

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
      </Card>

      <div className={styles.questions}>
        {questionsComponents.length > 0 && questionsComponents}
        <div className={styles.buttons}>
          <Button
            variant="outlined"
            endIcon={<Add24Regular />}
            onClick={handleAddQuestionButtonClick}
          >
            Додати питання
          </Button>
        </div>
      </div>
    </div>
  );
};
