import { Dispatch } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import api from '../../axios';
import {
  CLOSE_POLL_SUCCESS_MESSAGE,
  CREATE_POLL_SUCCESS_MESSAGE,
  DELETE_POLL_SUCCESS_MESSAGE,
  EDIT_POll_SUCCESS_MESSAGE,
  OPEN_POLL_SUCCESS_MESSAGE,
} from '../../constants';
import { handleResponseError } from '../../tools/api-error-handler';
import { pollsActions } from './slice';
import { CreatePollRequest, CreatePollResponse, EditPollRequest, PollData } from './types';

export const findPolls = (organisationId: string) => async (dispatch: Dispatch) => {
  const fetchData = () => {
    dispatch(pollsActions.setIsLoading(true));

    return api.get<PollData>(`vote/v1/polls/organisation/${organisationId}`);
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

    dispatch(pollsActions.setPollsData(response.data));
  } catch (e) {
    console.warn(e);
  } finally {
    dispatch(pollsActions.setIsLoading(false));
  }
};

export const createPoll = (poll: CreatePollRequest) => async (dispatch: Dispatch) => {
  const fetchData = () => {
    dispatch(pollsActions.setIsLoading(true));

    return api.post<CreatePollResponse>('vote/v1/polls', poll);
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

    toast.success(CREATE_POLL_SUCCESS_MESSAGE);
    return response.data;
  } catch (e) {
    console.warn(e);
  } finally {
    dispatch(pollsActions.setIsLoading(false));
  }
  return false;
};

export const publishPoll = (pollId: string) => async (dispatch: Dispatch) => {
  const fetchData = () => {
    dispatch(pollsActions.setIsLoading(true));

    return api.patch(`/vote/v1/polls/open/${pollId}`);
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

    toast.success(OPEN_POLL_SUCCESS_MESSAGE);
    return true;
  } catch (e) {
    console.warn(e);
  } finally {
    dispatch(pollsActions.setIsLoading(false));
  }
  return false;
};

export const closePoll = (pollId: string) => async (dispatch: Dispatch) => {
  const fetchData = () => {
    dispatch(pollsActions.setIsLoading(true));

    return api.patch(`/vote/v1/polls/close/${pollId}`);
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

    toast.success(CLOSE_POLL_SUCCESS_MESSAGE);
    return true;
  } catch (e) {
    console.warn(e);
  } finally {
    dispatch(pollsActions.setIsLoading(false));
  }
  return false;
};

export const editPoll = (poll: EditPollRequest) => async (dispatch: Dispatch) => {
  const fetchData = () => {
    dispatch(pollsActions.setIsLoading(true));

    return api.patch(`/vote/v1/polls/${poll.id}`, poll);
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

    toast.success(EDIT_POll_SUCCESS_MESSAGE);
    return true;
  } catch (e) {
    console.warn(e);
  } finally {
    dispatch(pollsActions.setIsLoading(false));
  }
  return false;
};

export const deletePoll = (pollId: string) => async (dispatch: Dispatch) => {
  const fetchData = () => {
    dispatch(pollsActions.setIsLoading(true));

    return api.delete(`vote/v1/polls/${pollId}`);
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

    toast.success(DELETE_POLL_SUCCESS_MESSAGE);
    return true;
  } catch (e) {
    console.warn(e);
  } finally {
    dispatch(pollsActions.setIsLoading(false));
  }
  return false;
};
