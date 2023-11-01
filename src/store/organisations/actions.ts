import { Dispatch } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import api from '../../axios';
import { handleResponseError } from '../../tools/api-error-handler';
import { organisationsActions } from './slice';
import { FindOrganisationRequest, FindOrganisationResponse } from './types';

export const findOrganisations =
  (requestData?: FindOrganisationRequest) => async (dispatch: Dispatch) => {
    const fetchData = () => {
      dispatch(organisationsActions.setIsLoading(true));
      return api.post<FindOrganisationResponse>('organisation/v1/find', requestData);
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

      dispatch(organisationsActions.setOrganisationsData(response.data.data));
      return response.data.data;
    } catch (e) {
      console.warn(e);
    } finally {
      dispatch(organisationsActions.setIsLoading(false));
    }

    return false;
  };
