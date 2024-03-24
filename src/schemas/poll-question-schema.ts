import * as Yup from 'yup';

import { QUESTION_NAME_MIN_LENGTH, QUESTION_NAME_NOT_PROVIDED } from '../constants';

const questionName = Yup.string()
  .required(QUESTION_NAME_NOT_PROVIDED)
  .min(5, QUESTION_NAME_MIN_LENGTH);

const isSingleChoice = Yup.boolean();

const minOptions = Yup.number().when('isSingleChoice', {
  is: false,
  then: (schema) =>
    schema.required('Введіть мінімальну кількість відповідей').min(1, 'Не може бути менше 1'),
  otherwise: (schema) => schema.notRequired(),
});

const maxOptions = Yup.number().when('isSingleChoice', {
  is: false,
  then: (schema) =>
    schema
      .required('Введіть максимальну кількість відповідей')
      .min(Yup.ref('minOptions'), ({ min }) => `Не може бути менше ${min}`),
  otherwise: (schema) => schema.notRequired(),
});

export const pollQuestionSchema = Yup.object().shape({
  isSingleChoice,
  questionName,
  minOptions,
  maxOptions,
});
