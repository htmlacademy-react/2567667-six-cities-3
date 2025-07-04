import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { RootState } from '../types/state';
import { reducer } from '../store/reducer';
import { createAPI } from '../services/api';

export type AppThunkDispatch = ThunkDispatch<RootState, ReturnType<typeof createAPI>, Action>;
export type AppMockStore = EnhancedStore<RootState>;

export const makeMockStore = (
  preloadedState?: Partial<RootState>,
  apiInstance: ReturnType<typeof createAPI> = createAPI()
): AppMockStore =>
  configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: { extraArgument: apiInstance },
      }),
    preloadedState: preloadedState as RootState,
  });
