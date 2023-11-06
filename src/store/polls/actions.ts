import { Dispatch } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import api from '../../axios';
import {
  ACTIVATE_POLL_SUCCESS_MESSAGE,
  CREATE_POLL_SUCCESS_MESSAGE,
  DEACTIVATE_POLL_SUCCESS_MESSAGE,
} from '../../constants';
import { handleResponseError } from '../../tools/api-error-handler';
import store from '..';
import { pollsActions } from './slice';
import { CreatePollRequest, Poll } from './types';

export const findPolls = (organisationId: string) => async (dispatch: Dispatch) => {
  const fetchData = () => {
    dispatch(pollsActions.setIsLoading(true));

    return api.get<Poll[]>(`vote/v1/polls/organisation/${organisationId}`);
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

    return api.post('vote/v1/polls', poll);
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
    return true;
  } catch (e) {
    console.warn(e);
  } finally {
    dispatch(pollsActions.setIsLoading(false));
  }
  return false;
};

export const publishPoll = (pollId?: string) => async (dispatch: Dispatch) => {
  const fetchData = () => {
    dispatch(pollsActions.setIsLoading(true));

    const state = store.getState();
    const poll = state.polls.pollsData?.find((poll) => poll.id === pollId);
    if (!poll) {
      return;
    }

    const body = {
      ...poll,
      status: 'active',
    };

    return api.patch(`/vote/v1/polls/${pollId}`, body);
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

    toast.success(ACTIVATE_POLL_SUCCESS_MESSAGE);
    return true;
  } catch (e) {
    console.warn(e);
  } finally {
    dispatch(pollsActions.setIsLoading(false));
  }
  return false;
};

export const archivePoll = (pollId?: string) => async (dispatch: Dispatch) => {
  const fetchData = () => {
    dispatch(pollsActions.setIsLoading(true));

    const state = store.getState();
    const poll = state.polls.pollsData?.find((poll) => poll.id === pollId);
    if (!poll) {
      return;
    }

    const body = {
      ...poll,
      status: 'created',
    };

    return api.patch(`/vote/v1/polls/${pollId}`, body);
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

    toast.success(DEACTIVATE_POLL_SUCCESS_MESSAGE);
    return true;
  } catch (e) {
    console.warn(e);
  } finally {
    dispatch(pollsActions.setIsLoading(false));
  }
  return false;
};

// export const deletePoll = (pollId?: string) => async (dispatch: Dispatch) => {
//   const fetchData = () => {
//     dispatch(pollsActions.setIsLoading(true));

//     return api.delete(`poll/v1/${pollId}`);
//   };

//   try {
//     const response = await fetchData();

//     if (axios.isAxiosError(response)) {
//       const error = response as AxiosError;
//       const statusCode = error?.response?.status;

//       switch (statusCode) {
//         default:
//           handleResponseError(error);
//           break;
//       }

//       return false;
//     }

//     toast.success(constants.DELETE_VACANCY_SUCCESS_MESSAGE);
//     return true;
//   } catch (e) {
//     console.warn(e);
//   } finally {
//     dispatch(pollsActions.setIsLoading(false));
//   }
//   return false;
// };

// export const patchPoll = (poll: EditPollRequest) => async (dispatch: Dispatch) => {
//   const fetchData = () => {
//     dispatch(pollsActions.setIsLoading(true));

//     return api.patch(`poll/v1/${poll.id}`, poll);
//   };

//   try {
//     const response = await fetchData();

//     if (axios.isAxiosError(response)) {
//       const error = response as AxiosError;
//       const statusCode = error?.response?.status;

//       switch (statusCode) {
//         default:
//           handleResponseError(error);
//           break;
//       }

//       return false;
//     }

//     toast.success(constants.EDIT_VACANCY_SUCCESS_MESSAGE);
//     return true;
//   } catch (e) {
//     console.warn(e);
//   } finally {
//     dispatch(pollsActions.setIsLoading(false));
//   }
//   return false;
// };
