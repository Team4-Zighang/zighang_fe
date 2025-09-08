import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import BookmarkFilterModal from './BookmarkFilterModal';
import BookmarkFilterButton from './BookmarkFilterButton';

// 임시 필터 변수명
const FILTERS = [
  { key: 'jobGroup', label: '직군' },
  { key: 'job', label: '직무' },
  { key: 'industry', label: '산업유형' },
  { key: 'hireType', label: '채용유형' },
  { key: 'education', label: '학력조건' },
  { key: 'career', label: '경력조건' },
  { key: 'region', label: '지역' },
  { key: 'deadlineType', label: '마감유형' },
];

const BookMarkFilter = () => {
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});

  const [careerRange, setCareerRange] = useState<{ min: number; max: number }>({
    min: 0,
    max: 10,
  });

  const handleApplyFromModal = (next: Record<string, string[]>) => {
    setSelectedFilters(next);
    // 데이터 refech
  };

  // 스크롤 좌우 관리
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
  }, [selectedFilters]);

  useEffect(() => {
    const el = filterListRef.current;
    if (!el) return;
    setShowLeft(false);
    setShowRight(el.scrollWidth > el.offsetWidth);
  }, [selectedFilters]);

  // 필터 초기화
  const handleRefresh = () => {
    setSelectedFilters({});
    setCareerRange({ min: 0, max: 10 });
  };

  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (key: string) => {
    setActiveFilter(key);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  function careerChipLabel(min: number, max: number) {
    const toText = (v: number) =>
      v === 0 ? '신입' : v === 10 ? '10년차+' : `${v}년차`;

    if (min === 0 && max === 10) return '경력 전체'; // 기본
    if (min === 0 && max < 10) return `${toText(max)} 이하`;
    if (min > 0 && max === 10) return `${toText(min)} 이상`;
    if (min < max) return `${toText(min)}~${toText(max)}`;
    return toText(min); // min === max
  }

  const getFilterText = (key: string, label: string, values: string[]) => {
    if (key === 'career') {
      return careerChipLabel(careerRange.min, careerRange.max);
    }
    if (values.length === 0) return label;
    if (values.length === 1) return values[0];
    return `${values[0]} 외 ${values.length - 1}개`;
  };

  const isChipSelected = (key: string, values: string[]) => {
    if (key === 'career')
      return careerRange.min !== 0 || careerRange.max !== 10;
    return values.length > 0;
  };

  return (
    <>
      <div className="flex items-center gap-[16px] pb-[16px]">
        <button
          onClick={handleRefresh}
          className="bg-base-primary-alternative flex h-[44px] w-[44px] cursor-pointer items-center justify-center rounded-[8px] p-[10px]"
        >
          <Image
            src="/icons/refresh_button.svg"
            width={24}
            height={24}
            alt="reselect"
          />
        </button>
        <div className="bg-base-neutral-border h-[28px] w-[1.5px] self-center" />
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
            <button
              onClick={() => handleOpenModal('all')}
              className="bg-base-primary-alternative border-base-primary-border flex h-[44px] w-[44px] flex-shrink-0 cursor-pointer items-center justify-center rounded-[8px] border-[2px]"
            >
              <Image
                src="/icons/tune.svg"
                width={24}
                height={24}
                alt="reselect"
              />
            </button>
            {FILTERS.map((filter) => {
              const values = selectedFilters[filter.key] || [];

              return (
                <BookmarkFilterButton
                  key={filter.key}
                  selected={isChipSelected(filter.key, values)}
                  text={getFilterText(filter.key, filter.label, values)}
                  onClick={() => handleOpenModal(filter.key)}
                />
              );
            })}
          </div>
          <BookmarkFilterModal
            title={
              activeFilter === 'all'
                ? '필터'
                : (FILTERS.find((f) => f.key === activeFilter)?.label ?? '필터') // 현재 위치 확인용
            }
            onClose={handleCloseModal}
            open={isModalOpen}
            selected={selectedFilters}
            onApply={handleApplyFromModal}
            careerMin={careerRange.min}
            careerMax={careerRange.max}
            setCareerMin={(v) =>
              setCareerRange((prev) => ({ ...prev, min: v }))
            }
            setCareerMax={(v) =>
              setCareerRange((prev) => ({ ...prev, max: v }))
            }
          />
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
};

export default BookMarkFilter;
