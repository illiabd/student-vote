import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { PollData, State } from './types';

export const initialState: State = {
  pollsData: undefined,
  isLoading: false,
};

export const pollsSlice = createSlice({
  name: 'polls',
  initialState,
  reducers: {
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setPollsData(state, action: PayloadAction<PollData>) {
      state.pollsData = action.payload;
    },
    resetState() {
      return initialState;
    },
  },
});

export const pollsActions = pollsSlice.actions;
