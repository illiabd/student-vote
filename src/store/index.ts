import { configureStore } from '@reduxjs/toolkit';

import { authSlice } from './auth/slice';
import { currentSlice } from './current/slice';
import { organisationsSlice } from './organisations/slice';
import { pollsSlice } from './polls/slice';

const reducer = {
  auth: authSlice.reducer,
  organisations: organisationsSlice.reducer,
  current: currentSlice.reducer,
  polls: pollsSlice.reducer,
};

const store = configureStore({ reducer, devTools: process.env.NODE_ENV !== 'production' });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
