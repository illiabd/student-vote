/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrganisationsData, State } from './types';

export const initialState: State = {
  organisationsData: null,
  isLoading: false,
  error: [],
};

export const organisationsSlice = createSlice({
  name: 'organisations',
  initialState,
  reducers: {
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setOrganisationsData(state, action: PayloadAction<OrganisationsData>) {
      state.organisationsData = action.payload;
    },
    resetState() {
      return initialState;
    },
  },
});

export const organisationsActions = organisationsSlice.actions;
