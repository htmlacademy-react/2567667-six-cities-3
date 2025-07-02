import { memo } from 'react';

export type BookmarkButtonProps = {
  isActive: boolean;
  isDisabled?: boolean;
  onClick: () => void;
  size?: 'small' | 'large';
  buttonClass: string;
  iconClass: string;
};

function BookmarkButtonComponent({
  isActive,
  isDisabled = false,
  onClick,
  size = 'small',
  buttonClass,
  iconClass,
}: BookmarkButtonProps) {
  const fullButtonClass = `${buttonClass} button ${isActive ? `${buttonClass}--active` : ''}`.trim();

  return (
    <button
      className={fullButtonClass}
      type="button"
      onClick={onClick}
      disabled={isDisabled}
    >
      <svg
        className={iconClass}
        width={size === 'small' ? 18 : 31}
        height={size === 'small' ? 19 : 33}
      >
        <use xlinkHref="#icon-bookmark" />
      </svg>
      <span className="visually-hidden">
        {isActive ? 'In bookmarks' : 'To bookmarks'}
      </span>
    </button>
  );
}

const BookmarkButton = memo(BookmarkButtonComponent);
export default BookmarkButton;
