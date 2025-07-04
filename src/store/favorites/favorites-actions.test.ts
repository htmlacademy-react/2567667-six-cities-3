import MockAdapter from 'axios-mock-adapter';
import { createAPI } from '../../services/api';
import { makeMockStore, AppThunkDispatch } from '../../utils/mock-store';
import { fetchFavoriteOffers, toggleFavoriteStatus } from './favorites-actions';
import { mockOffer } from '../../utils/mocks';

describe('Favorites async actions', () => {
  const api = createAPI();
  const mockApi = new MockAdapter(api);
  const store = makeMockStore(undefined, api);
  const dispatch: AppThunkDispatch = store.dispatch;

  beforeEach(() => {
    mockApi.reset();
  });

  it('should fetch favorite offers correctly', async () => {
    mockApi.onGet('/favorite').reply(200, [mockOffer]);

    await dispatch(fetchFavoriteOffers());

    const state = store.getState().favorites;
    expect(state.favorites).toHaveLength(1);
    expect(state.favorites[0].id).toBe(mockOffer.id);
    expect(state.isLoading).toBe(false);
  });

  it('should set isLoading = false on fetchFavoriteOffers fail', async () => {
    const customStore = makeMockStore(undefined, api);
    const customDispatch: AppThunkDispatch = customStore.dispatch;

    mockApi.onGet('/favorite').reply(500);

    await customDispatch(fetchFavoriteOffers());

    const state = customStore.getState().favorites;
    expect(state.isLoading).toBe(false);
    expect(state.favorites).toEqual([]);
  });

  it('should add offer to favorites on toggleFavoriteStatus → isFavorite = true', async () => {
    const favoriteOffer = { ...mockOffer, isFavorite: true };

    mockApi.onPost(`/favorite/${mockOffer.id}/1`).reply(200, favoriteOffer);

    await dispatch(toggleFavoriteStatus({ offerId: mockOffer.id, status: 1 }));

    const state = store.getState().favorites;
    expect(state.favorites.some((o) => o.id === mockOffer.id)).toBe(true);
    expect(state.isUpdating).toBe(false);
  });

  it('should remove offer from favorites on toggleFavoriteStatus → isFavorite = false', async () => {
    const customStore = makeMockStore(
      {
        favorites: {
          favorites: [mockOffer],
          isLoading: false,
          isUpdating: true,
        },
      },
      api
    );

    const customDispatch: AppThunkDispatch = customStore.dispatch;
    const unfavoriteOffer = { ...mockOffer, isFavorite: false };

    mockApi.onPost(`/favorite/${mockOffer.id}/0`).reply(200, unfavoriteOffer);

    await customDispatch(toggleFavoriteStatus({ offerId: mockOffer.id, status: 0 }));

    const state = customStore.getState().favorites;
    expect(state.favorites.some((o) => o.id === mockOffer.id)).toBe(false);
    expect(state.isUpdating).toBe(false);
  });
});
