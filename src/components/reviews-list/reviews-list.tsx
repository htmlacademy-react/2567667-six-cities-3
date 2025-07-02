import { memo } from 'react';
import { Review } from '../../types/offer';
import ReviewItem from '../review-item/review-item';

type ReviewsListProps = {
  reviews: Review[];
  totalCount: number;
};

const ReviewsList = ({ reviews, totalCount }: ReviewsListProps) => (
  <>
    <h2 className="reviews__title">
      Reviews &middot; <span className="reviews__amount">{totalCount}</span>
    </h2>
    <ul className="reviews__list">
      {reviews.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </ul>
  </>
);

export default memo(ReviewsList);
