import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { PollData, State } from './types';

export const initialState: State = {
  pollsData: undefined,
  isLoading: false,
  isNextPageLoading: false,
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
    pushGroups(state, action: PayloadAction<PollData>) {
      if (!state.pollsData) {
        state.pollsData = action.payload;
        return;
      }

      const prevDocs = state.pollsData.docs;
      state.pollsData = action.payload;
      state.pollsData.docs.unshift(...prevDocs);
    },
    setIsNextPageLoading(state, action: PayloadAction<boolean>) {
      state.isNextPageLoading = action.payload;
    },
    resetState() {
      return initialState;
    },
  },
});

export const pollsActions = pollsSlice.actions;
