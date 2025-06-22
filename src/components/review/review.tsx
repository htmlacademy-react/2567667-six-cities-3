import { Link } from 'react-router-dom';
import ReviewsList from '../reviews-list/reviews-list';
import ReviewForm from '../review-form/review-form';
import { Review as ReviewType } from '../../types/offer';
import styles from './review.module.css';

type ReviewsProps = {
  isAuth: boolean;
  reviews: ReviewType[];
  offerId: string;
};

export default function Review({ isAuth, reviews, offerId }: ReviewsProps) {
  return (
    <>
      <ReviewsList reviews={reviews} />
      {isAuth ? (
        <ReviewForm offerId={offerId} />
      ) : (
        <div className={styles.authNotice}>
          Только авторизованные пользователи могут оставлять комментарии.
          <br />
          <Link to="/login" className={styles.loginLink}>Войти</Link>
        </div>
      )}
    </>
  );
}
