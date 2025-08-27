'use client';
import ScrapBubble from '@/app/_components/common/ScrapBubble';
import { useCardTimer } from '@/hooks/useCardTimer';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

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
  const { remainTime, isBack, isLocked, toggle, formatHMS } = useCardTimer(
    cards.length,
    60
  ); //테스트 1분
  const [scrapBubble, setScrapBubble] = useState<boolean>(false);
  const iconWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrapBubble) return;
    const onDown = (e: MouseEvent) => {
      if (!iconWrapRef.current) return;
      if (!iconWrapRef.current.contains(e.target as Node)) {
        setScrapBubble(false);
      }
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [scrapBubble]);

  return (
    <div className="mt-12 flex flex-col items-start">
      <div className="flex w-full flex-row items-start justify-between">
        <div className="heading-md-semibold text-contents-neutral-primary">
          나만의 공고 뽑기
        </div>

        <div className="flex flex-row items-center">
          <button className="flex cursor-pointer items-center gap-1 py-2 pr-4 pl-3">
            <Image
              src={'/icons/refresh.svg'}
              alt="refreshIcon"
              width={20}
              height={20}
            />
            <span className="text-contents-primary-default body-lg-medium">
              새로 뽑기
            </span>
          </button>

          <div ref={iconWrapRef} className="relative">
            <Image
              src="/icons/question_mark.svg"
              alt="questionIcon"
              width={20}
              height={20}
              className="cursor-pointer"
              onClick={() => setScrapBubble((v) => !v)}
            />
            {scrapBubble && (
              <ScrapBubble onClose={() => setScrapBubble(false)} />
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 grid w-full grid-cols-3 justify-items-center gap-4">
        {cards.map((card, id) => {
          const back = isBack(id);
          const locked = isLocked(id);
          const secLeft = back ? Math.max(0, remainTime[id]) : 0;

          return (
            <div key={card.id} className="flex w-[289px] flex-col items-center">
              <button
                onClick={() => toggle(id)}
                className="relative h-[385px] w-[289px] cursor-pointer rounded-3xl [perspective:1000px] focus:outline-none"
                disabled={locked}
              >
                <div
                  className={`relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] ${
                    back ? 'rotate-y-180' : ''
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
                  다음 공고 뽑기까지 {back ? formatHMS(secLeft) : '00:00:00'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PostingLotto;
