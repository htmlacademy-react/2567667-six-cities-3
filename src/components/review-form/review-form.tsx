import React, { useState } from 'react';
import RatingStar from '../rating-star/rating-star';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store';
import { postReview } from '../../store/offer-details/offer-details-actions';
import { RATINGS } from '../../const.ts';
import styles from './review-form.module.css';
import { selectIsReviewsLoading, selectPostReviewError } from '../../store/selectors.ts';

type ReviewFormProps = {
  offerId: string;
};

export default function ReviewForm({ offerId }: ReviewFormProps) {
  const dispatch = useDispatch<AppDispatch>();
  const isSending = useSelector(selectIsReviewsLoading);
  const postError = useSelector(selectPostReviewError);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState<number>(0);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (evt) => {
    evt.preventDefault();
    if (reviewText.length >= 50 && reviewText.length <= 300 && rating && !isSending) {
      dispatch(postReview({ comment: reviewText, rating, offerId }))
        .unwrap()
        .then(() => {
          setReviewText('');
          setRating(0);
        });
    }
  };

  return (
    <form className="reviews__form form" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {RATINGS.map(({ value, label }) => (
          <RatingStar
            key={value}
            star={value}
            currentRating={rating}
            onChange={() => !isSending && setRating(value)}
            title={label}
            disabled={isSending}
          />
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={reviewText}
        onChange={(evt) => !isSending && setReviewText(evt.target.value)}
        disabled={isSending}
      />
      <div className="reviews__button-wrapper">
        {postError ? (
          <p className={styles.errorMessage}>
            Something went wrong while sending your review. Please try again later.
          </p>
        ) : (
          <p className="reviews__help">
            To submit review please make sure to set{' '}
            <span className="reviews__star">rating</span> and describe your stay with at least{' '}
            <b className="reviews__text-amount">50 characters</b>.
          </p>
        )}
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={reviewText.length < 50 || reviewText.length > 300 || !rating || isSending}
        >
          {isSending ? 'Sending...' : 'Submit'}
        </button>
      </div>
    </form>
  );
}
