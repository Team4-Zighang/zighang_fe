'use client';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

import { useCardTimer } from '@/hooks/useCardTimer';

import CardBack from './CardBack';
import TimeCard, { CardProps } from './TimeCard';
import ScrapBubble from './ScrapBubble';

const cards: CardProps[] = [
  {
    id: '1',
    frontImg: '/images/zighang_card_1.png',
    back: (
      <CardBack
        bank="농협은행"
        title="[NH 농협은행] 경영지원부 기술업무 전문인력(기계설비, 소방 분야) 채용 공고"
      />
    ),
  },
  {
    id: '2',
    frontImg: '/images/zighang_card_2.png',
    back: (
      <CardBack
        bank="농협은행"
        title="[NH 농협은행] 경영지원부 기술업무 전문인력(기계설비, 소방 분야) 채용 공고"
      />
    ),
  },
  {
    id: '3',
    frontImg: '/images/zighang_card_3.png',
    back: (
      <CardBack
        bank="농협은행"
        title="[NH 농협은행] 경영지원부 기술업무 전문인력(기계설비, 소방 분야) 채용 공고"
      />
    ),
  },
];

const PostingLotto = () => {
  const { remainTime, isBack, isLocked, toggle, formatHMS } = useCardTimer(
    cards.length,
    60
  );
  const [scrapBubble, setScrapBubble] = useState(false);
  const iconWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrapBubble) return;
    const onDown = (e: MouseEvent) => {
      if (!iconWrapRef.current) return;
      if (!iconWrapRef.current.contains(e.target as Node))
        setScrapBubble(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [scrapBubble]);

  return (
    <div className="mt-12 flex w-full flex-col items-start">
      <div className="flex w-full flex-row items-start justify-between gap-3 px-4 sm:flex-row">
        <div className="heading-md-semibold text-contents-neutral-primary">
          나만의 공고 뽑기
        </div>
        <div className="flex flex-row items-center">
          <button
            className="flex cursor-pointer items-center gap-1 py-2 pr-4 pl-3"
            type="button"
          >
            <Image
              src="/icons/refresh.svg"
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

      {/* 모바일 */}
      <div className="mt-4 w-full lg:hidden">
        <div
          className="no-scrollbar flex gap-3 overflow-x-auto px-4"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {cards.map((card, id) => (
            <div
              key={card.id}
              className="flex w-[260px] shrink-0 flex-col items-center sm:w-[280px]"
            >
              <TimeCard
                card={card}
                index={id}
                widthClass="w-full"
                isBack={isBack}
                isLocked={isLocked}
                remainTime={remainTime}
                toggle={toggle}
                formatHMS={formatHMS}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 데스크탑 */}
      <div className="mt-4 hidden w-full grid-cols-3 gap-4 lg:grid">
        {cards.map((card, id) => (
          <TimeCard
            key={card.id}
            card={card}
            index={id}
            widthClass="w-[289px]"
            isBack={isBack}
            isLocked={isLocked}
            remainTime={remainTime}
            toggle={toggle}
            formatHMS={formatHMS}
          />
        ))}
      </div>
    </div>
  );
};

export default PostingLotto;
