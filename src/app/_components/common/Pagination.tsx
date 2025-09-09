'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

export function useResponsivePageSize(mobile = 3, desktop = 6) {
  const [isMdUp, setIsMdUp] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(min-width: 768px)');
    const onChange = (e: MediaQueryListEvent) => setIsMdUp(e.matches);
    setIsMdUp(mq.matches);
    if (mq.addEventListener) mq.addEventListener('change', onChange);
    else mq.addListener(onChange);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', onChange);
      else mq.removeListener(onChange);
    };
  }, []);

  return isMdUp ? desktop : mobile;
}

type PaginationProps = {
  total: number;
  page: number;
  pageSize: number;
  onChange: (p: number) => void;
  windowSize?: number;
  className?: string;
};

function range(a: number, b: number) {
  return Array.from({ length: Math.max(0, b - a + 1) }, (_, i) => a + i);
}

function Pagination({
  total,
  page,
  pageSize,
  onChange,
  windowSize = 5,
  className = '',
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const clamp = (p: number) => Math.min(totalPages, Math.max(1, p));

  const start = Math.max(
    1,
    Math.min(page - Math.floor(windowSize / 2), totalPages - windowSize + 1)
  );
  const end = Math.min(totalPages, start + windowSize - 1);
  const pages = range(start, end);

  const btnBase =
    'h-8 min-w-8 px-2 rounded-[8px] body-md-medium flex items-center justify-center';
  const btnNum = (p: number) =>
    `${btnBase} ${
      p === page
        ? 'bg-base-primary-default text-contents-state-inverse'
        : 'text-contents-state-unselected hover:border hover:border-base-neutral-border cursor-pointer'
    }`;
  const btnIcon = (disabled: boolean) =>
    `${btnBase} ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`;

  return (
    <nav
      className={`flex w-full items-center justify-center gap-2 p-1 ${className}`}
      aria-label="페이지네이션"
    >
      <button
        className={btnIcon(page === 1)}
        disabled={page === 1}
        onClick={() => onChange(1)}
        aria-label="처음"
      >
        <Image
          src="/icons/double_arrow_left.svg"
          alt="first page"
          width={24}
          height={24}
          className="pointer-events-none"
        />
      </button>

      <button
        className={`${btnIcon(page === 1)} hidden md:flex`}
        disabled={page === 1}
        onClick={() => onChange(clamp(page - 1))}
        aria-label="이전"
      >
        <Image
          src="/icons/pagination_left.svg"
          alt="prev page"
          width={24}
          height={24}
          className="pointer-events-none"
        />
      </button>

      {pages.map((p) => (
        <button
          key={p}
          className={btnNum(p)}
          onClick={() => onChange(p)}
          aria-current={p === page ? 'page' : undefined}
        >
          {p}
        </button>
      ))}

      <button
        className={`${btnIcon(page === totalPages)} hidden md:flex`}
        disabled={page === totalPages}
        onClick={() => onChange(clamp(page + 1))}
        aria-label="다음"
      >
        <Image
          src="/icons/pagination_right.svg"
          alt="next page"
          width={24}
          height={24}
          className="pointer-events-none"
        />
      </button>

      <button
        className={btnIcon(page === totalPages)}
        disabled={page === totalPages}
        onClick={() => onChange(totalPages)}
        aria-label="마지막"
      >
        <Image
          src="/icons/double_arrow_right.svg"
          alt="last page"
          width={24}
          height={24}
          className="pointer-events-none"
        />
      </button>
    </nav>
  );
}

export default Pagination;
