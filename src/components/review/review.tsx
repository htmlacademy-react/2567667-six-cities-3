import ReviewsList from '../reviews-list/reviews-list';
import ReviewForm from '../review-form/review-form';

type ReviewsProps = {
  isAuth: boolean;
};

export default function Review({ isAuth }: ReviewsProps) {
  return (
    <>
      <ReviewsList />
      {isAuth && <ReviewForm />}
      {!isAuth && <p>Только авторизированные пользователи могут оставлять комментарии!</p>}
    </>
  );
}
