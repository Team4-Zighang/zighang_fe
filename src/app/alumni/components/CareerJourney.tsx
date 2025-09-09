'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

type CareerJourneyItem = {
  id: number;
  name: string;
  school: string;
  department: string[] | string;
  journey: { src: string; alt: string }[];
  badges: string[];
  type?: string;
  description?: string;
};

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(min-width: 768px)');
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);
  return isMobile;
}

const data: CareerJourneyItem[] = [
  {
    id: 1,
    name: '박채수',
    school: '한국대학교',
    department: ['디자인학부'],
    journey: [{ src: '/images/jobfootstep/jobfootstep1.png', alt: '첫번째' }],
    badges: ['현) UX 디자이너', '전) 콘텐츠 디자이너'],
    type: '학점 괴물 & 성실형',
    description: `채수 선배님은 학사와 석사 재학기간 동안 학기 
    내내 학점을 4.3 이상으로 유지했어요.
    학점뿐만이 아니라 크고작은 대외활동, 공모전, 
    인턴 등 성실한 이력서를 보여주고 있답니다.`,
  },
  {
    id: 2,
    name: '윤창현',
    school: '한국대학교',
    department: ['디자인학부'],
    journey: [{ src: '/images/jobfootstep/jobfootstep1.png', alt: '첫번째' }],
    badges: ['현) UIUX·프로덕트', '전) 콘텐츠 디자이너'],
    type: '대외활동형',
    description:
      '다양한 동아리/공모전/인턴 경험을 통해 실무 감각을 쌓았어요.\n협업 프로젝트 경험이 풍부해요.',
  },
  {
    id: 3,
    name: '백즌',
    school: '한국대학교',
    department: ['디자인학부'],
    journey: [{ src: '/images/jobfootstep/jobfootstep1.png', alt: '첫번째' }],
    badges: ['현) UIUX·프로덕트', '전) 콘텐츠 디자이너'],
    type: '인턴 다수형',
  },
  {
    id: 4,
    name: '윤창현',
    school: '한국대학교',
    department: ['디자인학부'],
    journey: [{ src: '/images/jobfootstep/jobfootstep1.png', alt: '첫번째' }],
    badges: ['현) UIUX·프로덕트', '전) 콘텐츠 디자이너'],
    type: '대외활동형',
  },
];

const CARD_W_MOBILE = 306;
const CARD_W_WEB = 356;
const GAP = 24;

const CareerJourney = () => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [openId, setOpenId] = useState<number | null>(null);
  const isMobile = useIsMobile();

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollerRef.current;
    if (!el) return;
    const cardWidth = isMobile ? CARD_W_WEB : CARD_W_MOBILE;
    el.scrollBy({
      left: (cardWidth + GAP) * (dir === 'left' ? -1 : 1),
      behavior: 'smooth',
    });
  };

  const toggle = (id: number) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <div className="mx-auto mt-20 w-full px-5 md:px-0 md:pl-[120px]">
      <div className="text-contents-neutral-primary web-title2 md:heading-1xl-semibold">
        인증된 선배님의
        <span className="block md:inline">
          {' '}
          취준 발자취를 따라갈 수 있어요!
        </span>
      </div>

      <div className="mt-6">
        <div
          ref={scrollerRef}
          className="no-scrollbar flex snap-x snap-mandatory items-start gap-3 overflow-x-auto px-1 md:gap-6 md:px-2"
        >
          {data.map((item) => {
            const departments = Array.isArray(item.department)
              ? item.department
              : [item.department];

            return (
              <div
                key={item.id}
                className="bg-base-neutral-alternative w-[308px] shrink-0 snap-start self-start rounded-[12px] p-6 md:w-[384px] md:p-6"
              >
                <div className="flex w-full items-start">
                  <div className="flex w-full flex-row items-center justify-between">
                    <div className="min-w-0">
                      <div className="text-contents-neutral-tertiary web-summary flex flex-wrap items-center gap-x-1">
                        <span className="truncate">{item.school}</span>
                        {!!departments.length && (
                          <>
                            <span className="text-gray-400">|</span>
                            <span className="truncate">
                              {departments.join(' · ')}
                            </span>
                          </>
                        )}
                      </div>
                      <div className="text-contents-neutral-secondary heading-lg-semibold mt-[6px]">
                        {item.name}
                      </div>
                    </div>

                    <Image
                      src="/icons/star_check.svg"
                      alt="인증"
                      width={52}
                      height={52}
                      className="h-[52px] w-[52px] cursor-pointer"
                    />
                  </div>
                </div>

                {!!item.badges?.length && (
                  <div className="mt-6 flex flex-wrap items-center gap-2">
                    {item.badges.map((b, idx) => {
                      const isCurrent = b.startsWith('현)');
                      const badgeStyle = isCurrent
                        ? 'bg-gray-500 text-contents-state-inverse'
                        : 'bg-white text-gray-500 border border-gray-200';
                      return (
                        <span
                          key={idx}
                          className={`md:web-summary body-sm-medium rounded-[8px] px-2 py-1 ${badgeStyle}`}
                        >
                          {b}
                        </span>
                      );
                    })}
                  </div>
                )}

                {!!item.journey?.length && (
                  <div className="flex items-center md:mt-6">
                    {item.journey.map((j, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-center overflow-hidden rounded-[12px]"
                      >
                        <Image
                          src={j.src}
                          alt={j.alt}
                          width={336}
                          height={289}
                          className="h-[287px] w-[260px] object-contain md:h-[289px] md:w-[336px]"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {!!item.type && (
                  <button
                    type="button"
                    onClick={() => toggle(item.id)}
                    className="flex w-full items-center justify-between md:mt-6"
                    aria-expanded={openId === item.id}
                  >
                    <div className="text-contents-neutral-secondary heading-sm-semibold">
                      {item.type}
                    </div>
                    <Image
                      src="/icons/arrow_right.svg"
                      alt="열기"
                      width={24}
                      height={24}
                      className={`cursor-pointer ${openId === item.id ? 'rotate-90' : ''}`}
                    />
                  </button>
                )}

                {openId === item.id && (
                  <div className="text-contents-neutral-tertiary body-md-medium mt-6 rounded-[12px] bg-white px-6 py-3">
                    {isMobile
                      ? (item.description || '')
                          .split('\n')
                          .map((line, i) => <p key={i}>{line}</p>)
                      : (item.description || '').replace(/\n/g, ' ')}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="pointer-events-none mt-6 flex justify-end gap-2 px-6 md:px-[100px]">
          <button
            onClick={() => scroll('left')}
            className="pointer-events-auto grid cursor-pointer rounded-md p-1 hover:bg-gray-100"
            aria-label="이전"
          >
            <Image
              src="/icons/chevron_left.svg"
              alt="이전"
              width={32}
              height={32}
            />
          </button>
          <button
            onClick={() => scroll('right')}
            className="pointer-events-auto grid cursor-pointer rounded-md p-1 hover:bg-gray-100"
            aria-label="다음"
          >
            <Image
              src="/icons/chevron_right.svg"
              alt="다음"
              width={32}
              height={32}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CareerJourney;
