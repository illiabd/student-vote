import { Vacancy } from '../../../store/vacancies/types';

export type VacancyCardProps = {
  data: Vacancy;
};

export type DeleteModalProps = {
  data: Vacancy;
  onClose: () => void;
};
