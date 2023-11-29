import * as Yup from 'yup';

import { POLL_NAME_NOT_PROVIDED } from '../constants';

const name = Yup.string().required(POLL_NAME_NOT_PROVIDED);

export const pollNameSchema = Yup.object().shape({ name });
