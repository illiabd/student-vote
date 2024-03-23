import * as Yup from 'yup';

import { QUESTION_NAME_MIN_LENGTH, QUESTION_NAME_NOT_PROVIDED } from '../constants';

const questionName = Yup.string()
  .required(QUESTION_NAME_NOT_PROVIDED)
  .min(5, QUESTION_NAME_MIN_LENGTH);

const minOptions = Yup.number()
  .required('Введіть мінімальну кількість відповідей')
  .min(1, 'Не може бути менше 1');
const maxOptions = Yup.number()
  .required('Введіть максимальну кількість відповідей')
  .min(Yup.ref('minOptions'), ({ min }) => `Не може бути менше ${min}`);

export const pollQuestionSchema = Yup.object().shape({ questionName, minOptions, maxOptions });
