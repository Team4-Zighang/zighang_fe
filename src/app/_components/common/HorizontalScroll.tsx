'use client';
import React, { useRef } from 'react';
import Image from 'next/image';

interface HorizontalScrollProps {
  children: React.ReactNode;
  cardWidthMobile?: number;
  cardWidthWeb?: number;
  gap?: number;
  className?: string;
  controlsClassName?: string;
}

const HorizontalScroll = ({
  children,
  cardWidthMobile = 306,
  cardWidthWeb = 356,
  gap = 24,
  className = '',
  controlsClassName = 'pointer-events-none mt-8 flex justify-end gap-4 px-6 md:pr-24',
}: HorizontalScrollProps) => {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollerRef.current;
    if (!el) return;

    const isMd = window.matchMedia('(min-width: 768px)').matches;
    const cardWidth = isMd ? cardWidthWeb : cardWidthMobile;

    el.scrollBy({
      left: (cardWidth + gap) * (dir === 'left' ? -1 : 1),
      behavior: 'smooth',
    });
  };

  return (
    <div className="w-full">
      {/* 스크롤 영역 */}
      <div
        ref={scrollerRef}
        className={`no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto pr-4 md:gap-6 md:pr-16 ${className}`}
      >
        {children}
      </div>

      {/* 컨트롤 버튼 */}
      <div className={controlsClassName}>
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
  );
};

export default HorizontalScroll;
