import { configureStore, ThunkDispatch } from '@reduxjs/toolkit';
import { Action } from 'redux';
import { Offer, Review } from '../types/offer';
import { reducer } from '../store/reducer';
import { createAPI } from '../services/api';
import { RootState } from '../types/state';

export const extractActionTypes = (actions: Action<string>[]) =>
  actions.map(({ type }) => type);

export type AppThunkDispatch = ThunkDispatch<RootState, ReturnType<typeof createAPI>, Action>;

export const makeMockStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer: reducer,
    preloadedState: preloadedState as RootState,
  });

export const mockOffer: Offer = {
  id: 'offer-1',
  title: 'Mock Offer',
  type: 'apartment',
  price: 100,
  city: {
    name: 'Paris',
    location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 },
  },
  location: { latitude: 48.8566, longitude: 2.3522, zoom: 8 },
  isFavorite: false,
  isPremium: true,
  rating: 4.7,
  description: 'Test description',
  bedrooms: 2,
  goods: ['Wi-Fi', 'Kitchen'],
  host: {
    name: 'Host Name',
    avatarUrl: 'img/avatar.jpg',
    isPro: true,
  },
  previewImage: 'img/preview.jpg',
  images: ['img/image.jpg'],
  maxAdults: 4,
};

export const mockReview: Review = {
  id: 'review-1',
  user: {
    name: 'John Doe',
    avatarUrl: 'img/avatar.jpg',
    isPro: true,
  },
  rating: 5,
  comment: 'Great place!',
  date: '2023-05-01T12:00:00.000Z',
};

export const getMockDataSlice = (overrides = {}) => ({
  offers: [],
  isLoading: false,
  hasError: false,
  city: {
    name: 'Paris',
    location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 },
  },
  ...overrides,
});
