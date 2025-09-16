import JobElement from './JobElement';

type Job = {
  href: string;
  label: string;
  iconSrc: string;
};

const JOBS: Job[] = [
  {
    href: '/it',
    label: 'IT·개발',
    iconSrc: '/icons/jobs/computer.svg',
  },
  {
    href: '/ai',
    label: 'AI·데이터',
    iconSrc: '/icons/jobs/memory.svg',
  },
  {
    href: '/game',
    label: '게임',
    iconSrc: '/icons/jobs/sports_esports.svg',
  },
  {
    href: '/design',
    label: '디자인',
    iconSrc: '/icons/jobs/design_services.svg',
  },
  {
    href: '/strategy',
    label: '기획·전략',
    iconSrc: '/icons/jobs/assignment_purple.svg',
  },
  {
    href: '/marketing',
    label: '마케팅·광고',
    iconSrc: '/icons/jobs/storefront.svg',
  },
  {
    href: '/md',
    label: '상품기획·MD',
    iconSrc: '/icons/jobs/sell.svg',
  },
  {
    href: '/sales',
    label: '영업',
    iconSrc: '/icons/jobs/point_of_sale_blue.svg',
  },
  {
    href: '/logistics',
    label: '무역·물류',
    iconSrc: '/icons/jobs/warehouse.svg',
  },
  {
    href: '/driver',
    label: '운송·배송',
    iconSrc: '/icons/jobs/storefront.svg',
  },
  {
    href: '/legal',
    label: '법률·법무',
    iconSrc: '/icons/jobs/balance.svg',
  },
  {
    href: '/hr',
    label: 'HR·총무',
    iconSrc: '/icons/jobs/people.svg',
  },
  {
    href: '/accounting',
    label: '회계·재무·세무',
    iconSrc: '/icons/jobs/table_view.svg',
  },
  {
    href: '/finance',
    label: '증권·운용',
    iconSrc: '/icons/jobs/query_stats.svg',
  },
  {
    href: '/bank',
    label: '은행·카드·보험',
    iconSrc: '/icons/jobs/account_balance.svg',
  },
  {
    href: '/research',
    label: '엔지니어링·R&D',
    iconSrc: '/icons/jobs/architecture.svg',
  },
  {
    href: '/construction',
    label: '건설·건축',
    iconSrc: '/icons/jobs/apartment.svg',
  },
  {
    href: '/production',
    label: '생산·기능직',
    iconSrc: '/icons/jobs/assignment.svg',
  },
  {
    href: '/medical',
    label: '의료·보건',
    iconSrc: '/icons/jobs/vaccines.svg',
  },
  {
    href: '/public',
    label: '공공·복지',
    iconSrc: '/icons/jobs/volunteer_activism.svg',
  },
  {
    href: '/education',
    label: '교육',
    iconSrc: '/icons/jobs/school.svg',
  },
  {
    href: '/media',
    label: '미디어·엔터',
    iconSrc: '/icons/jobs/ondemand_video.svg',
  },
  {
    href: '/customer',
    label: '고객상담·TM',
    iconSrc: '/icons/jobs/point_of_sale.svg',
  },
  {
    href: '/service',
    label: '서비스',
    iconSrc: '/icons/jobs/handshake.svg',
  },
  {
    href: '/food',
    label: '식음료',
    iconSrc: '/icons/jobs/restaurant_menu.svg',
  },
];

function Placeholder({ className = '' }: { className?: string }) {
  return (
    <div
      className={`bg-base-neutral-alternative pointer-events-none h-[48px] w-full md:h-[68px] ${className}`}
      aria-hidden="true"
    ></div>
  );
}

export default function JobGroup() {
  return (
    <div className="relative flex w-full flex-col items-center">
      <div className="mx-auto grid w-full max-w-[900px] grid-cols-3 gap-[2px] overflow-hidden rounded-[20px] md:grid-cols-4 lg:grid-cols-5">
        {JOBS.map((job) => (
          <JobElement key={job.label} label={job.label} iconSrc={job.iconSrc} />
        ))}
        <Placeholder className="block md:hidden lg:hidden" />
        <Placeholder className="block md:hidden lg:hidden" />
        <Placeholder className="hidden md:block lg:hidden" />
        <Placeholder className="hidden md:block lg:hidden" />
        <Placeholder className="hidden md:block lg:hidden" />
      </div>
    </div>
  );
}
