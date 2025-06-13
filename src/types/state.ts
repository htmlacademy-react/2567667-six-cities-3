import {Offer} from './offer.ts';
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { store } from '../store';
import { SortType } from '../const';

export type InitialState = {
  city: string;
  offers: Offer[];
  sortType: SortType;
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>;
