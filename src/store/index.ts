import { configureStore } from '@reduxjs/toolkit';

import { organisationsSlice } from './organisations/slice';
import { currentSlice } from './current/slice';
import { authSlice } from './auth/slice';
import { newsSlice } from './news/slice';
import { vacanciesSlice } from './vacancies/slice';
import { scheduleSlice } from './schedule/slice';

const reducer = {
  auth: authSlice.reducer,
  organisations: organisationsSlice.reducer,
  vacancies: vacanciesSlice.reducer,
  current: currentSlice.reducer,
  schedule: scheduleSlice.reducer,
  news: newsSlice.reducer,
};

const store = configureStore({ reducer, devTools: import.meta.env.NODE_ENV !== 'production' });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
