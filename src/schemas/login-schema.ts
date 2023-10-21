import * as Yup from 'yup';

import * as constants from '../constants';

export const loginSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .matches(constants.PHONE_NUMBER_REGEX, constants.PHONE_NUMBER_INVALID_MESSAGE)
    .required(constants.PHONE_NUMBER_NOT_PROVIDED_MESSAGE),
  // password: Yup.string()
  //   .min(6, constants.PASSWORD_INVALID_LENGTH_MESSAGE)
  //   .max(16, constants.PASSWORD_INVALID_LENGTH_MESSAGE)
  //   .matches(
  //     constants.PASSWORD_SPECIAL_SYMBOL_REGEX,
  //     constants.PASSWORD_NO_SPECIAL_SYMBOLS_PROVIDED_MESSAGE,
  //   )
  //   .matches(
  //     constants.PASSWORD_UPPER_CASE_SYMBOL_REGEX,
  //     constants.PASSWORD_NO_UPPER_CASE_SYMBOLS_PROVIDED_MESSAGE,
  //   )
  //   .required(constants.PASSWORD_NOT_PROVIDED_MESSAGE),
});
