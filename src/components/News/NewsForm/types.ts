import { CreateArticleRequest } from '../../../store/news/types';

export type NewsFormValues = {
  title: string;
  text: string;
  textLength: number;
};

export type NewsFormProps = {
  organisationId: string;
  onSubmit: (values: CreateArticleRequest) => void;
};
