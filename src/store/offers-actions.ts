import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Offer } from '../types/offer';
import { AppDispatch, RootState } from './index';

export const fetchOffers = createAsyncThunk<Offer[], undefined, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'offers/fetchOffers',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Offer[]>('/offers');
    return data;
  }
);
