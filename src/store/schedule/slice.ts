/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ScheduleData, State } from './types';

export const initialState: State = {
  scheduleData: null,
  selectedDivision: null,
  isLoading: false,
  error: [],
};

export const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },

    setScheduleData(state, action: PayloadAction<ScheduleData>) {
      state.scheduleData = action.payload;
    },

    setSelectedDivision(state, action: PayloadAction<string>) {
      state.selectedDivision = action.payload;
    },

    pushEvents(state, action: PayloadAction<ScheduleData>) {
      const prevDocs = state.scheduleData.docs;
      state.scheduleData = action.payload;
      state.scheduleData.docs.unshift(...prevDocs);
    },

    resetState() {
      return initialState;
    },
  },
});

export const scheduleActions = scheduleSlice.actions;
