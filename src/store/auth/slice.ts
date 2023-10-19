/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { State, UserData } from './types';

export const initialState: State = {
  userData: null,
  needVerification: false,
  isLoading: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setNeedVerification(state, action: PayloadAction<boolean>) {
      state.needVerification = action.payload;
    },
    setUserData(state, action: PayloadAction<UserData>) {
      state.userData = action.payload;
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    resetState() {
      return initialState;
    },
  },
});

export const authActions = authSlice.actions;
