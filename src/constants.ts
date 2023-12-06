/* eslint-disable no-useless-escape */
/* Axios */
export const UNAUTHORIZED_STATUS_CODE = 401;

/* Login validation */
export const PHONE_NUMBER_REGEX = /^[\\+][(]?[0-9]{2,3}[)]?[\s\\.]?[0-9]{3}[\s\\.]?[0-9]{6}$/;

export const PHONE_NUMBER_INVALID_MESSAGE = 'Введіть коректний номер телефону';
export const PHONE_NUMBER_NOT_PROVIDED_MESSAGE = 'Введіть, будь ласка, номер телефону';

export const PHONE_NUMBER_INVALID = 'Введіть коректний номер телефону';
export const PHONE_NUMBER_NOT_PROVIDED = 'Введіть, будь ласка, номер телефону';

/* Create profile validation */

export const FIRSTNAME_NOT_PROVIDED = "Введіть, будь ласка, ім'я";
export const LASTNAME_NOT_PROVIDED = 'Введіть, будь ласка, прізвище';

export const COMPANY_NAME_NOT_PROVIDED = 'Введіть, будь ласка, назву компанії';

export const LINK_REGEX =
  /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
export const LINK_INVALID = 'Введіть коректне посилання';

export const DOU_LINK_REGEX = /dou\.ua/;
export const DOU_LINK_INVALID = 'Введіть коректне посилання на DOU';

export const EMAIL_INVALID = 'Введіть коректний e-mail';
export const EMAIL_NOT_PROVIDED = 'Введіть, будь ласка, e-mail';

/* Verification validation */
export const VERIFICATION_CODE_LENGTH = 6;
export const VERIFICATION_CODE_ALL_DIGITS_REGEX = /^[0-9]*$/;

export const VERIFICATION_CODE_INVALID_MESSAGE = 'Введений код не є коректним';
export const VERIFICATION_CODE_NOT_PROVIDED_MESSAGE = 'Введіть, будь ласка, код';

/* News validation */
export const NEWS_TEXT_MIN_LENGTH = 5;
export const NEWS_TEXT_INVALID_MIN_LENGTH = 'Довжина назви повинна бути не менше 5 символів';
export const NEWS_TEXT_MAX_LENGTH = 1000;
export const NEWS_TEXT_INVALID_MAX_LENGTH =
  'Довжина новини перевищує максимальну кількість 1000 символів';

export const NEWS_TEXT_NOT_PROVIDED_MESSAGE = 'Новина не може бути пустою';

export const NEWS_TITLE_MIN_LENGTH = 5;
export const NEWS_TITLE_INVALID_MIN_LENGTH = 'Довжина заголовку повинна бути не менше 5 символів';
export const NEWS_TITLE_INVALID_MAX_LENGTH =
  'Довжина заголовку перевищує максимальну кількість 42 символи';
export const NEWS_TITLE_MAX_LENGTH = 42;

export const NEWS_TITLE_NOT_PROVIDED_MESSAGE = 'Введіть, будь ласка, заголовок новини';

/* Vacancy form validation */
export const VACANCY_NOT_A_NUMBER = 'Введіть коректне число';

export const VACANCY_REMOTE_TYPE_NOT_PROVIDED = 'Оберіть один з варіантів';

export const VACANCY_TITLE_NOT_PROVIDED = 'Введіть, будь ласка, заголовок';
export const VACANCY_TITLE_INVALID_MAX_LENGTH =
  'Довжина перевищує максимальну кількість 100 символів';
export const VACANCY_DESCRIPTION_INVALID_MIN_LENGTH = 'Довжина повинна бути не менше 5 символів';
export const VACANCY_DESCRIPTION_INVALID_MAX_LENGTH =
  'Довжина перевищує максимальну кількість 2000 символів';

export const VACANCY_MIN_SALARY = 0;
export const VACANCY_MIN_SALARY_MESSAGE = 'Значення повинно бути більшим або дорівнювати 0';

