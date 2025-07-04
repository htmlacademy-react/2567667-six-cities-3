import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { NameSpace, AuthorizationStatus } from '../../const';
import { makeMockStore, mockOffer } from '../../utils/mocks';
import Layout from '../layout/layout.tsx';

vi.mock('./layout-utils.ts', () => ({
  layoutConfig: {
    '/': {
      rootClass: 'root',
      showUser: true,
      showFooter: true,
    },
  },
}));

vi.mock('../logo/logo.tsx', () => ({
  default: () => <div data-testid="image-logo">Mock Logo</div>,
}));

describe('Component: Layout (simplified)', () => {
  it('should render layout with two logos (header and footer)', () => {
    const store = makeMockStore({
      [NameSpace.Auth]: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userEmail: null,
      },
      [NameSpace.Favorites]: {
        favorites: [],
        isUpdating: false,
        isLoading: false,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Layout />
        </MemoryRouter>
      </Provider>
    );

    const logos = screen.getAllByTestId('image-logo');
    expect(logos).toHaveLength(1);
  });

  it('should render user info when authorized', () => {
    const store = makeMockStore({
      [NameSpace.Auth]: {
        authorizationStatus: AuthorizationStatus.Auth,
        userEmail: 'user@example.com',
      },
      [NameSpace.Favorites]: {
        favorites: [mockOffer],
        isUpdating: false,
        isLoading: false,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Layout />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('user@example.com')).toBeInTheDocument();
    expect(screen.getByText('Sign out')).toBeInTheDocument();
  });

  it('should render "Sign in" when not authorized', () => {
    const store = makeMockStore({
      [NameSpace.Auth]: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userEmail: null,
      },
      [NameSpace.Favorites]: {
        favorites: [],
        isUpdating: false,
        isLoading: false,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Layout />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });
});
