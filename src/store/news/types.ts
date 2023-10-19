export type FindParams = {
  organisation?: string;
  isPublic?: boolean;
  title?: string;
  fields?: string[];
  offset?: number;
  limit?: number;
};

export type Article = {
  titleSecondary?: string;
  organisation?: string;
  isPublished?: boolean;
  isPublic?: boolean;
  imageUrl?: string;
  title?: string;
  text?: string;
  publicationDate?: Date;
  id?: string;
};

export type NewsData = {
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  totalPages: 1;
  prevPage: number;
  nextPage: number;
  offset: number;
  limit: number;
  docs: Article[];
  page: number;
};

export type State = {
  isLoading: boolean;
  newsData: NewsData;
};

export type FindArticleResponse = {
  data: NewsData;
};

export type CreateArticleRequest = {
  titleSecondary?: string;
  isPublic?: boolean;
  imageUrl?: string;
  title?: string;
  text?: string;
  organisation?: string;
};
