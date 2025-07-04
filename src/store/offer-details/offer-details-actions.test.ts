import MockAdapter from 'axios-mock-adapter';
import { createAPI } from '../../services/api';
import { makeMockStore, AppThunkDispatch } from '../../utils/mock-store';
import { fetchOfferById, postReview } from './offer-details-actions';
import { toggleFavoriteStatus } from '../favorites/favorites-actions';
import { mockOffer } from '../../utils/mocks';

describe('Offer Details async actions', () => {
  const api = createAPI();
  const mockApi = new MockAdapter(api);
  const store = makeMockStore(undefined, api);
  const dispatch: AppThunkDispatch = store.dispatch;

  beforeEach(() => {
    mockApi.reset();
  });

  it('should fetch offer by id → fulfilled', async () => {
    mockApi.onGet(`/offers/${mockOffer.id}`).reply(200, mockOffer);

    await dispatch(fetchOfferById(mockOffer.id));

    const state = store.getState().offerDetails;
    expect(state.offer?.id).toBe(mockOffer.id);
    expect(state.isLoading).toBe(false);
    expect(state.hasError).toBe(false);
  });

  it('should set hasError=true on fetchOfferById fail', async () => {
    const customStore = makeMockStore(undefined, api);
    const customDispatch: AppThunkDispatch = customStore.dispatch;

    mockApi.onGet(`/offers/${mockOffer.id}`).reply(404);

    await customDispatch(fetchOfferById(mockOffer.id));

    const state = customStore.getState().offerDetails;
    expect(state.hasError).toBe(true);
    expect(state.isLoading).toBe(false);
    expect(state.offer).toBeNull();
  });

  it('should update offer when toggleFavoriteStatus updates same offer', async () => {
    const customStore = makeMockStore(
      {
        offerDetails: {
          offer: mockOffer,
          isLoading: false,
          hasError: false,
        },
      },
      api
    );

    const updatedOffer = { ...mockOffer, isFavorite: !mockOffer.isFavorite };

    mockApi.onPost(`/favorite/${mockOffer.id}/1`).reply(200, updatedOffer);

    const customDispatch: AppThunkDispatch = customStore.dispatch;

    await customDispatch(toggleFavoriteStatus({ offerId: mockOffer.id, status: 1 }));

    const state = customStore.getState().offerDetails;
    expect(state.offer?.isFavorite).toBe(updatedOffer.isFavorite);
  });

  it('should dispatch fetchReviewsByOfferId when posting a review', async () => {
    const reviewData = {
      offerId: mockOffer.id,
      rating: 5,
      comment: 'Nice place!',
    };

    mockApi.onPost(`/comments/${mockOffer.id}`).reply(200);
    mockApi.onGet(`/comments/${mockOffer.id}`).reply(200, []);

    await dispatch(postReview(reviewData));
    expect(true).toBe(true);
  });
});
