import { Dispatch } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import api from '../../axios';
import * as constants from '../../constants';
import { handleResponseError } from '../../tools/api-error-handler';
import { pollsActions } from './slice';
import { Poll } from './types';

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

// export const createPoll = (poll: CreatePollRequest) => async (dispatch: Dispatch) => {
//   const fetchData = () => {
//     dispatch(pollsActions.setIsLoading(true));

//     return api.post('poll/v1', poll);
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

//     toast.success(constants.CREATE_VACANCY_SUCCESS_MESSAGE);
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

// export const archivePoll = (pollId?: string) => async (dispatch: Dispatch) => {
//   const fetchData = () => {
//     dispatch(pollsActions.setIsLoading(true));

//     const body = {
//       isPublished: false,
//     };

//     return api.post(`poll/v1/publication/${pollId}`, body);
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

//     toast.success(constants.UNPUBLISH_VACANCY_SUCCESS_MESSAGE);
//     return true;
//   } catch (e) {
//     console.warn(e);
//   } finally {
//     dispatch(pollsActions.setIsLoading(false));
//   }
//   return false;
// };

// export const publishPoll = (pollId?: string) => async (dispatch: Dispatch) => {
//   const fetchData = () => {
//     dispatch(pollsActions.setIsLoading(true));

//     const body = {
//       isPublished: true,
//     };

//     return api.post(`poll/v1/publication/${pollId}`, body);
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

//     toast.success(constants.PUBLISHED_VACANCY_SUCCESS_MESSAGE);
//     return true;
//   } catch (e) {
//     console.warn(e);
//   } finally {
//     dispatch(pollsActions.setIsLoading(false));
//   }
//   return false;
// };
