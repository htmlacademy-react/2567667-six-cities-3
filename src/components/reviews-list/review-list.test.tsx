import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ReviewsList from './reviews-list';
import { Review } from '../../types/offer';

vi.mock('../review-item/review-item', () => ({
  __esModule: true,
  default: ({ review }: { review: Review }) => (
    <li data-testid="review-item">{review.comment}</li>
  ),
}));

const mockReviews: Review[] = [
  {
    id: '1',
    user: { name: 'Alice', avatarUrl: '', isPro: false },
    rating: 4,
    comment: 'First comment',
    date: '2024-01-01',
  },
  {
    id: '2',
    user: { name: 'Bob', avatarUrl: '', isPro: true },
    rating: 5,
    comment: 'Second comment',
    date: '2024-01-02',
  },
];

describe('Component: ReviewsList', () => {
  it('renders title with total count and all reviews', () => {
    render(<ReviewsList reviews={mockReviews} totalCount={7} />);
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.getByText('7')).toBeInTheDocument();
    const items = screen.getAllByTestId('review-item');
    expect(items).toHaveLength(2);
    expect(screen.getByText('First comment')).toBeInTheDocument();
    expect(screen.getByText('Second comment')).toBeInTheDocument();
    expect(items[0].closest('ul')).toBeInTheDocument();
  });

  it('renders empty list without errors', () => {
    render(<ReviewsList reviews={[]} totalCount={0} />);
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.queryByTestId('review-item')).not.toBeInTheDocument();
  });
});
