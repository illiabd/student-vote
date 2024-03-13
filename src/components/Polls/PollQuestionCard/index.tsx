import {
  Add24Regular,
  Delete24Regular,
  Dismiss24Regular,
  RadioButton24Regular,
} from '@fluentui/react-icons';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
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
    initialValues: {
      questionName: defaultQuestion?.name ?? '',
      isSingleChoice: defaultQuestion?.isSingleChoice ?? true,
      minOptions: defaultQuestion?.minOptions ?? null,
      maxOptions: defaultQuestion?.maxOptions ?? null,
    },

    validationSchema: pollQuestionSchema,
    onSubmit: async (values) => {
      if (!pollId) {
        return;
      }

      const optionsBody = options.map((value) => ({
        name: value,
      }));

      const body = {
        name: values.questionName,
        options: optionsBody,
        isSingleChoice: values.isSingleChoice,
        minOptions: values.minOptions,
        maxOptions: values.maxOptions,
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
      isSingleChoice: defaultQuestion?.isSingleChoice ?? true,
      minOptions: defaultQuestion?.minOptions ?? null,
      maxOptions: defaultQuestion?.maxOptions ?? null,
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSwitchInput = async (_event: any, checked: boolean) => {
    await questionFormik.setFieldValue('isSingleChoice', !checked);
    await questionFormik.submitForm();
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

      <div className={styles['switch-box']}>
        <FormControlLabel
          id="isSingleChoice"
          control={<Switch checked={!questionFormik.values.isSingleChoice} />}
          label="Декілька відповідей"
          onChange={handleSwitchInput}
        />

        {!questionFormik.values.isSingleChoice && (
          <>
            <span>Кількість відповідей:</span>
            <div className={styles['multi-inputs']}>
              <Input
                id="minOptions"
                type="number"
                disabled={questionFormik.values.isSingleChoice}
                value={`${questionFormik.values.minOptions}`}
                errors={questionFormik.errors.minOptions}
                touched={questionFormik.touched.minOptions}
                onChange={questionFormik.handleChange}
                onBlur={handleNameInputBlur}
                fullWidth
                label="Від"
              />

              <Input
                id="maxOptions"
                type="number"
                disabled={questionFormik.values.isSingleChoice}
                value={`${questionFormik.values.maxOptions}`}
                errors={questionFormik.errors.maxOptions}
                touched={questionFormik.touched.maxOptions}
                onChange={questionFormik.handleChange}
                onBlur={handleNameInputBlur}
                fullWidth
                label="До"
              />
            </div>
          </>
        )}
      </div>

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
