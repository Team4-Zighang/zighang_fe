import Image from 'next/image';
import { BookmarkSelectButton } from './BookmarkFilterButton';
import { useEffect, useRef, useState } from 'react';

// 임시 필터 변수명
const FILTERS = [
  { key: 'jobGroup', label: '직군', multi: true },
  { key: 'job', label: '직무', multi: true },
  { key: 'industry', label: '산업유형', multi: true },
  { key: 'hireType', label: '채용유형', multi: true },
  { key: 'education', label: '학력조건', multi: false },
  { key: 'career', label: '경력조건', multi: false },
  { key: 'region', label: '지역', multi: true },
  { key: 'deadlineType', label: '마감유형', multi: false },
];

export function BookMarkFilter() {
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});

  const filterListRef = useRef<HTMLDivElement>(null);
  const handleScrollLeft = () => {
    if (filterListRef.current) {
      filterListRef.current.scrollTo({
        left: 0,
        behavior: 'smooth',
      });
    }
  };

  const handleScrollRight = () => {
    if (filterListRef.current) {
      filterListRef.current.scrollTo({
        left: filterListRef.current.scrollWidth,
        behavior: 'smooth',
      });
    }
  };

  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const el = filterListRef.current;
      if (!el) return;
      setShowLeft(el.scrollLeft > 0);
      setShowRight(el.scrollLeft + el.offsetWidth < el.scrollWidth - 1);
    };
    const el = filterListRef.current;
    if (el) {
      el.addEventListener('scroll', handleScroll);
      handleScroll();
    }
    return () => {
      if (el) el.removeEventListener('scroll', handleScroll);
    };
  }, [FILTERS.length, selectedFilters]);

  useEffect(() => {
    const el = filterListRef.current;
    if (!el) return;
    setShowLeft(false);
    setShowRight(el.scrollWidth > el.offsetWidth);
  }, [FILTERS.length, selectedFilters]);

  const handleRefresh = () => {
    setSelectedFilters({});
  };

  const [modalOpen, setModalOpen] = useState<string | null>(null);

  return (
    <>
      <div className="flex items-center gap-[16px]">
        <button
          onClick={handleRefresh}
          className="bg-base-primary-alternative flex h-[44px] w-[44px] cursor-pointer items-center justify-center rounded-[8px]"
        >
          <Image
            src="/icons/refresh_button.svg"
            width={24}
            height={24}
            alt="reselect"
          />
        </button>
        <div className="bg-base-neutral-border mx-[8px] h-[28px] w-[1.5px] self-center" />
        <div className="relative flex w-full max-w-[calc(100vw-120px)] items-center">
          {showLeft && (
            <button
              className="absolute top-1/2 left-0 z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/80 p-2 shadow backdrop-blur-sm transition-opacity duration-300"
              onClick={handleScrollLeft}
            >
              <Image
                src="/icons/arrow_right.svg"
                width={28}
                height={28}
                alt="left"
                className="rotate-180"
              />
            </button>
          )}
          <div
            ref={filterListRef}
            className="no-scrollbar flex w-full gap-[8px] overflow-x-auto pr-[48px] whitespace-nowrap"
          >
            <button className="bg-base-primary-alternative border-base-primary-border flex h-[44px] w-[44px] flex-shrink-0 cursor-pointer items-center justify-center rounded-[8px] border-[2px]">
              <Image
                src="/icons/tune.svg"
                width={24}
                height={24}
                alt="reselect"
              />
            </button>
            <BookmarkSelectButton selected={true} text="선택O" />
            <BookmarkSelectButton selected={false} text="선택X" />
            <BookmarkSelectButton selected={false} text="선택X" />
            {FILTERS.map((filter) => {
              const values = selectedFilters[filter.key] || [];
              let text = filter.label;
              if (values.length === 1) text = values[0];
              else if (values.length > 1)
                text = `${values[0]} 외 ${values.length - 1}개`;

              return (
                <BookmarkSelectButton
                  key={filter.key}
                  selected={values.length > 0}
                  text={text}
                  onClick={() => setModalOpen(filter.key)}
                />
              );
            })}
          </div>
          {showRight && (
            <button
              className="absolute top-1/2 right-0 z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/80 p-2 shadow backdrop-blur-sm transition-opacity duration-300"
              onClick={handleScrollRight}
            >
              <Image
                src="/icons/arrow_right.svg"
                width={28}
                height={28}
                alt="close"
              />
            </button>
          )}
        </div>
      </div>
    </>
  );
}
