import { Article } from '../../../store/news/types';

export type NewsCardProps = {
  data: Article;
  className?: string;
};

type ModalProps = {
  onClose: () => void;
};

export type DeleteArticleModalProps = ModalProps & {
  data: Article;
};

export type EditArticleModalProps = ModalProps & {
  data: Article;
};
