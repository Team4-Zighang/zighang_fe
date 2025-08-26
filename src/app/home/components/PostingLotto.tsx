'use client';
import Image from 'next/image';
import React, { useState } from 'react';

type Card = {
  id: string;
  frontImg: string;
  back: React.ReactNode;
};

const cards: Card[] = [
  {
    id: '1',
    frontImg: '/images/zighang_card_1.png',
    back: (
      <div className="flex flex-col items-start">
        <div className="border-base-neutral-border h-16 w-16 rounded-[8px] border">
          {' '}
          사진{' '}
        </div>
        <div className="body-md-medium text-contents-neutral-tertiary mt-2">
          농협은행
        </div>
        <div className="heading-sm-semibold text-contents-neutral-primary text-start">
          [NH 농협은행] 경영지원부 기술업무 전문인력(기계설비, 소방 분야) 채용
          공고
        </div>
      </div>
    ),
  },
  {
    id: '2',
    frontImg: '/images/zighang_card_2.png',
    back: (
      <div className="flex flex-col items-start">
        <div className="border-base-neutral-border h-16 w-16 rounded-[8px] border">
          {' '}
          사진{' '}
        </div>
        <div className="body-md-medium text-contents-neutral-tertiary mt-2">
          농협은행
        </div>
        <div className="heading-sm-semibold text-contents-neutral-primary text-start">
          [NH 농협은행] 경영지원부 기술업무 전문인력(기계설비, 소방 분야) 채용
          공고
        </div>
      </div>
    ),
  },
  {
    id: '3',
    frontImg: '/images/zighang_card_3.png',
    back: (
      <div className="flex flex-col items-start">
        <div className="border-base-neutral-border h-16 w-16 rounded-[8px] border">
          {' '}
          사진{' '}
        </div>
        <div className="body-md-medium text-contents-neutral-tertiary mt-2">
          농협은행
        </div>
        <div className="heading-sm-semibold text-contents-neutral-primary text-start">
          [NH 농협은행] 경영지원부 기술업무 전문인력(기계설비, 소방 분야) 채용
          공고
        </div>
      </div>
    ),
  },
];

const PostingLotto = () => {
  const [flipped, setFlipped] = useState<boolean[]>(() =>
    Array(cards.length).fill(false)
  );

  const toggle = (idx: number) => {
    setFlipped((prev) => {
      const copy = [...prev];
      copy[idx] = !copy[idx];
      return copy;
    });
  };

  return (
    <div className="mt-12 flex flex-col items-start">
      <div className="flex flex-col items-start">
        <div className="heading-md-semibold text-contents-neutral-primary">
          나만의 공고 뽑기
        </div>
      </div>

      <div className="mt-4 grid w-full grid-cols-3 justify-items-center gap-4">
        {cards.map((card, id) => (
          <div key={card.id} className="flex w-[289px] flex-col items-center">
            <button
              onClick={() => toggle(id)}
              className="relative h-[385px] w-[289px] cursor-pointer rounded-3xl [perspective:1000px] focus:outline-none"
            >
              <div
                className={`relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] ${
                  flipped[id] ? 'rotate-y-180' : ''
                }`}
              >
                <div className="absolute inset-0 overflow-hidden rounded-3xl [backface-visibility:hidden]">
                  <Image
                    src={card.frontImg}
                    alt={`${id + 1}`}
                    fill
                    className="object-cover"
                    sizes="289px"
                    priority={id === 0}
                  />
                </div>

                <div className="border-base-neutral-border bg-base-neutral-default absolute inset-0 flex rotate-y-180 [transform:rotateY(180deg)] items-start rounded-3xl border p-6 shadow-[0_4px_30px_0_rgba(0,0,0,0.03)] [backface-visibility:hidden]">
                  {card.back}
                </div>
              </div>
            </button>

            <div className="mt-4 flex w-full flex-col items-center gap-1">
              <span className="body-md-medium text-contents-neutral-secondary">
                다음 공고 뽑기까지 00:00:00
              </span>
              <button className="border-base-neutral-border bg-base-neutral-alternative text-contents-primary-default body-lg-medium flex cursor-pointer items-center gap-1 rounded-full border py-2 pr-5 pl-4">
                <Image
                  src="/icons/refresh.svg"
                  alt="refreshIcon"
                  width={20}
                  height={20}
                />
                새로 뽑기
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostingLotto;
