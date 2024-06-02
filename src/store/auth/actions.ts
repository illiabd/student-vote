import { Dispatch } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import api from '../../axios';
import * as constants from '../../constants';
import { handleResponseError } from '../../tools/api-error-handler';
import { currentActions } from '../current/slice';
import { organisationsActions } from '../organisations/slice';
import { authActions } from './slice';
import { GetUserResponse, LoginResponse, VerifyResponse } from './types';

export const loginUser = (phoneNumber: string, password: string) => async (dispatch: Dispatch) => {
  const fetchData = () => {
    dispatch(authActions.setIsLoading(true));
    const requestData = { phoneNumber, password };
    return api.post<LoginResponse>('/admin/login', requestData);
  };

  try {
    const response = await fetchData();

    if (axios.isAxiosError(response)) {
      const error = response as AxiosError;
      const statusCode = error?.response?.status;

      switch (statusCode) {
        case 400:
          toast.warn(constants.WRONG_PHONE_NUMBER_MESSAGE);
          break;
        default:
          handleResponseError(error);
          break;
      }
      return;
    }

    localStorage.setItem('oneTimeToken', response.data.data.oneTimeToken);
    dispatch(authActions.setNeedVerification(true));
  } catch (e) {
    console.warn(e);
  } finally {
    dispatch(authActions.setIsLoading(false));
  }
};

export const verifyCode = (code: string) => async (dispatch: Dispatch) => {
  const verifyUser = () => {
    dispatch(authActions.setIsLoading(true));

    const oneTimeToken = localStorage.getItem('oneTimeToken');
    const requestData = {
      code,
      oneTimeToken,
    };

    return api.post<VerifyResponse>('/user/verify', requestData);
  };

  try {
    const response = await verifyUser();

    if (axios.isAxiosError(response)) {
      const error = response as AxiosError;
      const statusCode = error?.response?.status;

      switch (statusCode) {
        case 401:
          toast.warn(constants.WRONG_VERIFICATION_CODE);
          break;
        default:
          handleResponseError(error);
          break;
      }
      return false;
    }

    localStorage.clear();
    localStorage.setItem('accessToken', response.data.data.accessToken);

    dispatch(authActions.setNeedVerification(false));

    return true;
  } catch (e) {
    console.warn(e);
  } finally {
    dispatch(authActions.setIsLoading(false));
  }

  return false;
};

export const getUser = () => async (dispatch: Dispatch) => {
  const fetchData = async () => {
    dispatch(authActions.setIsLoading(true));
    return api.get<GetUserResponse>('/user/');
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

    dispatch(authActions.setUserData(response.data.data.user));
    return true;
  } catch (e) {
    console.warn(e);
  } finally {
    dispatch(authActions.setIsLoading(false));
  }
  return false;
};

export const logout = () => async (dispatch: Dispatch) => {
  const fetchData = async () => {
    dispatch(authActions.setIsLoading(true));
    return api.post<GetUserResponse>('/user/logout');
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

    dispatch(authActions.resetState());
    dispatch(currentActions.resetState());
    dispatch(organisationsActions.resetState());

    localStorage.clear();

    return true;
  } catch (e) {
    console.warn(e);
  } finally {
    dispatch(authActions.setIsLoading(false));
  }

  return false;
};
