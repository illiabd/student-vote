import axios, { AxiosError } from 'axios';

import * as constants from '../constants';
import { ICustomRequestConfig, RefreshTokensResponse } from './types';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL,
  withCredentials: true,
});

const responseErrorHandler = async (error: AxiosError) => {
  const originalRequest = error.config as ICustomRequestConfig;

  const isUnauthorized = error.response?.status === constants.UNAUTHORIZED_STATUS_CODE;
  const isFirstTry = !originalRequest.isRetried;

  if (isUnauthorized && originalRequest && isFirstTry) {
    originalRequest.isRetried = true;

    try {
      const requestURI = `${baseURL}/user/v1/refresh`;
      const accessToken = localStorage.getItem('accessToken');

      const response = await axios.post<RefreshTokensResponse>(
        requestURI,
        {},
        { withCredentials: true, headers: { Authorization: `JWT ${accessToken}` } },
      );

      localStorage.setItem('accessToken', response.data.data.accessToken);
      return await api.request(originalRequest);
    } catch (e) {
      console.log(e);
    }
  }
  return error;
};

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    return config;
  }

  if (config.headers) {
    config.headers.Authorization = `JWT ${accessToken}`;
  }

  return config;
});

api.interceptors.response.use((config) => config, responseErrorHandler);

export default api;
