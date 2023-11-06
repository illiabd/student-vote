import * as Yup from 'yup';

import { QUESTION_NAME_NOT_PROVIDED } from '../constants';

const questionName = Yup.string().required(QUESTION_NAME_NOT_PROVIDED);

export const pollQuestionSchema = Yup.object().shape({ questionName });
