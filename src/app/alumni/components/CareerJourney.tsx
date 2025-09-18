'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import HorizontalScroll from '@/app/_components/common/HorizontalScroll';

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

const data: CareerJourneyItem[] = [
  {
    id: 1,
    name: '윤창현',
    school: '서울대학교',
    department: ['컴퓨터공학부'],
    journey: [{ src: '/images/jobfootstep/jobfootstep1.png', alt: '첫번째' }],
    badges: ['현) 백엔드 엔지니어'],
    type: '학점 괴물 & 성실형',
    description: `창현 선배님은 학사와 석사 재학기간 동안 학기 
    내내 학점을 4.3 이상으로 유지했어요.
    학점뿐만이 아니라 크고작은 대외활동, 공모전, 
    인턴 등 성실한 이력서를 보여주고 있답니다.`,
  },
  {
    id: 2,
    name: '박예나',
    school: '서울대학교',
    department: ['광고학과'],
    journey: [{ src: '/images/jobfootstep/jobfootstep2.png', alt: '두번째' }],
    badges: ['현) 광고기획자', '전) 콘텐츠 마케터'],
    type: '대외활동형',
    description: `예나 선배님은 교내·교외의 다양한 활동과 프로젝트에 적극 참여하며 진로를 탐색하고 경험을 확장하는 유형입니다. 
      학업 경로에서도 전문학사, 편입 등 유연한 선택을 통해 여러 경험을 병행하고, 단기 체험형 인턴이나 외부 프로젝트 등을 통해 실무 감각을 쌓는 데 중점을 둡니다. 
      다양한 환경에서 쌓은 경험을 자신의 성장 자산으로 활용하는 것이 특징입니다.`,
  },
  {
    id: 3,
    name: '김시원',
    school: '서울대학교',
    department: ['경영학과 · 경제학과'],
    journey: [{ src: '/images/jobfootstep/jobfootstep3.png', alt: '세번째' }],
    badges: ['현) Product Manager'],
    type: '인턴 다수형',
    description: `시원 선배님은 학사·석사 등 학업 과정을 체계적으로 마친 뒤 다수의 인턴십과 기업 실무 경험을 통해 직무 전문성을 빠르게 쌓는 유형입니다. 
    여러 회사에서 장·단기 인턴 경험을 반복하면서 현업의 흐름을 익히고 경력을 명확히 설계하며, 이를 기반으로 대기업이나 전문 직무로 자연스럽게 이어가는 경로가 특징입니다.`,
  },
  {
    id: 4,
    name: '김영록',
    school: '서울대학교',
    department: ['컴퓨터공학부'],
    journey: [{ src: '/images/jobfootstep/jobfootstep4.png', alt: '네번째' }],
    badges: ['현) 프론트엔드 엔지니어', '전) 백엔드 엔지니어'],
    type: '대외활동형',
    description: `영록 선배님은 교내·교외에서 진행되는 활동과 프로젝트에 적극 참여하며 진로를 탐색하고 경험의 폭을 넓혀가는 유형입니다. 
    학업 과정에서도 전문학사 중퇴 후 학사 편입처럼 유연한 선택을 통해 다양한 경험을 병행하고, 
    단기 인턴십이나 외부 프로젝트를 통해 실무 감각을 기르는 것이 특징입니다. 
    이렇게 축적한 다양한 경험을 현 직무에서 성장 자산으로 활용하는 모습이 대표적입니다.`,
  },
];

const CareerJourney = () => {
  const [openId, setOpenId] = useState<number | null>(null);

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
        <HorizontalScroll
          cardWidthMobile={308}
          cardWidthWeb={384}
          gap={24}
          className="items-start px-1 md:px-2"
          controlsClassName="pointer-events-none mt-6 flex justify-end gap-2 px-6 md:px-[100px]"
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
                        className="flex items-start overflow-hidden rounded-[12px]"
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
                      className={`cursor-pointer ${
                        openId === item.id ? 'rotate-90' : ''
                      }`}
                    />
                  </button>
                )}

                {openId === item.id && (
                  <div className="text-contents-neutral-tertiary body-md-medium mt-6 rounded-[12px] bg-white px-6 py-3">
                    {(item.description || '').split('\n').map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </HorizontalScroll>
      </div>
    </div>
  );
};

export default CareerJourney;
