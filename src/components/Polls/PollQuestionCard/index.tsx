import {
  Add24Regular,
  Delete24Regular,
  Dismiss24Regular,
  RadioButton24Regular,
} from '@fluentui/react-icons';
import { useFormik } from 'formik';
import { FC, useState } from 'react';

import api from '../../../axios';
import { useAppDispatch } from '../../../hooks';
import { pollOptionSchema, pollQuestionSchema } from '../../../schemas';
import { deleteQuestion } from '../../../store/polls/actions';
import { Card, IconButton, Input } from '../../UI';
import styles from './PollQuestionCard.module.scss';
import { OptionFormValues, PollQuestionCardProps, QuestionFormValues } from './type';

export const PollQuestionCard: FC<PollQuestionCardProps> = ({
  defaultQuestion,
  questionId,
  pollId,
  fetchPollData,
}) => {
  const defaultOptions = defaultQuestion?.options.map((option) => option.name);
  const [options, setOptions] = useState<string[]>(defaultOptions ?? []);

  const dispatch = useAppDispatch();

  const questionFormik = useFormik<QuestionFormValues>({
    initialValues: { questionName: defaultQuestion?.name ?? '' },
    validationSchema: pollQuestionSchema,
    onSubmit: (values) => {
      const optionsBody = options.map((value) => ({
        name: value,
      }));

      const body = {
        name: values.questionName,
        options: optionsBody,
      };

      api.put(`/vote/v1/polls/${pollId}/question/${questionId}`, body);
    },
  });

  const optionFormik = useFormik<OptionFormValues>({
    initialValues: { optionName: '' },
    validationSchema: pollOptionSchema,
    onSubmit: (values) => {
      setOptions((prev) => {
        return [...prev, values.optionName];
      });

      optionFormik.resetForm();
    },
  });

  const handleNameInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    questionFormik.setFieldValue('questionName', name);

    const question = {
      questionId,
      name,
      options: options.map((optionName) => ({
        name: optionName,
      })),
    };
  };

  const handleNameInputBlur = () => {
    questionFormik.submitForm();
  };

  const handleDeleteButtonClick = async () => {
    if (!pollId) {
      return;
    }

    await dispatch(deleteQuestion(pollId, questionId));
    await fetchPollData();
    fetch;
  };

  const optionsElement = options.map((value, index) => {
    const handleDeleteOptionButton = () => {
      setOptions((prev) => {
        const prevCopy = Array.from(prev);
        const filtered = prevCopy.filter((item) => item !== value);
        return filtered;
      });
    };

    return (
      <div key={index} className={styles.option}>
        <div className={styles['option-content']}>
          <RadioButton24Regular color="#1784cc" />
          {value}
        </div>
        <IconButton onClick={handleDeleteOptionButton}>
          <Dismiss24Regular />
        </IconButton>
      </div>
    );
  });

  const hasOptions = optionsElement.length > 0;
  return (
    <Card className={styles.card}>
      <Input
        id="questionName"
        type="text"
        value={questionFormik.values.questionName}
        errors={questionFormik.errors.questionName}
        touched={questionFormik.touched.questionName}
        onChange={handleNameInputChange}
        onBlur={handleNameInputBlur}
        label="Ваше питання"
      />

      {hasOptions && <div className={styles.options}>{optionsElement}</div>}

      <div className={styles['add-section']}>
        <Input
          id="optionName"
          type="text"
          disabled={questionFormik.values.questionName.trim().length === 0}
          value={optionFormik.values.optionName}
          errors={optionFormik.errors.optionName}
          touched={optionFormik.touched.optionName}
          onChange={optionFormik.handleChange}
          fullWidth
          label="Додати варіант"
        />

        <IconButton>
          <Add24Regular onClick={optionFormik.submitForm} />
        </IconButton>
      </div>

      <div style={{ margin: '0 auto' }}>
        <IconButton onClick={handleDeleteButtonClick}>
          <Delete24Regular />
        </IconButton>
      </div>
    </Card>
  );
};

/* тут була Діана  */

PollQuestionCard.displayName = 'PollQuestionCard';
