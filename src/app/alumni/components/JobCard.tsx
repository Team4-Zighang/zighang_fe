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

  const getTrendIcon = (type: 'up' | 'down' | 'none') => {
    switch (type) {
      case 'up':
        return '/icons/rank_up.svg';
      case 'down':
        return '/icons/rank_down.svg';
      case 'none':
        return '/icons/rank_none.svg';
    }
  };

  const getTrendColor = (type: 'up' | 'down' | 'none') => {
    switch (type) {
      case 'up':
        return 'text-red-500';
      case 'down':
        return 'text-blue-500';
      case 'none':
        return 'text-contents-neutral-tertiary';
    }
  };

  return (
    <div className="flex flex-col gap-5">
      {jobs.map((job, idx) => (
        <div
          key={idx}
          className="border-base-neutral-border flex w-full items-stretch rounded-[12px] border bg-white"
        >
          <div className="flex min-w-0 flex-1 gap-4 p-4">
            <div className="border-base-neutral-border flex h-20 w-20 items-center justify-center overflow-hidden rounded-[12px] border bg-gray-50">
              <Image
                src={job.logoSrc || '/images/sampleimage.png'}
                alt={`${job.company} logo`}
                width={80}
                height={80}
                className="h-20 w-20 object-contain"
              />
            </div>

            <div className="flex min-w-0 flex-col">
              <div className="text-contents-neutral-tertiary web-badge-lg">
                {job.company}
              </div>
              <div className="text-contents-neutral-primary web-title2 mt-[6px]">
                {job.title}
              </div>

              <div className="mt-[6px] flex flex-wrap gap-[6px]">
                {job.tags.map((tag, i) => (
                  <div
                    key={i}
                    className="mobile-badge-lg text-contents-neutral-tertiary rounded-[8px] bg-gray-100 px-2 py-1"
                  >
                    {tag}
                  </div>
                ))}
              </div>

              <div className="mt-5 flex items-center gap-2">
                <Image
                  src={getTrendIcon(job.trendType)}
                  alt="trend"
                  width={20}
                  height={20}
                  className="h-5 w-5"
                />
                <span
                  className={`caption-md-medium ${getTrendColor(
                    job.trendType
                  )}`}
                >
                  {job.trend}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="border-l-base-neutral-border border-b-base-neutral-border flex h-[82px] w-[84px] cursor-pointer flex-col items-center justify-center border-b border-l px-2">
              <Image
                src={'/icons/bookmark.svg'}
                alt="bookmark"
                width={28}
                height={28}
                className="h-7 w-7"
              />
            </div>
            <div className="border-l-base-neutral-border flex h-[84px] w-[84px] items-center justify-center border-l px-2">
              <div className="text-contents-neutral-tertiary web-subtitle1">
                {job.status}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobCard;
