import * as Yup from 'yup';

import { QUESTION_NAME_MIN_LENGTH, QUESTION_NAME_NOT_PROVIDED } from '../constants';

const questionName = Yup.string()
  .required(QUESTION_NAME_NOT_PROVIDED)
  .min(5, QUESTION_NAME_MIN_LENGTH);

export const pollQuestionSchema = Yup.object().shape({ questionName });
