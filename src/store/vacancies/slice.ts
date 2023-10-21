import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { State, VacanciesData } from './types';

export const initialState: State = {
  vacanciesData: undefined,
  isLoading: false,
};

export const vacanciesSlice = createSlice({
  name: 'vacancies',
  initialState,
  reducers: {
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setVacanciesData(state, action: PayloadAction<VacanciesData>) {
      state.vacanciesData = action.payload;
    },
    resetState() {
      return initialState;
    },
  },
});

export const vacanciesActions = vacanciesSlice.actions;
