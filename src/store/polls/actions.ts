import { Dispatch } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import api from '../../axios';
import {
  CLOSE_POLL_SUCCESS_MESSAGE,
  CREATE_POLL_SUCCESS_MESSAGE,
  DELETE_POLL_SUCCESS_MESSAGE,
  OPEN_POLL_SUCCESS_MESSAGE,
} from '../../constants';
import { handleResponseError } from '../../tools/api-error-handler';
import store from '..';
import { pollsActions } from './slice';
import { CreatePollRequest, CreatePollResponse, NewQuestion, Poll, PollData } from './types';

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

export const findPollById = (pollId: string) => async (dispatch: Dispatch) => {
  const fetchData = () => {
    dispatch(pollsActions.setIsLoading(true));

    return api.get<Poll>(`/vote/v1/polls/${pollId}`);
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

    return response.data;
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

export const loadPolls = (organisationId: string) => async (dispatch: Dispatch) => {
  const fetchData = () => {
    const state = store.getState();
    const { pollsData } = state.polls;

    if (!pollsData?.hasNextPage) {
      console.log('no next page');
      return undefined;
    }

    dispatch(pollsActions.setIsNextPageLoading(true));

    return api.get<PollData>(`vote/v1/polls/organisation/${organisationId}`, {
      params: { page: pollsData.nextPage },
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

    dispatch(pollsActions.pushGroups(response.data));
  } catch (e) {
    console.warn(e);
  } finally {
    dispatch(pollsActions.setIsNextPageLoading(false));
  }

  return false;
};

export const updatePollData =
  (pollId: string, name: string, facultyNames?: string[]) => async (dispatch: Dispatch) => {
    const fetchData = () => {
      dispatch(pollsActions.setIsLoading(true));
      console.log({ name, facultyName: facultyNames });
      return api.patch<Poll>(`/vote/v1/polls/${pollId}`, {
        name,
        facultyNames: facultyNames ?? [],
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

        return false;
      }

      return true;
    } catch (e) {
      console.warn(e);
    } finally {
      dispatch(pollsActions.setIsLoading(false));
    }
    return false;
  };

export const createQuestion = (pollId: string, body: NewQuestion) => async (dispatch: Dispatch) => {
  const fetchData = () => {
    dispatch(pollsActions.setIsLoading(true));

    return api.post<Poll>(`/vote/v1/polls/${pollId}/question/`, body);
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

    return true;
  } catch (e) {
    console.warn(e);
  } finally {
    dispatch(pollsActions.setIsLoading(false));
  }
  return false;
};

export const deleteQuestion =
  (pollId: string, questionId: string) => async (dispatch: Dispatch) => {
    const fetchData = () => {
      dispatch(pollsActions.setIsLoading(true));

      return api.delete<Poll>(`/vote/v1/polls/${pollId}/question/${questionId}`);
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

      return true;
    } catch (e) {
      console.warn(e);
    } finally {
      dispatch(pollsActions.setIsLoading(false));
    }
    return false;
  };

export const putQuestion =
  (pollId: string, questionId: string, body: NewQuestion) => async (dispatch: Dispatch) => {
    const fetchData = () => {
      dispatch(pollsActions.setIsLoading(true));

      api.put<Poll>(`/vote/v1/polls/${pollId}/question/${questionId}`, body);
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

      return true;
    } catch (e) {
      console.warn(e);
    } finally {
      dispatch(pollsActions.setIsLoading(false));
    }
    return false;
  };
