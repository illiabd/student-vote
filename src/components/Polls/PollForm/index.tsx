import { Add24Regular, ArrowLeft24Regular, Checkmark24Regular } from '@fluentui/react-icons';
import { useFormik } from 'formik';
import { createRef, FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { useAppSelector } from '../../../hooks';
import { pollNameSchema } from '../../../schemas';
import { NewOption } from '../../../store/polls/types';
import { Button, IconButton, Input } from '../../UI';
import { PollQuestionCard } from '../PollQuestionCard';
import { HandleValidate } from '../PollQuestionCard/type';
import styles from './PollForm.module.scss';
import { CreateQuestion, FormValues, PollFormProps } from './type';

export const PollForm: FC<PollFormProps> = ({ defaultValues, onSubmit }) => {
  const defaultQuestions = defaultValues?.questions.map((question) => {
    const options = question.options.map<NewOption>((option) => ({ name: option.name }));
    const newId = uuidv4();
    return { key: newId, value: { questionId: newId, name: question.name, options } };
  });

  const [questionsRefs, setQuestionsRefs] = useState<React.RefObject<HandleValidate>[]>([]);
  const [pollQuestionMap, setPollQuestionMap] = useState<Map<string, CreateQuestion>>(
    defaultQuestions ? new Map(defaultQuestions.map((item) => [item.key, item.value])) : new Map(),
  );
  // const [isQuestionsValid, setIsQuestionsValid] = useState(false);

  const { selectedOrganisationId } = useAppSelector((state) => state.current);
  const navigate = useNavigate();

  const formik = useFormik<FormValues>({
    initialValues: { name: defaultValues?.name ?? '' },
    validationSchema: pollNameSchema,
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

      // questionsRefs.forEach((ref) => {
      //   const isValid = ref.current?.validate();
      //   if (!isValid) {
      //     setIsQuestionsValid(false);
      //   }
      // });

      // if (!isQuestionsValid) {
      //   return;
      // }

      const body = {
        name: values.name,
        organisationId: selectedOrganisationId,
        questions,
      };

      onSubmit(body);
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
    const questionRef = createRef<HandleValidate>();
    const handleChange = (id: string, value: CreateQuestion) => {
      setPollQuestionMap((prev) => {
        const prevCopy = new Map(prev);
        prevCopy.set(id, value);
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

    setQuestionsRefs((prev) => {
      return [...prev, questionRef];
    });

    return (
      <PollQuestionCard
        ref={questionRef}
        key={question.questionId}
        questionId={question.questionId}
        defaultQuestion={question}
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
            endIcon={<Add24Regular />}
            onClick={handleAddQuestionButtonClick}
          >
            Додати питання
          </Button>

          <Button onClick={handleCreatePollButtonCLick} endIcon={<Checkmark24Regular />}>
            {defaultValues ? 'Зберегти' : 'Опублікувати'}
          </Button>
        </div>
      </div>
    </div>
  );
};
