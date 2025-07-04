import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Review from './review';
import { Review as ReviewType } from '../../types/offer';
import { MAX_REVIEWS_COUNT } from '../../const';

vi.mock('../reviews-list/reviews-list', () => ({
  __esModule: true,
  default: ({ reviews, totalCount }: { reviews: ReviewType[]; totalCount: number }) => (
    <div data-testid="reviews-list">
      {reviews.map((r) => <div key={r.id}>{r.comment}</div>)}
      <span data-testid="reviews-count">{totalCount}</span>
    </div>
  ),
}));
vi.mock('../review-form/review-form', () => ({
  __esModule: true,
  default: ({ offerId }: { offerId: string }) => <form data-testid="review-form">{offerId}</form>,
}));

vi.mock('../../utils/date', () => ({
  sortReviewsByDate: (reviews: ReviewType[]) => reviews,
}));

const mockReviews: ReviewType[] = [
  {
    id: '1',
    comment: 'First!',
    rating: 5,
    date: '2023-07-01T12:00:00.000Z',
    user: { name: 'A', avatarUrl: '', isPro: false }
  },
  {
    id: '2',
    comment: 'Second!',
    rating: 4,
    date: '2023-07-02T12:00:00.000Z',
    user: { name: 'B', avatarUrl: '', isPro: false }
  }
];

describe('Component: Review', () => {
  it('renders ReviewsList and ReviewForm when authorized', () => {
    render(
      <MemoryRouter>
        <Review isAuth reviews={mockReviews} offerId="offer-123" />
      </MemoryRouter>
    );
    expect(screen.getByTestId('reviews-list')).toBeInTheDocument();
    expect(screen.getByText('First!')).toBeInTheDocument();
    expect(screen.getByText('Second!')).toBeInTheDocument();
    expect(screen.getByTestId('reviews-count')).toHaveTextContent('2');
    expect(screen.getByTestId('review-form')).toBeInTheDocument();
    expect(screen.getByTestId('review-form')).toHaveTextContent('offer-123');
  });

  it('shows auth notice and login link when not authorized', () => {
    render(
      <MemoryRouter>
        <Review isAuth={false} reviews={mockReviews} offerId="offer-321" />
      </MemoryRouter>
    );
    expect(screen.getByTestId('reviews-list')).toBeInTheDocument();
    expect(screen.queryByTestId('review-form')).not.toBeInTheDocument();
    expect(screen.getByText(/Только авторизованные пользователи/)).toBeInTheDocument();
    const link = screen.getByRole('link', { name: /Войти/ });
    expect(link).toHaveAttribute('href', '/login');
  });

  it('passes only MAX_REVIEWS_COUNT to ReviewsList', () => {
    const reviews = Array.from({ length: MAX_REVIEWS_COUNT + 3 }, (_, i) => ({
      ...mockReviews[0],
      id: String(i),
      comment: `comment-${i}`,
    }));
    render(
      <MemoryRouter>
        <Review isAuth reviews={reviews} offerId="offer" />
      </MemoryRouter>
    );
    expect(screen.getAllByText(/comment-/)).toHaveLength(MAX_REVIEWS_COUNT);
  });
});
