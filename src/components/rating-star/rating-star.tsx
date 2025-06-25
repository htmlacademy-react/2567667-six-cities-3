import styles from './rating-star.module.css';

type RatingStarProps = {
  star: number;
  currentRating: number;
  onChange: () => void;
  title: string;
  disabled?: boolean;
};

export default function RatingStar({
  star,
  currentRating,
  onChange,
  title,
  disabled = false
}: RatingStarProps) {
  return (
    <>
      <input
        className={`form__rating-input visually-hidden ${styles.input}`}
        name="rating"
        value={star}
        id={`${star}-stars`}
        type="radio"
        onChange={!disabled ? onChange : undefined}
        checked={currentRating === star}
        disabled={disabled}
      />
      <label
        htmlFor={`${star}-stars`}
        className={`reviews__rating-label form__rating-label ${disabled ? styles.disabled : ''}`}
        title={title}
      >
        <svg className="form__star-image" width={37} height={33}>
          <use xlinkHref="#icon-star" />
        </svg>
      </label>
    </>
  );
}
