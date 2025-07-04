import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';
import {makeMockStore, mockOffer} from '../../utils/mocks';
import NearPlacesList from './near-places-list';
import {SortType} from '../../const.ts';

describe('Component: NearPlacesList', () => {
  const mockStore = makeMockStore({
    auth: {
      authorizationStatus: 'AUTH',
      userEmail: 'test@test.com',
    },
    favorites: {
      favorites: [],
      isUpdating: false,
      isLoading: false,
    },
    offers: {
      offers: [mockOffer],
      isLoading: false,
      hasError: false,
      city: 'Paris',
      sortType: SortType.Popular
    },
  });

  it('renders offer cards when nearbyOffers are provided', () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <NearPlacesList nearbyOffers={[mockOffer]} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(mockOffer.title)).toBeInTheDocument();
  });

  it('renders fallback text when no offers', () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <NearPlacesList nearbyOffers={[]} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('No nearby places available')).toBeInTheDocument();
  });
});
