type RatingStarProps = {
  star: number;
  currentRating: number;
  onChange: () => void;
  title: string;
};

export default function RatingStar({ star, currentRating, onChange, title }: RatingStarProps) {
  return (
    <>
      <input
        className="form__rating-input visually-hidden"
        name="rating"
        value={star}
        id={`${star}-stars`}
        type="radio"
        onChange={onChange}
        checked={currentRating === star}
      />
      <label
        htmlFor={`${star}-stars`}
        className="reviews__rating-label form__rating-label"
        title={title}
      >
        <svg className="form__star-image" width={37} height={33}>
          <use xlinkHref="#icon-star" />
        </svg>
      </label>
    </>
  );
}
