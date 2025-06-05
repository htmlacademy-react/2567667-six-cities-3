import ReviewsList from '../reviews-list/reviews-list';
import ReviewForm from '../review-form/review-form';
import { Review as ReviewType } from '../../types/offer';

type ReviewsProps = {
  isAuth: boolean;
  reviews: ReviewType[];
};

export default function Review({ isAuth, reviews }: ReviewsProps) {
  return (
    <>
      <ReviewsList reviews={reviews} />
      {isAuth && <ReviewForm />}
      {!isAuth && <p>Только авторизированные пользователи могут оставлять комментарии!</p>}
    </>
  );
}
