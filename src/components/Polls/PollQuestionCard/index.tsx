import {
  Add24Regular,
  Delete24Regular,
  Dismiss24Regular,
  RadioButton24Regular,
} from '@fluentui/react-icons';
import { useFormik } from 'formik';
import { FC, useCallback, useEffect, useState } from 'react';

import { useAppDispatch } from '../../../hooks';
import { pollOptionSchema, pollQuestionSchema } from '../../../schemas';
import { deleteQuestion, putQuestion } from '../../../store/polls/actions';
import { Card, IconButton, Input } from '../../UI';
import styles from './PollQuestionCard.module.scss';
import { OptionFormValues, PollQuestionCardProps, QuestionFormValues } from './type';

export const PollQuestionCard: FC<PollQuestionCardProps> = ({
  defaultQuestion,
  questionId,
  disabled,
  pollId,
  fetchPollData,
}) => {
  const defaultOptions = defaultQuestion?.options.map((option) => option.name);
  const [options, setOptions] = useState<string[]>(defaultOptions ?? []);

  const dispatch = useAppDispatch();

  const questionFormik = useFormik<QuestionFormValues>({
    initialValues: { questionName: defaultQuestion?.name ?? '' },
    validationSchema: pollQuestionSchema,
    onSubmit: async (values) => {
      const isQuestionNameNotChanged = values.questionName === defaultQuestion?.name;
      if (isQuestionNameNotChanged) {
        return;
      }

      if (!pollId) {
        return;
      }

      const optionsBody = options.map((value) => ({
        name: value,
      }));

      const body = {
        name: values.questionName,
        options: optionsBody,
      };

      await dispatch(putQuestion(pollId, questionId, body));
      await fetchPollData();
    },
  });

  const optionFormik = useFormik<OptionFormValues>({
    initialValues: { optionName: '' },
    validationSchema: pollOptionSchema,
    onSubmit: async (values) => {
      setOptions((prev) => {
        return [...prev, values.optionName];
      });

      optionFormik.resetForm();
    },
  });

  const updateQuestion = useCallback(async () => {
    if (!pollId) {
      return;
    }

    const optionsBody = options.map((value) => ({
      name: value,
    }));

    const body = {
      name: defaultQuestion?.name ?? '',
      options: optionsBody,
    };

    await dispatch(putQuestion(pollId, questionId, body));
    await fetchPollData();
  }, [options]);

  useEffect(() => {
    updateQuestion();
  }, [options, updateQuestion]);

  const handleNameInputBlur = () => {
    questionFormik.submitForm();
  };

  const handleDeleteButtonClick = async () => {
    if (!pollId) {
      return;
    }

    await dispatch(deleteQuestion(pollId, questionId));
    await fetchPollData();
  };

  const optionsElement = options.map((value, index) => {
    const handleDeleteOptionButton = () => {
      setOptions((prev) => {
        const prevCopy = Array.from(prev);
        const filtered = prevCopy.filter((item) => item !== value);
        return filtered;
      });
    };

    const hasLastOption = options.length === 1;

    return (
      <div key={index} className={styles.option}>
        <div className={styles['option-content']}>
          <RadioButton24Regular color="#1784cc" />
          {value}
        </div>
        <IconButton onClick={handleDeleteOptionButton} disabled={hasLastOption || disabled}>
          <Dismiss24Regular color={hasLastOption ? '#e1e1e1' : ''} />
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
        onChange={questionFormik.handleChange}
        onBlur={handleNameInputBlur}
        label="Ваше питання"
        disabled={disabled}
      />

      {hasOptions && <div className={styles.options}>{optionsElement}</div>}

      <div className={styles['add-section']}>
        <Input
          id="optionName"
          type="text"
          disabled={questionFormik.values.questionName.trim().length === 0 || disabled}
          value={optionFormik.values.optionName}
          errors={optionFormik.errors.optionName}
          touched={optionFormik.touched.optionName}
          onChange={optionFormik.handleChange}
          fullWidth
          label="Додати варіант"
        />

        <IconButton disabled={disabled}>
          <Add24Regular onClick={optionFormik.submitForm} />
        </IconButton>
      </div>

      <div style={{ margin: '0 auto' }}>
        <IconButton onClick={handleDeleteButtonClick} disabled={disabled}>
          <Delete24Regular />
        </IconButton>
      </div>
    </Card>
  );
};

/* тут була Діана  */
