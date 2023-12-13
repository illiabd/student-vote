import { Add24Regular, ArrowLeft24Regular } from '@fluentui/react-icons';
import { useFormik } from 'formik';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { pollNameSchema } from '../../../schemas';
import { createQuestion, updatePollName } from '../../../store/polls/actions';
import { Button, Card, IconButton, Input } from '../../UI';
import { PollQuestionCard } from '../PollQuestionCard';
import styles from './PollForm.module.scss';
import { FormValues, PollFormProps } from './type';

export const PollForm: FC<PollFormProps> = ({ pollData, fetchPollData }) => {
  const { selectedOrganisationId } = useAppSelector((state) => state.current);
  const { isLoading } = useAppSelector((state) => state.polls);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const formik = useFormik<FormValues>({
    initialValues: { name: pollData?.name ?? '' },
    validationSchema: pollNameSchema,
    onSubmit: (values) => {
      if (!selectedOrganisationId) {
        return;
      }

      dispatch(updatePollName(pollData.id, values.name));
    },
  });

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
