import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ReviewForm from './review-form';

const mocks = {
  useSelector: undefined as unknown as ReturnType<typeof vi.fn>,
  useDispatch: undefined as unknown as ReturnType<typeof vi.fn>,
};

vi.mock('react-redux', () => ({
  useSelector: (...args: unknown[]) => mocks.useSelector(...args),
  useDispatch: () => mocks.useDispatch(),
}));

vi.mock('../../const', () => ({
  RATINGS: [
    { value: 5, label: 'perfect' },
    { value: 4, label: 'good' },
    { value: 3, label: 'not bad' },
    { value: 2, label: 'badly' },
    { value: 1, label: 'terribly' },
  ],
}));

describe('Component: ReviewForm', () => {
  beforeEach(() => {
    mocks.useSelector = vi.fn((selector: (...args: unknown[]) => unknown) => {
      if (selector.name === 'selectIsReviewsLoading') {
        return false;
      }
      if (selector.name === 'selectPostReviewError') {
        return '';
      }
      return undefined;
    });
    mocks.useDispatch = vi.fn(() => () => ({}));
  });

  it('renders all required elements', () => {
    render(<ReviewForm offerId="1" />);
    expect(screen.getByLabelText(/your review/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/tell how was your stay/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(5);
  });

  it('disables submit if review too short, too long, or no rating', () => {
    render(<ReviewForm offerId="1" />);
    const submitBtn = screen.getByRole('button', { name: /submit/i });
    expect(submitBtn).toBeDisabled();

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'short review' } });
    expect(submitBtn).toBeDisabled();

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'a'.repeat(301) } });
    expect(submitBtn).toBeDisabled();

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'a'.repeat(60) } });
    expect(submitBtn).toBeDisabled();
  });

  it('enables submit if review valid and rating selected', () => {
    render(<ReviewForm offerId="1" />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'a'.repeat(60) } });
    const radios = screen.getAllByRole('radio');
    fireEvent.click(radios[3]);
    expect(screen.getByRole('button', { name: /submit/i })).not.toBeDisabled();
  });

  it('shows "Sending..." when isSending true', () => {
    mocks.useSelector = vi.fn((selector: (...args: unknown[]) => unknown) => {
      if (selector.name === 'selectIsReviewsLoading') {
        return true;
      }
      if (selector.name === 'selectPostReviewError') {
        return '';
      }
      return undefined;
    });
    render(<ReviewForm offerId="1" />);
    expect(screen.getByRole('button', { name: /sending/i })).toBeDisabled();
    expect(screen.getByRole('textbox')).toBeDisabled();
    screen.getAllByRole('radio').forEach((input) => {
      expect(input).toBeDisabled();
    });
  });

  it('shows error message if postError is set', () => {
    mocks.useSelector = vi.fn((selector: (...args: unknown[]) => unknown) => {
      if (selector.name === 'selectIsReviewsLoading') {
        return false;
      }
      if (selector.name === 'selectPostReviewError') {
        return 'Some error';
      }
      return undefined;
    });
    render(<ReviewForm offerId="1" />);
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  it('calls dispatch(postReview) and resets form on submit', async () => {
    const dispatch = vi.fn(() => ({
      unwrap: () => Promise.resolve(),
    }));
    mocks.useDispatch = vi.fn(() => dispatch);

    render(<ReviewForm offerId="42" />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'a'.repeat(60) } });
    const radios = screen.getAllByRole('radio');
    fireEvent.click(radios[4]);
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(dispatch).toHaveBeenCalled();
  });
});
