import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Offer } from '../../types/offer';

export const toggleFavoriteStatus = createAsyncThunk<
  Offer,
  { offerId: string; status: number },
  { extra: AxiosInstance }
>(
  'favorites/toggleStatus',
  async ({ offerId, status }, { extra: api }) => {
    const { data } = await api.post<Offer>(`/favorite/${offerId}/${status}`);
    return data;
  }
);

export const fetchFavoriteOffers = createAsyncThunk<
  Offer[],
  undefined,
  { extra: AxiosInstance }
>(
  'favorites/fetchAll',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Offer[]>('/favorite');
    return data;
  }
);
