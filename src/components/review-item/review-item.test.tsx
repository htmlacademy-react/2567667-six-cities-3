import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ReviewItem from './review-item';
import { Review } from '../../types/offer';

vi.mock('../../utils/rating', () => ({
  getRatingWidth: vi.fn(() => '80%'),
}));

vi.mock('../../utils/date', () => ({
  formatReviewDate: vi.fn(() => 'July 2024'),
}));

const mockReview: Review = {
  id: '1',
  user: {
    name: 'Alice',
    avatarUrl: '/avatar.jpg',
    isPro: true,
  },
  rating: 4,
  comment: 'Super nice place!',
  date: '2024-07-01T12:00:00.000Z',
};

describe('Component: ReviewItem', () => {
  it('renders all review fields', () => {
    render(<ReviewItem review={mockReview} />);
    expect(screen.getByText('Alice')).toBeInTheDocument();
    const avatar = screen.getByAltText('Reviews avatar');
    expect(avatar).toHaveAttribute('src', '/avatar.jpg');
    expect(avatar).toHaveAttribute('width', '54');
    expect(avatar).toHaveAttribute('height', '54');
    expect(screen.getByText('Pro')).toBeInTheDocument();
    expect(screen.getByText('Super nice place!')).toBeInTheDocument();
    const stars = screen.getByText('Rating').previousSibling as HTMLElement;
    expect(stars).toHaveStyle({ width: '80%' });
    expect(screen.getByText('July 2024')).toBeInTheDocument();
    expect(screen.getByText('July 2024').closest('time')).toHaveAttribute('dateTime', '2024-07-01T12:00:00.000Z');
  });

  it('does not render "Pro" if user is not pro', () => {
    const notPro = {
      ...mockReview,
      user: { ...mockReview.user, isPro: false, name: 'Bob' },
    };
    render(<ReviewItem review={notPro} />);
    expect(screen.queryByText('Pro')).not.toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });
});
