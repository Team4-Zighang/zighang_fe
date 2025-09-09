import Image from 'next/image';

type JobCardProps = {
  logoSrc?: string;
  company: string;
  title: string;
  tags: string[];
  trend: number;
  trendType: 'up' | 'down' | 'none';
  bookmarked?: boolean;
  status?: string;
};

const JobCard = () => {
  const jobs: JobCardProps[] = [
    {
      company: '(주) 삼성전자',
      title: '사업 전략 및 신규 사업 개발',
      tags: ['서비스 기획자', '정규직', '3년차 이상'],
      trend: 1,
      trendType: 'up',
      status: '상시',
    },
    {
      company: '(주) 네이버',
      title: 'AI 서비스 기획/운영',
      tags: ['AI 기획자', '정규직', '5년차 이상'],
      trend: 5,
      trendType: 'down',
      status: '상시',
    },
    {
      company: '(주) 카카오',
      title: '플랫폼 신규 서비스 개발',
      tags: ['백엔드 개발자', '정규직', '경력 무관'],
      trend: 0,
      trendType: 'none',
      status: '상시',
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
    <div className="flex snap-x snap-mandatory gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] md:flex-col md:gap-5 md:overflow-visible [&::-webkit-scrollbar]:hidden">
      {jobs.map((job, idx) => (
        <div
          key={idx}
          className="border-base-neutral-border flex shrink-0 basis-[88%] snap-start items-stretch rounded-[12px] border bg-white md:basis-auto"
        >
          <div className="flex min-w-0 flex-1 flex-row gap-[10px] p-2 md:gap-4 md:p-4">
            <div className="flex items-center self-stretch md:items-start md:self-auto">
              <div className="border-base-neutral-border relative h-[44px] w-[44px] overflow-hidden rounded-[12px] border bg-gray-50 md:h-[80px] md:w-[80px]">
                <Image
                  src={job.logoSrc || '/images/sampleimage.png'}
                  alt={`${job.company} logo`}
                  fill
                  sizes="(min-width: 768px) 80px, 44px"
                  className="object-contain"
                />
              </div>
            </div>

            <div className="flex min-w-0 flex-col">
              <div className="text-contents-neutral-tertiary md:web-badge-lg mobile-summary">
                {job.company}
              </div>
              <div className="text-contents-neutral-primary md:web-title2 mobile-title2 mt-[6px]">
                {job.title}
              </div>

              <div className="mt-[6px] flex flex-wrap gap-[6px]">
                {job.tags.map((tag, i) => (
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
                  src={getTrendIcon(job.trendType)}
                  alt="trend"
                  width={20}
                  height={20}
                  className="h-5 w-5"
                />
                <span
                  className={`md:caption-md-medium mobile-badge-sm ${getTrendColor(
                    job.trendType
                  )}`}
                >
                  {job.trend}
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
                src="/icons/bookmark.svg"
                alt="bookmark"
                width={28}
                height={28}
                className="h-7 w-7"
              />
            </button>

            <div className="border-base-neutral-border flex items-center justify-center border-t py-3">
              <div className="text-contents-neutral-tertiary web-subtitle1">
                {job.status}
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
      ))}
    </div>
  );
};

export default JobCard;
