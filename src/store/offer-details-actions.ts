import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Offer } from '../types/offer';

export const fetchOfferById = createAsyncThunk<Offer, string, { extra: AxiosInstance }>(
  'offerDetails/fetchById',
  async (id, { extra: api }) => {
    const { data } = await api.get<Offer>(`/offers/${id}`);
    return data;
  }
);
