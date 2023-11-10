import * as Yup from 'yup';

import * as constants from '../constants';

const firstName = Yup.string().required(constants.FIRSTNAME_NOT_PROVIDED);
const lastName = Yup.string().required(constants.LASTNAME_NOT_PROVIDED);

export const userInfoSchema = Yup.object().shape({
  firstName,
  lastName,
});
