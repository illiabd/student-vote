import * as Yup from 'yup';

import { OPTION_NAME_NOT_PROVIDED } from '../constants';

const optionName = Yup.string().required(OPTION_NAME_NOT_PROVIDED);

export const pollOptionSchema = Yup.object().shape({ optionName });
