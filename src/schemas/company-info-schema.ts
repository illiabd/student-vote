import * as Yup from 'yup';

import * as constants from '../constants';

const name = Yup.string().required(constants.COMPANY_NAME_NOT_PROVIDED);
const email = Yup.string().email(constants.EMAIL_INVALID).required(constants.EMAIL_NOT_PROVIDED);
const link = Yup.string().matches(constants.LINK_REGEX, constants.LINK_INVALID);
const douLink = Yup.string().matches(constants.DOU_LINK_REGEX, constants.DOU_LINK_INVALID);

export const companyInfoSchema = Yup.object().shape({
  name,
  link,
  email,
  douLink,
});

export const companyInfoPatchSchema = Yup.object().shape({
  name: Yup.string(),
  email: Yup.string().email(constants.EMAIL_INVALID),
  link: Yup.string().matches(constants.LINK_REGEX, constants.LINK_INVALID),
  douLink: Yup.string().matches(constants.DOU_LINK_REGEX, constants.DOU_LINK_INVALID),
});
