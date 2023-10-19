/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NewsData, State } from './types';

export const initialState: State = {
  newsData: null,
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
    resetState(state) {
      return initialState;
    },
  },
});

export const newsActions = newsSlice.actions;
