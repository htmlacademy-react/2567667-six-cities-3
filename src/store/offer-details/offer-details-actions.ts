import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Offer, Review, ReviewPostData } from '../../types/offer.ts';

export const fetchOfferById = createAsyncThunk<Offer, string, { extra: AxiosInstance }>(
  'offerDetails/fetchById',
  async (id, { extra: api }) => {
    const { data } = await api.get<Offer>(`/offers/${id}`);
    return data;
  }
);

export const fetchReviewsByOfferId = createAsyncThunk<Review[], string, { extra: AxiosInstance }>(
  'offerDetails/fetchReviews',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<Review[]>(`/comments/${offerId}`);
    return data;
  }
);

export const postReview = createAsyncThunk<void, ReviewPostData, { extra: AxiosInstance }>(
  'offerDetails/postReview',
  async ({ comment, rating, offerId }, { dispatch, extra: api }) => {
    await api.post(`/comments/${offerId}`, { comment, rating });
    dispatch(fetchReviewsByOfferId(offerId));
  }
);
