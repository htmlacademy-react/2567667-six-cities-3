import { describe, it, expect, beforeEach, afterEach, vi, Mock } from 'vitest';

const navigateMock = vi.fn();

vi.mock('react-redux', async () => {
  const actual: typeof import('react-redux') = await vi.importActual('react-redux');
  return {
    ...actual,
    useDispatch: vi.fn(),
    useSelector: vi.fn(),
  };
});
vi.mock('react-router-dom', async () => {
  const actual: typeof import('react-router-dom') = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigateMock,
    MemoryRouter: actual.MemoryRouter,
    Link: actual.Link,
    generatePath: actual.generatePath,
  };
});
vi.mock('../../utils/rating', () => ({
  getRatingWidth: () => '80%',
}));
vi.mock('../bookmark-button/bookmark-button', () => ({
  default: (props: {
    isActive: boolean;
    isDisabled: boolean;
    onClick: () => void;
  }) => (
    <button
      data-testid="bookmark-button"
      disabled={props.isDisabled}
      aria-pressed={props.isActive}
      onClick={props.onClick}
    />
  ),
}));

import { fireEvent, render, screen, cleanup } from '@testing-library/react';
import OfferCard from './offer-card';
import { mockOffer } from '../../utils/mocks';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { makeMockStore } from '../../utils/mocks';
import * as reactRedux from 'react-redux';
import { AuthorizationStatus } from '../../const';

describe('Component: OfferCard', () => {
  let store: ReturnType<typeof makeMockStore>;
  let dispatchMock: Mock;
  let useDispatchMock: Mock;
  let useSelectorMock: Mock;

  beforeEach(() => {
    store = makeMockStore({
      auth: { authorizationStatus: AuthorizationStatus.Auth, userEmail: 'test@mail.com' },
      favorites: { favorites: [], isUpdating: false, isLoading: false },
    });

    useDispatchMock = reactRedux.useDispatch as unknown as Mock;
    useSelectorMock = reactRedux.useSelector as unknown as Mock;
    dispatchMock = vi.fn();
    useDispatchMock.mockReturnValue(dispatchMock);

    useSelectorMock.mockImplementation((selector: (s: unknown) => unknown) => {
      if (selector.name === 'selectAuthorizationStatus') {
        return AuthorizationStatus.Auth;
      }
      if (selector.name === 'selectIsFavoritesUpdating') {
        return false;
      }
      return undefined;
    });

    navigateMock.mockClear();
  });

  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  function renderCard(props: Record<string, unknown> = {}) {
    return render(
      <Provider store={store}>
        <MemoryRouter>
          <OfferCard offer={mockOffer} {...props} />
        </MemoryRouter>
      </Provider>
    );
  }

  it('renders offer card with correct data', () => {
    renderCard();
    expect(screen.getByTestId('offer-card')).toBeInTheDocument();
    expect(screen.getByTestId('offer-title')).toHaveTextContent(mockOffer.title);
    expect(screen.getByTestId('offer-type')).toHaveTextContent(mockOffer.type);
    expect(screen.getByTestId('price')).toHaveTextContent(String(mockOffer.price));
    expect(screen.getByAltText(mockOffer.title)).toBeInTheDocument();
    expect(screen.getByTestId('bookmark-button')).toBeInTheDocument();
    expect(screen.getByTestId('premium-badge')).toBeInTheDocument();
  });

  it('does not render premium badge if isPremium=false', () => {
    renderCard({ offer: { ...mockOffer, isPremium: false } });
    expect(screen.queryByTestId('premium-badge')).toBeNull();
  });

  it('applies correct class for cardType=favorites', () => {
    renderCard({ cardType: 'favorites' });
    expect(screen.getByTestId('offer-card')).toHaveClass('favorites__card');
  });

  it('applies correct class for cardType=near-places', () => {
    renderCard({ cardType: 'near-places' });
    expect(screen.getByTestId('offer-card')).toHaveClass('near-places__card');
  });

  it('applies correct class for cardType=cities', () => {
    renderCard({ cardType: 'cities' });
    expect(screen.getByTestId('offer-card')).toHaveClass('cities__card');
  });

  it('calls onMouseEnter and onMouseLeave', () => {
    const onEnter = vi.fn();
    const onLeave = vi.fn();
    renderCard({ onMouseEnter: onEnter, onMouseLeave: onLeave });
    fireEvent.mouseEnter(screen.getByTestId('offer-card'));
    expect(onEnter).toHaveBeenCalled();
    fireEvent.mouseLeave(screen.getByTestId('offer-card'));
    expect(onLeave).toHaveBeenCalled();
  });

  it('dispatches toggleFavoriteStatus if authorized', () => {
    renderCard({ offer: { ...mockOffer, isFavorite: false } });
    fireEvent.click(screen.getByTestId('bookmark-button'));
    expect(dispatchMock).toHaveBeenCalled();
  });

  it('navigates to login if not authorized', () => {
    useSelectorMock.mockImplementation((selector: (s: unknown) => unknown) =>
      selector.name === 'selectAuthorizationStatus'
        ? AuthorizationStatus.NoAuth
        : false
    );
    renderCard({ offer: { ...mockOffer, isFavorite: false } });
    fireEvent.click(screen.getByTestId('bookmark-button'));
    expect(navigateMock).toHaveBeenCalledWith('/login');
  });

  it('disables bookmark button if isUpdating', () => {
    useSelectorMock.mockImplementation((selector: (s: unknown) => unknown) =>
      selector.name === 'selectIsFavoritesUpdating'
        ? true
        : AuthorizationStatus.Auth
    );
    renderCard();
    expect(screen.getByTestId('bookmark-button')).toBeDisabled();
  });

  it('sets bookmark as active if isFavorite', () => {
    renderCard({ offer: { ...mockOffer, isFavorite: true } });
    expect(screen.getByTestId('bookmark-button')).toHaveAttribute('aria-pressed', 'true');
  });

  it('renders correct image size for favorites cardType', () => {
    renderCard({ cardType: 'favorites' });
    const img = screen.getByAltText(mockOffer.title);
    expect(img).toHaveAttribute('width', '150');
    expect(img).toHaveAttribute('height', '110');
  });

  it('link navigates to correct offer page', () => {
    renderCard();
    const links = screen.getAllByRole('link');
    links.forEach((link) => {
      expect(link).toHaveAttribute('href', `/offer/${mockOffer.id}`);
    });
  });
});