export const VACANCY_MAX_SALARY = 20000;
export const VACANCY_MAX_SALARY_MESSAGE = 'Значення повинно бути не більше 20000';

export const VACANCY_CITY_MAX_LENGTH = 'Не більше 150 символів';
export const VACANCY_CITY_NOT_PROVIDED = 'Введіть, будь ласка, місто';

export const VACANCY_MIN_DESCRIPTION_LENGTH = 5;
export const VACANCY_MAX_DESCRIPTION_LENGTH = 2000;

export const VACANCY_MAX_TITLE_LENGTH = 100;
export const VACANCY_MAX_CITY_LENGTH = 100;

/* Event form validation */

export const EVENT_TITLE_NOT_PROVIDED = 'Введіть назву події';
export const EVENT_KIND_NOT_PROVIDED = 'Оберіть один з варіантів';
export const EVENT_MAIN_LECTURER_FULL_NAME = 'Введіть ПІБ викладачів';
export const EVENT_START_NOT_PROVIDED = 'Ведіть час початку події';
export const EVENT_END_NOT_PROVIDED = 'Ведіть час закінчення події';
export const EVENT_DIVISIONS_NOT_PROVIDED = 'Оберіть одну чи декілька груп';
export const EVENT_DATE_NOT_PROVIDED = 'Введіть дату проведення події';
export const EVENT_INTERVAL_NOT_PROVIDED = 'Введіть інтервал повторень';
export const EVENT_FREQUENCY_NOT_PROVIDED = 'Оберіть частоту повторень';
export const EVENT_COUNT_NOT_PROVIDED = 'Введіть кількість повторень';
export const EVENT_INTERVAL_MIN_VALUE = 'Недопустиме значення';
export const EVENT_COUNT_MIN_VALUE = 'Недопустиме значення';

/* Poll validation */

export const QUESTION_NAME_NOT_PROVIDED = 'Введіть питання';
export const OPTION_NAME_NOT_PROVIDED = 'Введіть питання';

/* Phone input */
export const PHONE_NUMBER_MASK = '00-000-00-00';
export const COUNTRIES = [
  {
    ISOCode: 'UA',
    callingCode: '380',
  },
  {
    ISOCode: 'US',
    callingCode: '1',
  },
];

/* Days of week */
export const WEEK = ['Неділя', 'Понеділок', 'Вівторок', 'Середа', 'Четвер', "П'ятниця", 'Субота'];

/* Local storage items */
export const SELECTED_ORGANISATION_ID = 'SELECTED_ORGANISATION_ID';

/* Organisations roles */
export const ROLES = ['admin', 'member'];

/* Toast messages */
export const ETERNAL_SERVER_ERROR_MESSAGE = 'А щоб тобі повилазило, сервер не відповідає';
export const SOMETHING_WENT_WRONG_MESSAGE = 'Йой, щось пішло не так 😢';

export const USER_UNAUTHORIZED_MESSAGE = 'Ви не авторизовані, увійдіть до акаунту';
export const WRONG_PHONE_NUMBER_MESSAGE = 'Невірний номер телефону';
export const WRONG_VERIFICATION_CODE = 'Невірний верифікаційний код';
export const HAVE_NOT_ENOUGH_RIGHTS = 'У вас немає дозволу на виконання цієї операції';

/* Links */
export const TELEGRAM_LINK_REGEX = /(https?:\/\/)?(www[.])?(telegram|t)\.me\/([a-zA-Z0-9_-]*)\/?$/;
export const INSTAGRAM_LINK_REGEX =
  /(?:(?:http|https):\/\/)?(?:www.)?(?:instagram.com|instagr.am|instagr.com)\/(\w+)/gim;
export const LINKEDIN_LINK_REGEX = /^(http(s)?:\/\/)?([\w]+\.)?linkedin\.com\/(pub|in|profile)/gm;

