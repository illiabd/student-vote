import { Add24Regular, ArrowLeft24Regular, Checkmark24Regular } from '@fluentui/react-icons';
import { useFormik } from 'formik';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { createPoll } from '../../../store/polls/actions';
import { NewOption } from '../../../store/polls/types';
import { Button, IconButton, Input } from '../../UI';
import { PollQuestionCard } from '../PollQuestionCard';
import styles from './CreatePollPage.module.scss';
import { CreateQuestion, FormValues } from './type';

export const CreatePollPage: FC = () => {
  const [pollQuestionMap, setPollQuestionMap] = useState<Map<string, CreateQuestion>>(new Map());
  const { selectedOrganisationId } = useAppSelector((state) => state.current);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const formik = useFormik<FormValues>({
    initialValues: { name: '' },
    validationSchema: '',
    onSubmit: (values) => {
      if (!selectedOrganisationId) {
        return;
      }

      const questionsMapValues = Array.from(pollQuestionMap.values());

      const questions = questionsMapValues.map((value) => {
        return {
          name: value.name,
          options: value.options,
        };
      });

      const body = {
        name: values.name,
        organisationId: selectedOrganisationId,
        questions,
      };

      dispatch(createPoll(body));
    },
  });

  const handleBackButtonClick = () => {
    navigate('/polls');
  };

  const handleAddQuestionButtonClick = () => {
    setPollQuestionMap((prev) => {
      const prevCopy = new Map(prev);
      const newId = uuidv4();
      const initialQuestion = {
        questionId: newId,
        name: '',
        options: [] as NewOption[],
      };

      prevCopy.set(newId, initialQuestion);

      return prevCopy;
    });
  };

  const handleCreatePollButtonCLick = () => {
    formik.submitForm();
  };

  const questionsMapValues = Array.from(pollQuestionMap.values());
  const questionsComponents = questionsMapValues.map((question) => {
    const handleChange = (id: string, value: CreateQuestion) => {
      setPollQuestionMap((prev) => {
        const prevCopy = new Map(prev);
        prevCopy.set(id, value);
        console.log(prevCopy);
        return prevCopy;
      });
    };

    const handleDelete = (id: string) => {
      setPollQuestionMap((prev) => {
        const prevCopy = new Map(prev);
        prevCopy.delete(id);
        return prevCopy;
      });
    };

    return (
      <PollQuestionCard
        key={question.questionId}
        questionId={question.questionId}
        onChange={handleChange}
        onDelete={handleDelete}
      />
    );
  });

  return (
    <div className={styles.container}>
      <IconButton onClick={handleBackButtonClick}>
        <ArrowLeft24Regular />
      </IconButton>

      <div className={styles.name}>
        <Input
          id="name"
          type="text"
          noLabel
          value={formik.values.name}
          errors={formik.errors.name}
          touched={formik.touched.name}
          onChange={formik.handleChange}
          placeholder="Назва голосування"
          onKeyDown={(e) => {
            e.key === 'Enter' && e.preventDefault();
          }}
        />
      </div>

      <div className={styles.questions}>
        {questionsComponents.length > 0 && questionsComponents}
        <div className={styles.buttons}>
          <Button
            variant="outlined"
            startIcon={<Add24Regular />}
            onClick={handleAddQuestionButtonClick}
          >
            Додати питання
          </Button>

          <Button onClick={handleCreatePollButtonCLick} endIcon={<Checkmark24Regular />}>
            Опублікувати
          </Button>
        </div>
      </div>
    </div>
  );
};
