'use client';
import { useHotcompanies } from '@/hooks/queries/useAlumni';
import Image from 'next/image';

const PopularCompany = () => {
  const { data: hotcompanies, isLoading, isError } = useHotcompanies();

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러가 발생했습니다.</div>;

  return (
    <div className="mt-5 flex snap-x snap-mandatory gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] md:flex-col md:gap-5 md:overflow-visible [&::-webkit-scrollbar]:hidden">
      {hotcompanies?.map((hotcompany, idx) => (
        <div
          key={idx}
          className="border-base-neutral-border flex shrink-0 basis-[88%] snap-start items-stretch rounded-[12px] border bg-white md:basis-auto"
        >
          <div className="flex min-w-0 flex-1 flex-row items-center gap-3 p-2 md:gap-4 md:p-4">
            <div className="border-base-neutral-border relative h-[44px] w-[44px] overflow-hidden rounded-[12px] border bg-gray-50 md:h-[80px] md:w-[80px]">
              <Image
                src={hotcompany.companyImageUrl || '/images/sampleimage.png'}
                alt={`${hotcompany.companyName} logo`}
                fill
                sizes="(min-width: 768px) 80px, 44px"
                className="object-contain"
              />
            </div>

            <div className="flex min-w-0 flex-col">
              <div className="text-contents-neutral-primary mobile-title2 md:web-title2 mt-[6px]">
                {hotcompany.companyName}
              </div>

              {/* <div className="mt-[6px] flex items-center gap-1 md:mt-5 md:gap-2">
                <Image
                     src={getTrendIcon(hotcompany.changeRankStatus as TrendType)}
                  alt="trend"
                  width={20}
                  height={20}
                  className="h-5 w-5"
                />
                <span
                  className={`mobile-badge-sm md:caption-md-medium ${getTrendColor(job.trendType)}`}
                >
                  {hotcompany.trend}
                </span>
              </div> */}
            </div>
          </div>

          <button
            aria-label="북마크"
            className="border-l-base-neutral-border flex w-12 cursor-pointer items-center justify-center border-l px-2 md:w-[84px]"
          >
            <Image
              src="/icons/bookmark_gray.svg"
              alt="bookmark"
              width={28}
              height={28}
              className="h-7 w-7"
            />
          </button>
        </div>
      ))}
    </div>
  );
};

export default PopularCompany;
