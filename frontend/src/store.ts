import { configureStore } from '@reduxjs/toolkit';
import stakingReducer from './Features/stakingSlice';
import headerUIReducer from './Features/headerUISlice';

export const store = configureStore({
  reducer: {
    staking: stakingReducer,
    headerUI: headerUIReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
