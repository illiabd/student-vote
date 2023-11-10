import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NewsData, State } from './types';

export const initialState: State = {
  newsData: undefined,
  isLoading: false,
};

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setNews(state, action: PayloadAction<NewsData>) {
      state.newsData = action.payload;
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    resetState() {
      return initialState;
    },
  },
});

export const newsActions = newsSlice.actions;
