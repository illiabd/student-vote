import {
  Add24Regular,
  Delete24Regular,
  Dismiss24Regular,
  RadioButton24Regular,
} from '@fluentui/react-icons';
import { useFormik } from 'formik';
import { FC, useState } from 'react';

import { pollOptionSchema } from '../../../schemas/poll-option-schema';
import { pollQuestionSchema } from '../../../schemas/poll-question-schema';
import { Card, IconButton, Input } from '../../UI';
import styles from './PollQuestionCard.module.scss';
import { OptionFormValues, PollQuestionCardProps, QuestionFormValues } from './type';

export const PollQuestionCard: FC<PollQuestionCardProps> = ({ questionId, onChange, onDelete }) => {
  const [options, setOptions] = useState<string[]>([]);

  const questionFormik = useFormik<QuestionFormValues>({
    initialValues: { questionName: '' },
    validationSchema: pollQuestionSchema,
    onSubmit: () => {},
  });

  const optionFormik = useFormik<OptionFormValues>({
    initialValues: { optionName: '' },
    validationSchema: pollOptionSchema,
    onSubmit: (values) => {
      setOptions((prev) => {
        const prevCopy = Array.from(prev);
        prevCopy.push(values.optionName);
        return prevCopy;
      });

      optionFormik.resetForm();

      const question = {
        questionId,
        name: questionFormik.values.questionName,
        options: options.map((optionName) => ({
          name: optionName,
        })),
      };
      onChange(questionId, question);
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
    onChange(questionId, question);
  };

  const handleDeleteButtonClick = () => {
    onDelete(questionId);
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
      <div className={styles.name}>
        <Input
          id="questionName"
          type="text"
          noLabel
          value={questionFormik.values.questionName}
          errors={questionFormik.errors.questionName}
          touched={questionFormik.touched.questionName}
          onChange={handleNameInputChange}
          placeholder="Ваше питання"
          onKeyDown={(e) => {
            e.key === 'Enter' && e.preventDefault();
          }}
        />
      </div>

      <div className={styles['add-section']}>
        <form style={{ width: '100%' }}>
          <Input
            id="optionName"
            type="text"
            noLabel
            disabled={questionFormik.values.questionName.trim().length === 0}
            value={optionFormik.values.optionName}
            errors={optionFormik.errors.optionName}
            touched={optionFormik.touched.optionName}
            onChange={optionFormik.handleChange}
            placeholder="Додати варіант"
            onKeyDown={(e) => {
              e.key === 'Enter' && e.preventDefault();
            }}
          />
        </form>

        <IconButton>
          <Add24Regular onClick={optionFormik.submitForm} />
        </IconButton>
      </div>

      {hasOptions && <div className={styles.options}>{optionsElement}</div>}

      <div style={{ margin: '0 auto' }}>
        <IconButton onClick={handleDeleteButtonClick}>
          <Delete24Regular />
        </IconButton>
      </div>
    </Card>
  );
};

/* тут була Діана  */
