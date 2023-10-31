import { Dispatch } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import api from '../../axios';
import * as constants from '../../constants';
import { handleResponseError } from '../../tools/api-error-handler';
import { vacanciesActions } from './slice';
import {
  CreateVacancyRequest,
  EditVacancyRequest,
  FindParams,
  FindVacanciesResponse,
  Vacancy,
} from './types';

export const findVacancies = (params?: FindParams) => async (dispatch: Dispatch) => {
  const fetchData = () => {
    if (!params) {
      return;
    }

    dispatch(vacanciesActions.setIsLoading(true));
    const body = {
      filters: {
        title: params.title,
        tags: params.tags,
        specialization: params.specialization,
      },
      fields: params.fields,
      offset: params.offset,
      limit: params.limit,
    };
    return api.post<FindVacanciesResponse>(`vacancy/v1/find/${params.organisation}`, body);
  };

  try {
    const response = await fetchData();

    if (!response) {
      return;
    }

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

    dispatch(vacanciesActions.setVacanciesData(response.data.data));
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(vacanciesActions.setIsLoading(false));
  }
};

export const deleteVacancy = (vacancyId?: string) => async (dispatch: Dispatch) => {
  const fetchData = () => {
    dispatch(vacanciesActions.setIsLoading(true));

    return api.delete(`vacancy/v1/${vacancyId}`);
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

      return false;
    }

    toast.success(constants.DELETE_VACANCY_SUCCESS_MESSAGE);
    return true;
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(vacanciesActions.setIsLoading(false));
  }
  return false;
};

export const createVacancy =
  (vacancy: Vacancy, organisationId: string) => async (dispatch: Dispatch) => {
    const fetchData = () => {
      dispatch(vacanciesActions.setIsLoading(true));

      const body: CreateVacancyRequest = {
        ...vacancy,
        organisation: organisationId,
      };

      return api.post('vacancy/v1', body);
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

        return false;
      }

      toast.success(constants.CREATE_VACANCY_SUCCESS_MESSAGE);
      return true;
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(vacanciesActions.setIsLoading(false));
    }
    return false;
  };

export const patchVacancy = (vacancy: EditVacancyRequest) => async (dispatch: Dispatch) => {
  const fetchData = () => {
    dispatch(vacanciesActions.setIsLoading(true));

    return api.patch(`vacancy/v1/${vacancy.id}`, vacancy);
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

      return false;
    }

    toast.success(constants.EDIT_VACANCY_SUCCESS_MESSAGE);
    return true;
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(vacanciesActions.setIsLoading(false));
  }
  return false;
};

export const archiveVacancy = (vacancyId?: string) => async (dispatch: Dispatch) => {
  const fetchData = () => {
    dispatch(vacanciesActions.setIsLoading(true));

    const body = {
      isPublished: false,
    };

    return api.post(`vacancy/v1/publication/${vacancyId}`, body);
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

      return false;
    }

    toast.success(constants.UNPUBLISH_VACANCY_SUCCESS_MESSAGE);
    return true;
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(vacanciesActions.setIsLoading(false));
  }
  return false;
};

export const publishVacancy = (vacancyId?: string) => async (dispatch: Dispatch) => {
  const fetchData = () => {
    dispatch(vacanciesActions.setIsLoading(true));

    const body = {
      isPublished: true,
    };

    return api.post(`vacancy/v1/publication/${vacancyId}`, body);
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

      return false;
    }

    toast.success(constants.PUBLISHED_VACANCY_SUCCESS_MESSAGE);
    return true;
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(vacanciesActions.setIsLoading(false));
  }
  return false;
};
