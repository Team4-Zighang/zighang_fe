import Image from 'next/image';

type PopularProps = {
  logoSrc?: string;
  company: string;
  title: string;
  trend: number;
  trendType: 'up' | 'down' | 'none';
  bookmarked?: boolean;
};

const PopularCompany = () => {
  const jobs: PopularProps[] = [
    {
      company: '(주) 삼성전자',
      title: '사업 전략 및 신규 사업 개발',
      trend: 1,
      trendType: 'up',
    },
    {
      company: '(주) 네이버',
      title: 'AI 서비스 기획/운영',
      trend: 5,
      trendType: 'down',
    },
    {
      company: '(주) 카카오',
      title: '플랫폼 신규 서비스 개발',
      trend: 0,
      trendType: 'none',
    },
  ];

  const getTrendIcon = (t: 'up' | 'down' | 'none') =>
    t === 'up'
      ? '/icons/rank_up.svg'
      : t === 'down'
        ? '/icons/rank_down.svg'
        : '/icons/rank_none.svg';

  const getTrendColor = (t: 'up' | 'down' | 'none') =>
    t === 'up'
      ? 'text-red-500'
      : t === 'down'
        ? 'text-blue-500'
        : 'text-contents-neutral-tertiary';

  return (
    <div className="mt-5 flex snap-x snap-mandatory gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] md:flex-col md:gap-5 md:overflow-visible [&::-webkit-scrollbar]:hidden">
      {jobs.map((job, idx) => (
        <div
          key={idx}
          className="border-base-neutral-border flex shrink-0 basis-[88%] snap-start items-stretch rounded-[12px] border bg-white md:basis-auto"
        >
          <div className="flex min-w-0 flex-1 flex-row items-center gap-3 p-2 md:gap-4 md:p-4">
            <div className="border-base-neutral-border relative h-[44px] w-[44px] overflow-hidden rounded-[12px] border bg-gray-50 md:h-[80px] md:w-[80px]">
              <Image
                src={job.logoSrc || '/images/sampleimage.png'}
                alt={`${job.company} logo`}
                fill
                sizes="(min-width: 768px) 80px, 44px"
                className="object-contain"
              />
            </div>

            <div className="flex min-w-0 flex-col">
              <div className="text-contents-neutral-tertiary mobile-summary md:web-badge-lg">
                {job.company}
              </div>
              <div className="text-contents-neutral-primary mobile-title2 md:web-title2 mt-[6px]">
                {job.title}
              </div>

              <div className="mt-[6px] flex items-center gap-1 md:mt-5 md:gap-2">
                <Image
                  src={getTrendIcon(job.trendType)}
                  alt="trend"
                  width={20}
                  height={20}
                  className="h-5 w-5"
                />
                <span
                  className={`mobile-badge-sm md:caption-md-medium ${getTrendColor(job.trendType)}`}
                >
                  {job.trend}
                </span>
              </div>
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
