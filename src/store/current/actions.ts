import { Dispatch } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import api from '../../axios';
import * as constants from '../../constants';
import { handleResponseError } from '../../tools/api-error-handler';
import store from '..';
import { currentActions } from './slice';
import {
  CreateOrganisationRequest,
  FindGroupFilters,
  FindGroupRequestBody,
  FindGroupsResponse,
  FindMembersParams,
  FindMembersResponse,
  GroupsFields,
  PatchOrganisationRequest,
  PatchUserRequest,
  UploadProfilePictureRequest,
  UploadProfilePictureResponse,
} from './types';

export const createOrganisation =
  (requestData: CreateOrganisationRequest) => async (dispatch: Dispatch) => {
    const fetchData = () => {
      dispatch(currentActions.setIsLoading(true));
      const body = {
        ...requestData,
        link: requestData.link === '' ? undefined : requestData.link,
        douLink: requestData.douLink === '' ? undefined : requestData.douLink,
      };
      return api.post('organisation/company', body);
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
      dispatch(currentActions.setIsLoading(false));
    }

    return false;
  };

export const patchUser = (requestData: PatchUserRequest) => async (dispatch: Dispatch) => {
  const fetchData = () => {
    dispatch(currentActions.setIsLoading(true));
    return api.patch('admin/v1/', requestData);
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
    dispatch(currentActions.setIsLoading(false));
  }

  return false;
};

export const findStaff =
  (organisationId: string, params?: FindMembersParams) => async (dispatch: Dispatch) => {
    const fetchData = () => {
      const roles = ['admin', 'member', 'owner'];

      dispatch(currentActions.setIsLoading(true));
      return api.get<FindMembersResponse>('organisation/role/v1', {
        params: { organisationId, roles, ...params },
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

      dispatch(currentActions.setStaff(response.data.data.docs));
      return true;
    } catch (e) {
      console.warn(e);
    } finally {
      dispatch(currentActions.setIsLoading(false));
    }
    return false;
  };

export const findGroups = (filters?: FindGroupFilters) => async (dispatch: Dispatch) => {
  const fetchData = () => {
    const body = {
      filters,
      fields: ['name', 'users'],
    };

    dispatch(currentActions.setIsLoading(true));
    return api.post<FindGroupsResponse>('organisation/group/v1/find', body);
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

    dispatch(currentActions.setGroups(response.data.data));
  } catch (e) {
    console.warn(e);
  } finally {
    dispatch(currentActions.setIsLoading(false));
  }

  return false;
};

export const loadGroups = (filters?: FindGroupFilters) => async (dispatch: Dispatch) => {
  const fetchData = () => {
    const state = store.getState();
    const { groupsData } = state.current;

    if (!groupsData?.hasNextPage) {
      return undefined;
    }

    const body: FindGroupRequestBody = {
      filters,
      page: groupsData.nextPage,
      fields: [GroupsFields.name, GroupsFields.users],
    };

    dispatch(currentActions.setIsNextPageLoading(true));
    return api.post<FindGroupsResponse>('organisation/group/v1/find', body);
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

    dispatch(currentActions.pushGroups(response.data.data));
  } catch (e) {
    console.warn(e);
  } finally {
    dispatch(currentActions.setIsNextPageLoading(false));
  }

  return false;
};

export const findStudents =
  (organisationId: string, params?: FindMembersParams) => async (dispatch: Dispatch) => {
    const fetchData = () => {
      const roles = ['student'];

      dispatch(currentActions.setIsLoading(true));
      return api.get<FindMembersResponse>('organisation/role/v1', {
        params: { organisationId, roles, limit: 50, ...params },
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

      dispatch(currentActions.setStudents(response.data.data));
    } catch (e) {
      console.warn(e);
    } finally {
      dispatch(currentActions.setIsLoading(false));
    }
    return false;
  };

export const loadStudents =
  (organisationId: string, params?: FindMembersParams) => async (dispatch: Dispatch) => {
    const fetchData = () => {
      const roles = ['student'];

      const state = store.getState();
      const { studentsData } = state.current;

      if (!studentsData?.hasNextPage) {
        return undefined;
      }

      const requestData = {
        page: studentsData.nextPage,
        organisationId,
        roles,
        ...params,
      };

      dispatch(currentActions.setIsNextPageLoading(true));
      return api.get<FindMembersResponse>('organisation/role/v1', {
        params: requestData,
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

      dispatch(currentActions.pushStudents(response.data.data));
    } catch (e) {
      console.warn(e);
    } finally {
      dispatch(currentActions.setIsNextPageLoading(false));
    }
    return false;
  };

export const putStudentIntoGroup =
  (groupId: string, studentId: string) => async (dispatch: Dispatch) => {
    const fetchData = async () => {
      dispatch(currentActions.setIsLoading(true));
      return api.put(`/organisation/group/v1/${groupId}/member/${studentId}`);
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

      toast.success(constants.ADD_STUDENT_TO_GROUP_SUCCESS_MESSAGE);
      return true;
    } catch (e) {
      console.warn(e);
    } finally {
      dispatch(currentActions.setIsLoading(false));
    }

    return false;
  };

export const deleteStaff =
  (organisationId: string, userId: string) => async (dispatch: Dispatch) => {
    const fetchData = async () => {
      dispatch(currentActions.setIsLoading(true));
      return api.delete('/organisation/role/v1', { data: { organisationId, userId } });
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

      toast.success(constants.DELETE_USER_SUCCESS_MESSAGE);
      return true;
    } catch (e) {
      console.warn(e);
    } finally {
      dispatch(currentActions.setIsLoading(false));
    }

    return false;
  };

export const setMemberRole =
  (userId: string, organisationId: string, role: string) => async (dispatch: Dispatch) => {
    const fetchData = async () => {
      const body = {
        organisationId,
        userId,
        role,
      };

      return api.put('/organisation/role/v1', body);
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

      toast.success(constants.CHANGE_USER_ROLE_SUCCESS_MESSAGE);
      return true;
    } catch (e) {
      console.warn(e);
    } finally {
      dispatch(currentActions.setIsLoading(false));
    }

    return false;
  };

export const addMember =
  (phoneNumber: string, organisationId: string) => async (dispatch: Dispatch) => {
    const fetchData = async () => {
      const body = {
        // commentFromBackend: this will not work either
        phoneNumber,
        role: 'admin',
        organisationId,
      };
      return api.put('/organisation/role/v1', body);
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

      toast.success(constants.ADD_MEMBER_SUCCESS_MESSAGE);
      return true;
    } catch (e) {
      console.warn(e);
    } finally {
      dispatch(currentActions.setIsLoading(false));
    }

    return false;
  };

export const uploadProfilePicture =
  (requestData: UploadProfilePictureRequest) => async (dispatch: Dispatch) => {
    const fetchData = () => {
      dispatch(currentActions.setIsLoading(true));
      return api.post<UploadProfilePictureResponse>('paperless/v1/profile-picture/', requestData, {
        headers: {
          'Content-Type': 'multipart/form-data',
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

        return undefined;
      }

      return response.data.data;
    } catch (e) {
      console.warn(e);
    } finally {
      dispatch(currentActions.setIsLoading(false));
    }

    return undefined;
  };

export const patchOrganisation =
  (requestData: PatchOrganisationRequest) => async (dispatch: Dispatch) => {
    const fetchData = () => {
      dispatch(currentActions.setIsLoading(true));
      return api.patch(`organisation/v1/${requestData.id}`, requestData);
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
      dispatch(currentActions.setIsLoading(false));
    }

    return false;
  };
