import * as Yup from 'yup';
import * as constants from '../constants';

export const verificationSchema = Yup.object().shape({
  code: Yup.string()
    .min(constants.VERIFICATION_CODE_LENGTH, constants.VERIFICATION_CODE_INVALID_MESSAGE)
    .max(constants.VERIFICATION_CODE_LENGTH, constants.VERIFICATION_CODE_INVALID_MESSAGE)
    .matches(
      constants.VERIFICATION_CODE_ALL_DIGITS_REGEX,
      constants.VERIFICATION_CODE_INVALID_MESSAGE,
    )
    .required(constants.VERIFICATION_CODE_NOT_PROVIDED_MESSAGE),
});