/* Toastify messages */
export const ADD_STUDENT_TO_GROUP_SUCCESS_MESSAGE = 'Студента було додано до групи';

export const CHANGE_USER_ROLE_SUCCESS_MESSAGE = 'Права користувача змінено';
export const DELETE_USER_SUCCESS_MESSAGE = 'Користувача видалено';
export const ADD_MEMBER_SUCCESS_MESSAGE = 'Користувача додано';

export const PUBLISH_ARTICLE_SUCCESS_MESSAGE = 'Новину опубліковано';
export const DELETE_ARTICLE_SUCCESS_MESSAGE = 'Новину видалено';
export const EDIT_ARTICLE_SUCCESS_MESSAGE = 'Новину було відредаговано';
export const CREATE_NEWS_SUCCESS_MESSAGE = 'Новину створено';

export const PUBLISHED_VACANCY_SUCCESS_MESSAGE = 'Вакансію опубліковано';
export const UNPUBLISH_VACANCY_SUCCESS_MESSAGE = 'Вакансія неактивна';
export const CREATE_VACANCY_SUCCESS_MESSAGE = 'Вакансію створено';
export const DELETE_VACANCY_SUCCESS_MESSAGE = 'Вакансію видалено';
export const EDIT_VACANCY_SUCCESS_MESSAGE = 'Вакансію відредаговано';

export const DELETE_EVENT_SUCCESS_MESSAGE = 'Подію видалено';
export const CREATE_EVENT_SUCCESS_MESSAGE = 'Подію створено';
export const PATCH_EVENT_SUCCESS_MESSAGE = 'Подію відредаговано';

export const CREATE_POLL_SUCCESS_MESSAGE = 'Голосування створено';
export const EDIT_POll_SUCCESS_MESSAGE = 'Голосування відредаговано';
export const OPEN_POLL_SUCCESS_MESSAGE = 'Глосування відкрито';
export const CLOSE_POLL_SUCCESS_MESSAGE = 'Голосування закрито';
export const DELETE_POLL_SUCCESS_MESSAGE = 'Голосування видалено';

/* File uploading */

export const IMAGE_MAX_SIZE = 512 * 1024;
export const FILE_TOO_LARGE_WARN_MESSAGE = 'Розмір обраного файлу перевищує максимальний розмір';

/* ENUMs */

export enum UserLinks {
  instagram = 'instagram',
  telegram = 'telegram',
  linkedin = 'linkedin',
  link = 'link',
}

export enum UserLinksLabels {
  instagram = 'Instagram',
  telegram = 'Telegram',
  linkedin = 'Linkedin',
  link = 'Посилання',
}

export enum AllowedFeatures {
  news = 'news',
  vacancies = 'vacancies',
  timetable = 'timetable',
  polls = 'polls',
}

export enum AllowedFeaturesLinks {
  news = 'Новини',
  vacancies = 'Мої вакансії',
  timetable = 'Розклад',
  polls = 'Голосування',
}

export enum RemoteTypes {
  partly_remote = 'частково віддалено',
  full_remote = 'віддалено',
  employee_choice = 'офіс / віддалено',
  office = 'офіс',
}

export enum ScreenOrientation {
  landscape = 'landscape',
  portrait = 'portrait',
}

export enum OrganisationType {
  company = 'company',
  university = 'university',
  devscompany = 'devscompany',
}

export enum UserTypes {
  admin = 'admin',
  superadmin = 'superadmin',
  student = 'student',
  lecturer = 'lecturer',
}

export enum EventKind {
  generic = 'generic',
  exam = 'exam',
  lecture = 'lecture',
  practice = 'practice',
  lab = 'lab',
}

export enum EventKindNames {
  generic = 'generic',
  exam = 'Екзамен',
  lecture = 'Лекція',
  practice = 'Практика',
  lab = 'Лабораторна',
}

export enum EventFrequencyLabels {
  DAILY = 'Днів',
  WEEKLY = 'Тижнів',
}
