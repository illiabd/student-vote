import * as Yup from 'yup';

import * as constants from '../constants';

export const newsSchema = Yup.object().shape({
  textLength: Yup.number()
    .min(constants.NEWS_TEXT_MIN_LENGTH, constants.NEWS_TEXT_INVALID_MIN_LENGTH)
    .max(constants.NEWS_TEXT_MAX_LENGTH, constants.NEWS_TEXT_INVALID_MAX_LENGTH),
  title: Yup.string()
    .min(constants.NEWS_TITLE_MIN_LENGTH, constants.NEWS_TITLE_INVALID_MIN_LENGTH)
    .max(constants.NEWS_TITLE_MAX_LENGTH, constants.NEWS_TITLE_INVALID_MAX_LENGTH)
    .required(constants.NEWS_TITLE_NOT_PROVIDED_MESSAGE),
});
