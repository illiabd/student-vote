import { Dispatch } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import api from '../../axios';
import * as constants from '../../constants';
import { handleResponseError } from '../../tools/api-error-handler';
import { newsActions } from './slice';
import { Article, CreateArticleRequest, FindArticleResponse, FindParams } from './types';

export const findNews = (params?: FindParams) => async (dispatch: Dispatch) => {
  const fetchData = () => {
    dispatch(newsActions.setIsLoading(true));
    const body = {
      filters: {
        isPublic: params.isPublic,
        title: params.title,
      },
      fields: params.fields,
      offset: params.offset,
      limit: params.limit,
    };
    return api.post<FindArticleResponse>(`news/v1/article/find/${params.organisation}`, body);
  };

  try {
    const response = await fetchData();

    if (axios.isAxiosError(response)) {
      const error = response as AxiosError;
      const statusCode = error?.response?.status;

      switch (statusCode) {
        default:
          handleResponseError(error);
          break;
      }
      return;
    }

    dispatch(newsActions.setNews(response.data.data));
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(newsActions.setIsLoading(false));
  }
};

export const createArticle = (article: CreateArticleRequest) => async (dispatch: Dispatch) => {
  const fetchData = () => {
    dispatch(newsActions.setIsLoading(true));
    return api.post<Article>('news/v1/article', article);
  };

  try {
    const response = await fetchData();

    if (axios.isAxiosError(response)) {
      const error = response as AxiosError;
      const statusCode = error?.response?.status;

      switch (statusCode) {
        case 403:
        case 404:
          toast.warn(constants.HAVE_NOT_ENOUGH_RIGHTS);
          break;
        default:
          handleResponseError(error);
          break;
      }
      return false;
    }

    if (response.status === 200) {
      toast.success(constants.CREATE_NEWS_SUCCESS_MESSAGE);
      return true;
    }
  } catch (e) {
    console.log(e);
  }
  return false;
};

export const publishArticle = (articleId: string) => async (dispatch: Dispatch) => {
  const fetchData = () => {
    dispatch(newsActions.setIsLoading(true));
    return api.post(`/news/v1/article/publication/${articleId}`, { isPublished: true });
  };

  try {
    const response = await fetchData();

    if (axios.isAxiosError(response)) {
      const error = response as AxiosError;
      const statusCode = error?.response?.status;

      switch (statusCode) {
        case 403:
          toast.warn(constants.HAVE_NOT_ENOUGH_RIGHTS);
          break;
        default:
          handleResponseError(error);
          break;
      }
      return false;
    }

    if (response.status === 200) {
      toast.success(constants.PUBLISH_ARTICLE_SUCCESS_MESSAGE);
      return true;
    }
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(newsActions.setIsLoading(false));
  }
  return false;
};

export const patchArticle =
  (id: string, article: CreateArticleRequest) => async (dispatch: Dispatch) => {
    try {
      dispatch(newsActions.setIsLoading(true));
      const response = await api.patch<Article>(`news/v1/article/${id}`, article);

      if (axios.isAxiosError(response)) {
        const error = response as AxiosError;
        const statusCode = error?.response?.status;

        switch (statusCode) {
          case 403:
            toast.warn(constants.HAVE_NOT_ENOUGH_RIGHTS);
            break;
          default:
            handleResponseError(error);
            break;
        }
        return false;
      }

      toast.success(constants.EDIT_ARTICLE_SUCCESS_MESSAGE);
      return true;
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(newsActions.setIsLoading(false));
    }
    return false;
  };

export const deleteArticle = (articleId) => async (dispatch: Dispatch) => {
  const fetchData = () => {
    dispatch(newsActions.setIsLoading(true));
    return api.delete(`/news/v1/article/${articleId}`);
  };

  try {
    const response = await fetchData();

    if (axios.isAxiosError(response)) {
      const error = response as AxiosError;
      const statusCode = error?.response?.status;

      switch (statusCode) {
        case 403:
          toast.warn(constants.HAVE_NOT_ENOUGH_RIGHTS);
          break;
        default:
          handleResponseError(error);
          break;
      }
      return false;
    }

    toast.success(constants.DELETE_ARTICLE_SUCCESS_MESSAGE);
    return true;
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(newsActions.setIsLoading(false));
  }
  return false;
};
