import { configureStore } from '@reduxjs/toolkit';
import { reducer } from '../store/reducer';
import { Offer, Review } from '../types/offer';
import { AuthorizationStatus, SortType } from '../const';

export type ManualRootState = {
  auth: {
    authorizationStatus: AuthorizationStatus;
    userEmail: string | null;
  };
  offers: {
    offers: Offer[];
    isLoading: boolean;
    hasError: boolean;
    isServerUnavailable: boolean;
    city: string;
    sortType: SortType;
  };
  favorites: {
    favorites: Offer[];
    isUpdating: boolean;
    isLoading: boolean;
  };
};

export const makeMockStore = (preloadedState?: Partial<ManualRootState>) =>
  configureStore({
    reducer,
    preloadedState: preloadedState as ManualRootState,
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
  isServerUnavailable: false,
  city: 'Paris',
  sortType: SortType.Popular,
  ...overrides,
});
