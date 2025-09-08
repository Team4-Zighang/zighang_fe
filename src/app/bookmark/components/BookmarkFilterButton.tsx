import Image from 'next/image';

type BookmarkFilterButtonProps = {
  selected: boolean;
  text: string;
  onClick?: () => void;
};

const BookmarkFilterButton = ({
  selected,
  text,
  onClick,
}: BookmarkFilterButtonProps) => {
  return (
    <button
      className={`flex h-[44px] flex-shrink-0 cursor-pointer items-center justify-center gap-[4px] rounded-[8px] px-[16px] ${
        selected
          ? 'bg-base-primary-alternative border-base-primary-border border-[2px]'
          : 'bg-base-neutral-default border-base-neutral-border border-[1px]'
      } `}
      onClick={onClick}
    >
      <span
        className={
          selected
            ? 'body-lg-semibold text-contents-primary-default'
            : 'body-lg-medium text-contents-neutral-secondary'
        }
      >
        {text}
      </span>
      <Image
        src={
          selected ? '/icons/arrow_under_purple.svg' : '/icons/arrow_under.svg'
        }
        width={20}
        height={20}
        alt="arrow"
      />
    </button>
  );
};

export default BookmarkFilterButton;
