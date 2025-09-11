'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

type PaginationProps = {
  totalPages: number;
  page: number;
  onChange: (p: number, isMobile: boolean) => void;
  className?: string;
};

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(max-width: 768px)');
    const update = () => setIsMobile(mq.matches);

    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return isMobile;
};

function range(a: number, b: number) {
  return Array.from({ length: Math.max(0, b - a + 1) }, (_, i) => a + i);
}

function Pagination({
  totalPages,
  page,
  onChange,
  className = '',
}: PaginationProps) {
  const isMobile = useIsMobile();
  const windowSize = isMobile ? 3 : 6;
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
        onClick={() => onChange(1, isMobile)}
        aria-label="처음"
      >
        <Image
          src="/icons/double_arrow_left.svg"
          alt="first page"
          width={24}
          height={24}
        />
      </button>

      <button
        className={`${btnIcon(page === 1)} hidden md:flex`}
        disabled={page === 1}
        onClick={() => onChange(clamp(page - 1), isMobile)}
        aria-label="이전"
      >
        <Image
          src="/icons/pagination_left.svg"
          alt="prev page"
          width={24}
          height={24}
        />
      </button>

      {pages.map((p) => (
        <button
          key={p}
          className={btnNum(p)}
          onClick={() => onChange(p, isMobile)}
          aria-current={p === page ? 'page' : undefined}
        >
          {p}
        </button>
      ))}

      <button
        className={`${btnIcon(page === totalPages)} hidden md:flex`}
        disabled={page === totalPages}
        onClick={() => onChange(clamp(page + 1), isMobile)}
        aria-label="다음"
      >
        <Image
          src="/icons/pagination_right.svg"
          alt="next page"
          width={24}
          height={24}
        />
      </button>

      <button
        className={btnIcon(page === totalPages)}
        disabled={page === totalPages}
        onClick={() => onChange(totalPages, isMobile)}
        aria-label="마지막"
      >
        <Image
          src="/icons/double_arrow_right.svg"
          alt="last page"
          width={24}
          height={24}
        />
      </button>
    </nav>
  );
}

export default Pagination;
