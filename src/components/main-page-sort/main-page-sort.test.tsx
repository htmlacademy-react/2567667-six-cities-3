import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { makeMockStore } from '../../utils/mocks';
import MainPageSort from './main-page-sort';
import { SortType, SORT_OPTIONS } from '../../const';
import { getMockDataSlice } from '../../utils/mocks';
import { setSortType } from '../../store/offers/offers-slice';

let mockStore: ReturnType<typeof makeMockStore>;

beforeEach(() => {
  mockStore = makeMockStore({
    offers: getMockDataSlice({ sortType: SortType.Popular }),
  });
});

describe('Component: MainPageSort', () => {
  it('renders with initial sort type', () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <MainPageSort />
        </MemoryRouter>
      </Provider>
    );
    const sortTypeElement = screen.getByText(SortType.Popular, { selector: 'span.places__sorting-type' });
    expect(sortTypeElement).toBeInTheDocument();
    expect(screen.getByText('Sort by')).toBeInTheDocument();
  });

  it('toggles options list on click', () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <MainPageSort />
        </MemoryRouter>
      </Provider>
    );
    const sortTypeElement = screen.getByText(SortType.Popular, { selector: 'span.places__sorting-type' });
    expect(screen.queryByRole('list')).not.toHaveClass('places__options--opened');

    fireEvent.click(sortTypeElement);
    expect(screen.getByRole('list')).toHaveClass('places__options--opened');

    fireEvent.click(sortTypeElement);
    expect(screen.queryByRole('list')).not.toHaveClass('places__options--opened');
  });

  it('selects new sort type and closes list', () => {
    const newSortType = SORT_OPTIONS[1];
    const store = mockStore;
    const dispatchSpy = vi.spyOn(store, 'dispatch');

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPageSort />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByText(SortType.Popular, { selector: 'span.places__sorting-type' }));
    const optionElement = screen.getByText(newSortType);
    fireEvent.click(optionElement);

    expect(dispatchSpy).toHaveBeenCalledWith(setSortType(newSortType));
    expect(screen.queryByRole('list')).not.toHaveClass('places__options--opened');
    expect(screen.getByText(newSortType, { selector: 'span.places__sorting-type' })).toBeInTheDocument();
  });

  it('highlights active sort option', () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <MainPageSort />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(SortType.Popular, { selector: 'span.places__sorting-type' })).toBeInTheDocument();

    fireEvent.click(screen.getByText(SortType.Popular, { selector: 'span.places__sorting-type' }));
    const activeOption = screen.getByText(SortType.Popular, { selector: 'li' }).closest('li');
    expect(activeOption).toHaveClass('places__option--active');

    const inactiveOption = screen.getByText(SORT_OPTIONS[1], { selector: 'li' }).closest('li');
    expect(inactiveOption).not.toHaveClass('places__option--active');
  });
});
