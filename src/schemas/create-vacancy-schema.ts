import * as Yup from 'yup';
import * as constants from '../constants';

const remoteType = Yup.string().required(constants.VACANCY_REMOTE_TYPE_NOT_PROVIDED);

const textLength = Yup.number()
  .min(constants.VACANCY_MIN_DESCRIPTION_LENGTH, constants.VACANCY_DESCRIPTION_INVALID_MIN_LENGTH)
  .max(constants.VACANCY_MAX_DESCRIPTION_LENGTH, constants.VACANCY_DESCRIPTION_INVALID_MAX_LENGTH);

const maxSalary = Yup.number()
  .min(constants.VACANCY_MIN_SALARY, constants.VACANCY_MIN_SALARY_MESSAGE)
  .max(constants.VACANCY_MAX_SALARY, constants.VACANCY_MAX_SALARY_MESSAGE)
  .typeError(constants.VACANCY_NOT_A_NUMBER);
const minSalary = Yup.number()
  .min(constants.VACANCY_MIN_SALARY, constants.VACANCY_MIN_SALARY_MESSAGE)
  .max(constants.VACANCY_MAX_SALARY, constants.VACANCY_MAX_SALARY_MESSAGE)
  .typeError(constants.VACANCY_NOT_A_NUMBER);

const title = Yup.string()
  .required(constants.VACANCY_TITLE_NOT_PROVIDED)
  .max(constants.VACANCY_MAX_TITLE_LENGTH, constants.VACANCY_TITLE_INVALID_MAX_LENGTH);
const city = Yup.string()
  .required(constants.VACANCY_CITY_NOT_PROVIDED)
  .max(constants.VACANCY_MAX_CITY_LENGTH, constants.VACANCY_CITY_MAX_LENGTH);

export const vacancySchema = Yup.object().shape({
  remoteType,
  textLength,
  minSalary,
  maxSalary,
  title,
  city,
});
