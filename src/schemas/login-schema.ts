import * as Yup from 'yup';

import * as constants from '../constants';

export const loginSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .matches(constants.PHONE_NUMBER_REGEX, constants.PHONE_NUMBER_INVALID_MESSAGE)
    .required(constants.PHONE_NUMBER_NOT_PROVIDED_MESSAGE),
});
