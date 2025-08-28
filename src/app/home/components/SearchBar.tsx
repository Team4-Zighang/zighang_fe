import Image from 'next/image';

type SearchBarProps = {
  mdWidth?: string;
  onClick?: () => void;
};

export default function SearchBar({
  mdWidth = 'md:w-[640px]',
  onClick,
}: SearchBarProps) {
  return (
    <div
      className={`border-base-neutral-border bg-base-neutral-alternative relative mx-0 flex h-[48px] w-full items-center justify-between rounded-[12px] border py-[16px] pr-[20px] pl-[16px] md:mx-auto md:pl-[28px] ${mdWidth}`}
    >
      <input
        type="text"
        placeholder="검색어를 입력해 주세요"
        className="mobile-filter md:web-summary text-contents-state-unselected flex-1 bg-transparent outline-none"
      />
      <div className="flex cursor-pointer items-center">
        <Image
          alt="검색 아이콘"
          loading="lazy"
          data-nimg="1"
          src="/icons/search.svg"
          width={24}
          height={24}
          className="h-[24px] w-[24px]"
          onClick={onClick}
        />
      </div>
    </div>
  );
}
