import { Link } from 'react-router-dom';
import ReviewsList from '../reviews-list/reviews-list';
import ReviewForm from '../review-form/review-form';
import { Review as ReviewType } from '../../types/offer';
import styles from './review.module.css';
import { sortReviewsByDate } from '../../utils/date';
import { AppRoute, MAX_REVIEWS_COUNT } from '../../const.ts';

type ReviewsProps = {
  isAuth: boolean;
  reviews: ReviewType[];
  offerId: string;
};

export default function Review({ isAuth, reviews, offerId }: ReviewsProps) {
  const sortedReviews = sortReviewsByDate(reviews);
  const visibleReviews = sortedReviews.slice(0, MAX_REVIEWS_COUNT);

  return (
    <>
      <ReviewsList reviews={visibleReviews} totalCount={reviews.length} />
      {isAuth ? (
        <ReviewForm offerId={offerId} />
      ) : (
        <div className={styles.authNotice}>
          Только авторизованные пользователи могут оставлять комментарии.
          <br />
          <Link to={AppRoute.Login} className={styles.loginLink}>Войти</Link>
        </div>
      )}
    </>
  );
}
