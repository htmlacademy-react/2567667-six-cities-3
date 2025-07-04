import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Outlet } from 'react-router-dom';
import { AppRoute, AuthorizationStatus, NameSpace } from '../../const.ts';
import { makeMockStore, getMockDataSlice } from '../../utils/mocks.ts';
import { RootState } from '../../types/state';
import App from './app.tsx';

vi.mock('../../pages/main-page/main-page', () => ({
  default: () => <div>Mock Main Page</div>,
}));

vi.mock('../../pages/login-page/login-page', () => ({
  default: () => <div>Mock Login Page</div>,
}));

vi.mock('../../pages/favorites-page/favorites-page', () => ({
  default: () => <div>Mock Favorites Page</div>,
}));

vi.mock('../../pages/offer-page/offer-page', () => ({
  default: () => <div>Mock Offer Page</div>,
}));

vi.mock('../../pages/not-found-page/not-found-page', () => ({
  default: () => <div>Mock Not Found Page</div>,
}));

vi.mock('../layout/layout', () => ({
  default: () => (
    <div>
      <div>Mock Layout</div>
      <Outlet />
    </div>
  ),
}));

vi.mock('../spinner/spinner', () => ({
  default: () => <div>Mock Spinner</div>,
}));

vi.mock('../scroll-to-top/scroll-to-top.tsx', () => ({
  default: () => null,
}));

vi.mock('../../store/selectors.ts', async () => {
  const actual = await vi.importActual<typeof import('../../store/selectors.ts')>(
    '../../store/selectors.ts'
  );
  return {
    ...actual,
    selectIsLoading: (state: RootState) => state.offers.isLoading,
    selectAuthorizationStatus: (state: RootState) => state.auth.authorizationStatus,
  };
});

vi.mock('../../store/offers/offers-actions.ts', async () => {
  const actual = await vi.importActual<typeof import('../../store/offers/offers-actions.ts')>(
    '../../store/offers/offers-actions.ts'
  );

  const fake = Object.assign(() => ({ type: 'offers/fake' }), {
    pending: { type: 'offers/fake/pending' },
    fulfilled: { type: 'offers/fake/fulfilled' },
    rejected: { type: 'offers/fake/rejected' },
  });

  return {
    ...actual,
    fetchOffers: fake,
  };
});

vi.mock('../../store/auth/auth-actions.ts', async () => {
  const actual = await vi.importActual<typeof import('../../store/auth/auth-actions.ts')>(
    '../../store/auth/auth-actions.ts'
  );

  const fake = Object.assign(() => ({ type: 'auth/fake' }), {
    pending: { type: 'auth/fake/pending' },
    fulfilled: { type: 'auth/fake/fulfilled' },
    rejected: { type: 'auth/fake/rejected' },
  });

  return {
    ...actual,
    checkAuthAction: fake,
    logoutAction: fake,
  };
});

describe('Component: App routing (final version)', () => {
  it('should render Spinner when loading or auth status unknown', () => {
    const store = makeMockStore({
      [NameSpace.Auth]: {
        authorizationStatus: AuthorizationStatus.Unknown,
        userEmail: null,
      },
      [NameSpace.Offers]: getMockDataSlice({ isLoading: true }),
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[AppRoute.Root]}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Mock Spinner')).toBeInTheDocument();
  });

  it('should render Main Page on "/"', () => {
    const store = makeMockStore({
      [NameSpace.Auth]: {
        authorizationStatus: AuthorizationStatus.Auth,
        userEmail: 'test@test.com',
      },
      [NameSpace.Offers]: getMockDataSlice({ isLoading: false }),
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[AppRoute.Root]}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Mock Main Page')).toBeInTheDocument();
  });

  it('should render Login Page on "/login"', () => {
    const store = makeMockStore({
      [NameSpace.Auth]: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userEmail: null,
      },
      [NameSpace.Offers]: getMockDataSlice({ isLoading: false }),
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[AppRoute.Login]}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Mock Login Page')).toBeInTheDocument();
  });

  it('should render Favorites Page on "/favorites" when user is authenticated', () => {
    const store = makeMockStore({
      [NameSpace.Auth]: {
        authorizationStatus: AuthorizationStatus.Auth,
        userEmail: 'test@test.com',
      },
      [NameSpace.Offers]: getMockDataSlice({ isLoading: false }),
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[AppRoute.Favorites]}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Mock Favorites Page')).toBeInTheDocument();
  });

  it('should render Login Page on "/favorites" when user is not authenticated', () => {
    const store = makeMockStore({
      [NameSpace.Auth]: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userEmail: null,
      },
      [NameSpace.Offers]: getMockDataSlice({ isLoading: false }),
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[AppRoute.Favorites]}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Mock Login Page')).toBeInTheDocument();
  });

  it('should render Offer Page on "/offer/:id"', () => {
    const store = makeMockStore({
      [NameSpace.Auth]: {
        authorizationStatus: AuthorizationStatus.Auth,
        userEmail: 'test@test.com',
      },
      [NameSpace.Offers]: getMockDataSlice({ isLoading: false }),
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/offer/123']}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Mock Offer Page')).toBeInTheDocument();
  });

  it('should render Not Found Page on invalid route', () => {
    const store = makeMockStore({
      [NameSpace.Auth]: {
        authorizationStatus: AuthorizationStatus.Auth,
        userEmail: 'test@test.com',
      },
      [NameSpace.Offers]: getMockDataSlice({ isLoading: false }),
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/some-invalid-route']}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Mock Not Found Page')).toBeInTheDocument();
  });
});
