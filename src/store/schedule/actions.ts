import { Dispatch } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import api from '../../axios';
import {
  CREATE_EVENT_SUCCESS_MESSAGE,
  DELETE_EVENT_SUCCESS_MESSAGE,
  HAVE_NOT_ENOUGH_RIGHTS,
  PATCH_EVENT_SUCCESS_MESSAGE,
} from '../../constants';
import { handleResponseError } from '../../tools/api-error-handler';
import store from '..';
import { vacanciesActions } from '../vacancies/slice';
import { scheduleActions } from './slice';
import { CreateEventBody, FindEventsResponse, FindParams } from './types';

export const createEvent = (createEventBody: CreateEventBody) => async (dispatch: Dispatch) => {
  const fetchData = () => {
    dispatch(scheduleActions.setIsLoading(true));
    return api.post('schedule/v1/events', createEventBody);
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

    toast.success(CREATE_EVENT_SUCCESS_MESSAGE);
    return true;
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(vacanciesActions.setIsLoading(false));
  }
  return false;
};

export const findEvents = (params?: FindParams) => async (dispatch: Dispatch) => {
  const fetchData = () => {
    dispatch(scheduleActions.setIsLoading(true));

    return api.get<FindEventsResponse>('schedule/v1/events/', {
      params: {
        organisation: params?.organisation,
        division: params?.division,
        from: params?.from,
        till: params?.till,
        limit: params?.limit,
      },
    });
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

    dispatch(scheduleActions.setScheduleData(response.data));
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(scheduleActions.setIsLoading(false));
  }
};

export const deleteEvent = (eventId: string) => async (dispatch: Dispatch) => {
  const fetchData = () => {
    dispatch(scheduleActions.setIsLoading(true));
    return api.delete(`/schedule/v1/events/${eventId}`);
  };

  try {
    const response = await fetchData();

    if (axios.isAxiosError(response)) {
      const error = response as AxiosError;
      const statusCode = error?.response?.status;

      switch (statusCode) {
        case 403:
          toast.warn(HAVE_NOT_ENOUGH_RIGHTS);
          break;
        default:
          handleResponseError(error);
          break;
      }
      return false;
    }

    toast.success(DELETE_EVENT_SUCCESS_MESSAGE);
    return true;
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(scheduleActions.setIsLoading(false));
  }
  return false;
};

export const patchEvent =
  (eventId: string, scheduleEvent: CreateEventBody) => async (dispatch: Dispatch) => {
    const fetchData = () => {
      dispatch(scheduleActions.setIsLoading(true));
      return api.patch(`/schedule/v1/events/${eventId}`, scheduleEvent);
    };

    try {
      const response = await fetchData();

      if (axios.isAxiosError(response)) {
        const error = response as AxiosError;
        const statusCode = error?.response?.status;

        switch (statusCode) {
          case 403:
            toast.warn(HAVE_NOT_ENOUGH_RIGHTS);
            break;
          default:
            handleResponseError(error);
            break;
        }
        return false;
      }

      toast.success(PATCH_EVENT_SUCCESS_MESSAGE);
      return true;
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(scheduleActions.setIsLoading(false));
    }
    return false;
  };

export const loadEvents = (params?: FindParams) => async (dispatch: Dispatch) => {
  const fetchData = () => {
    const state = store.getState();
    const { scheduleData } = state.schedule;

    if (!scheduleData.hasNextPage) {
      return undefined;
    }

    dispatch(scheduleActions.setIsLoading(true));
    return api.get<FindEventsResponse>('schedule/v1/events/admin/', {
      params: {
        organisation: params?.organisation,
        division: params?.division,
        page: scheduleData.nextPage,
      },
    });
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

      return false;
    }

    dispatch(scheduleActions.pushEvents(response.data));
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(scheduleActions.setIsLoading(false));
  }

  return false;
};
