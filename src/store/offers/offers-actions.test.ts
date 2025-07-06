import MockAdapter from 'axios-mock-adapter';
import { createAPI } from '../../services/api';
import { makeMockStore, AppThunkDispatch } from '../../utils/mock-store';
import { fetchOffers } from './offers-actions';
import { toggleFavoriteStatus } from '../favorites/favorites-actions';
import { mockOffer } from '../../utils/mocks';
import {SortType} from '../../const.ts';

describe('Offers async actions', () => {
  const api = createAPI();
  const mockApi = new MockAdapter(api);
  const store = makeMockStore(undefined, api);
  const dispatch: AppThunkDispatch = store.dispatch;

  beforeEach(() => {
    mockApi.reset();
  });

  it('should fetch offers → fulfilled', async () => {
    mockApi.onGet('/offers').reply(200, [mockOffer]);

    await dispatch(fetchOffers());

    const state = store.getState().offers;
    expect(state.offers).toHaveLength(1);
    expect(state.offers[0].id).toBe(mockOffer.id);
    expect(state.isLoading).toBe(false);
    expect(state.hasError).toBe(false);
  });

  it('should set hasError = true on fetchOffers fail', async () => {
    const customStore = makeMockStore(undefined, api);
    const customDispatch: AppThunkDispatch = customStore.dispatch;

    mockApi.onGet('/offers').reply(500);

    await customDispatch(fetchOffers());

    const state = customStore.getState().offers;
    expect(state.hasError).toBe(true);
    expect(state.isLoading).toBe(false);
    expect(state.offers).toEqual([]);
  });

  it('should update offer in list on toggleFavoriteStatus.fulfilled', async () => {
    const updatedOffer = { ...mockOffer, isFavorite: !mockOffer.isFavorite };

    const customStore = makeMockStore(
      {
        offers: {
          offers: [mockOffer],
          isLoading: false,
          hasError: false,
          isServerUnavailable: false,
          city: 'Paris',
          sortType: SortType.Popular,
        },
      },
      api
    );
    const customDispatch: AppThunkDispatch = customStore.dispatch;

    mockApi.onPost(`/favorite/${mockOffer.id}/1`).reply(200, updatedOffer);

    await customDispatch(toggleFavoriteStatus({ offerId: mockOffer.id, status: 1 }));

    const state = customStore.getState().offers;
    expect(state.offers[0].isFavorite).toBe(updatedOffer.isFavorite);
  });
});
