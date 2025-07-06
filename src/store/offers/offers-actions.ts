import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance, AxiosError } from 'axios';
import { Offer } from '../../types/offer.ts';
import { AppDispatch, RootState } from '../index.ts';

export const fetchOffers = createAsyncThunk<
  Offer[],
  undefined,
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
    rejectValue: { status: number | null };
  }
>(
  'offers/fetchOffers',
  async (_arg, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.get<Offer[]>('/offers');
      return data;
    } catch (err) {
      const error = err as AxiosError;
      if (error.response) {
        return rejectWithValue({ status: error.response.status });
      }
      return rejectWithValue({ status: null });
    }
  }
);
