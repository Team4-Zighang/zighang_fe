'use client';
import Image from 'next/image';
import React, { useRef } from 'react';

const data = [
  {
    id: 1,
    name: '강현규',
    school: '한국대학교',
    department: ['디자인학부', '경영학과'],
    brands: [
      { src: '/images/sampleimage.png', alt: '삼성' },
      { src: '/images/sampleimage.png', alt: 'LG전자' },
      { src: '/images/sampleimage.png', alt: '당근' },
      { src: '/images/sampleimage.png', alt: '현대' },
    ],
    badges: ['UIUX·프로덕트', '서비스 기획자'],
  },
  {
    id: 2,
    name: '박시원',
    school: '한국대학교',
    department: '광고홍보학과',
    brands: [
      { src: '/images/sampleimage.png', alt: '현대' },
      { src: '/images/sampleimage.png', alt: 'LG전자' },
      { src: '/images/sampleimage.png', alt: '삼성' },
      { src: '/images/sampleimage.png', alt: '당근' },
    ],
    badges: ['UIUX·프로덕트', '서비스 기획자'],
  },
  {
    id: 3,
    name: '김선화',
    school: '한국대학교',
    department: '디자인학부',
    brands: [
      { src: '/images/sampleimage.png', alt: '현대' },
      { src: '/images/sampleimage.png', alt: '삼성' },
      { src: '/images/sampleimage.png', alt: '당근' },
      { src: '/images/sampleimage.png', alt: 'LG전자' },
    ],
    badges: ['UIUX·프로덕트', '서비스 기획자'],
  },
  {
    id: 4,
    name: '김영록',
    school: '한국대학교',
    department: '디자인학부',
    brands: [
      { src: '/images/sampleimage.png', alt: '당근' },
      { src: '/images/sampleimage.png', alt: 'LG전자' },
      { src: '/images/sampleimage.png', alt: '당근' },
      { src: '/images/sampleimage.png', alt: 'LG전자' },
    ],
    badges: ['UIUX·프로덕트'],
  },
];

const CARD_W_MOBILE = 306;
const CARD_W_WEB = 356;
const GAP = 24;

const SearchAlumni = () => {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollerRef.current;
    if (!el) return;
    const isMd = window.matchMedia('(min-width: 768px)').matches;
    const cardWidth = isMd ? CARD_W_WEB : CARD_W_MOBILE;
    el.scrollBy({
      left: (cardWidth + GAP) * (dir === 'left' ? -1 : 1),
      behavior: 'smooth',
    });
  };

  return (
    <div className="mx-auto mt-20 w-full px-5 md:pl-[120px]">
      <div className="text-contents-neutral-primary web-title2 md:heading-1xl-semibold">
        같은 직무를 희망하는
        <span className="block md:inline"> 동문을 찾았어요</span>
      </div>

      <div className="mt-8">
        <div
          ref={scrollerRef}
          className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto pr-4 md:gap-6 md:pr-16"
        >
          {data.map((item) => {
            const departments = Array.isArray(item.department)
              ? item.department
              : [item.department];
            const [firstDept, ...restDepts] = departments;

            return (
              <div
                key={item.id}
                className="bg-base-neutral-alternative w-[306px] shrink-0 snap-start rounded-[12px] px-6 pt-5 pb-7 md:w-[356px] md:px-6"
              >
                <div className="grid grid-cols-2 gap-2">
                  {item.brands.map((b, i) => (
                    <div
                      key={i}
                      className="border-base-neutral-border flex items-center justify-center rounded-[8px] border"
                    >
                      <Image
                        src={b.src}
                        alt={b.alt}
                        width={150}
                        height={106}
                        className="h-[89px] w-[126px] rounded-[8px] object-contain md:h-[106px] md:w-[150px]"
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex w-full items-start justify-between">
                  <div className="min-w-0">
                    <div className="text-contents-neutral-tertiary web-summary flex flex-wrap items-center gap-x-1">
                      <span>{item.school}</span>
                      <span className="mx-1 text-gray-400">|</span>

                      {firstDept && (
                        <>
                          <span>{firstDept}</span>
                          <span className="text-gray-400">·</span>
                          <span className="basis-full" />
                        </>
                      )}

                      {restDepts.length > 0 && (
                        <span className="flex flex-wrap items-center">
                          {restDepts.map((d, idx) => (
                            <span key={idx}>
                              {idx > 0 && (
                                <span className="px-1 text-gray-400">·</span>
                              )}
                              {d}
                            </span>
                          ))}
                        </span>
                      )}
                    </div>

                    <div className="text-contents-neutral-secondary heading-lg-semibold mt-[6px]">
                      {item.name}
                    </div>
                  </div>

                  <Image
                    src="/icons/arrow_right.svg"
                    alt="상세"
                    width={24}
                    height={24}
                    className="mt-4 cursor-pointer"
                  />
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {item.badges.map((b, idx) => (
                    <span
                      key={idx}
                      className="rounded-[8px] bg-gray-500 px-2 py-1 text-sm font-medium text-white"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="pointer-events-none mt-8 flex justify-end gap-4 px-6 md:pr-24">
          <button
            onClick={() => scroll('left')}
            className="pointer-events-auto grid cursor-pointer"
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
            className="pointer-events-auto grid cursor-pointer"
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

export default SearchAlumni;
