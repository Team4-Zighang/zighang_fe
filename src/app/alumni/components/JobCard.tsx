'use client';

import { useHotposting } from '@/hooks/queries/useAlumni';
import { getTrendColor, getTrendIcon, TrendType } from '@/utils/jobTrend';
import Image from 'next/image';

const JobCard = () => {
  const { data: hotposting, isLoading, isError } = useHotposting();

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러가 발생했습니다.</div>;

  return (
    <div className="flex snap-x snap-mandatory gap-2 overflow-x-auto md:flex-col md:gap-5 md:overflow-visible">
      {hotposting?.map((hotpost) => {
        const tags = [
          hotpost.depthTwo,
          hotpost.recruitmentType,
          hotpost.career,
        ];

        return (
          <div
            key={hotpost.postingId}
            className="border-base-neutral-border flex shrink-0 basis-[88%] snap-start items-stretch rounded-[12px] border bg-white md:basis-auto"
          >
            <div className="flex min-w-0 flex-1 flex-row gap-[10px] p-2 md:gap-4 md:p-4">
              <div className="flex items-center self-stretch md:items-start md:self-auto">
                <div className="border-base-neutral-border relative h-[44px] w-[44px] overflow-hidden rounded-[12px] border bg-gray-50 md:h-[80px] md:w-[80px]">
                  <Image
                    src={hotpost.companyImageUrl || '/images/sampleimage.png'}
                    alt={`${hotpost.companyName} logo`}
                    fill
                    sizes="(min-width: 768px) 80px, 44px"
                    className="object-contain"
                  />
                </div>
              </div>

              <div className="flex min-w-0 flex-col">
                <div className="text-contents-neutral-tertiary md:web-badge-lg mobile-summary">
                  {hotpost.companyName}
                </div>
                <div className="text-contents-neutral-primary md:web-title2 mobile-title2 mt-[6px]">
                  {hotpost.title}
                </div>

                <div className="mt-[6px] flex flex-wrap gap-[6px]">
                  {tags.map((tag, i) => (
                    <div
                      key={i}
                      className="md:mobile-badge-lg mobile-badge-sm text-contents-neutral-tertiary rounded-[8px] bg-gray-100 px-[6px] py-[2px] md:px-2 md:py-1"
                    >
                      {tag}
                    </div>
                  ))}
                </div>

                <div className="mt-[6px] flex items-center gap-1 md:mt-5 md:gap-2">
                  <Image
                    src={getTrendIcon(hotpost.changeRankStatus as TrendType)}
                    alt="trend"
                    width={20}
                    height={20}
                    className="h-5 w-5"
                  />
                  <span
                    className={`md:caption-md-medium mobile-badge-sm ${getTrendColor(
                      hotpost.changeRankStatus as TrendType
                    )}`}
                  >
                    {hotpost.changeRankValue}
                  </span>
                </div>
              </div>
            </div>

            <div className="border-base-neutral-border hidden w-[84px] flex-col self-stretch border-l md:flex">
              <button
                aria-label="북마크"
                className="flex flex-1 items-center justify-center"
              >
                <Image
                  src="/icons/bookmark_gray.svg"
                  alt="bookmark"
                  width={28}
                  height={28}
                  className="h-7 w-7"
                />
              </button>

              <div className="border-base-neutral-border flex items-center justify-center border-t py-3">
                <div className="text-contents-neutral-tertiary web-subtitle1">
                  {hotpost.dday}
                </div>
              </div>
            </div>

            {/* 모바일 */}
            <button
              aria-label="북마크"
              className="border-base-neutral-border flex w-12 items-center justify-center self-stretch border-l px-2 md:hidden"
            >
              <Image
                src="/icons/bookmark.svg"
                alt="bookmark"
                width={24}
                height={24}
                className="h-6 w-6"
              />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default JobCard;
