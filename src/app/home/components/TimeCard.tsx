'use client';
import React from 'react';
import CardFlip from './CardFlip';

export type CardProps = { id: string; frontImg: string; back: React.ReactNode };

type TimeCardProps = {
  card: CardProps;
  index: number;
  widthClass: string;
  isBack: (i: number) => boolean;
  isLocked: (i: number) => boolean;
  remainTime: number[];
  toggle: (i: number) => void;
  formatHMS: (sec: number) => string;
};

const TimeCard = ({
  card,
  index,
  widthClass,
  isBack,
  isLocked,
  remainTime,
  toggle,
  formatHMS,
}: TimeCardProps) => {
  const backShown = isBack(index);
  const locked = isLocked(index);
  const secLeft = backShown ? Math.max(0, remainTime[index]) : 0;

  return (
    <div className="flex w-full flex-col items-center">
      <div className={widthClass}>
        <CardFlip
          img={card.frontImg}
          back={card.back}
          backShown={backShown}
          locked={locked}
          onToggle={() => toggle(index)}
        />
      </div>
      <div className="mt-3 flex w-full flex-col items-center">
        <span className="body-md-medium text-contents-neutral-secondary text-center">
          다음 공고 뽑기까지 {backShown ? formatHMS(secLeft) : '00:00:00'}
        </span>
      </div>
    </div>
  );
};

export default TimeCard;
