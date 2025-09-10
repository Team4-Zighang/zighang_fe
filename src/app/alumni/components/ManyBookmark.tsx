'use client';
import ArrayButton from '@/app/_components/common/ArrayButton';
import Pagination, {
  useResponsivePageSize,
} from '@/app/_components/common/Pagination';
import { Toggle } from '@/app/_components/common/Toggle';
import Image from 'next/image';
import React, { useEffect, useMemo, useState } from 'react';

const jobs = [
  {
    company: '가우디오랩',
    title: 'Backend Developer (Java) - 1년 이상',
    certifications: ['신입~8년차', '정규직', '학력 무관', '서울'],
    status: '상시',
  },
  {
    company: '네이버',
    title: 'Backend Developer (Java) - 1년 이상',
    certifications: ['신입~8년차', '정규직', '학력 무관', '서울'],
    status: '상시',
  },
  {
    company: '카카오',
    title: 'Senior Product Manager (SCM Demand Forecasting Science)',
    certifications: ['5~10년차', '정규직', '학력 무관', '서울'],
    status: '상시',
  },
];

const jobList = Array.from({ length: 24 }, (_, i) => ({
  ...jobs[i % jobs.length],
}));

const ManyBookmark = () => {
  const pageSize = useResponsivePageSize(3, 6);
  const [page, setPage] = useState(1);
  const [showClosed, setShowClosed] = useState(false);

  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(jobList.length / pageSize));
    if (page > totalPages) setPage(totalPages);
  }, [pageSize]);

  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return jobList.slice(start, start + pageSize);
  }, [page, pageSize]);

  return (
    <div className="flex flex-col items-start px-5 pt-24 pb-12 md:px-[120px] md:pt-0 md:pb-8">
      <div className="text-contents-neutral-primary web-title2 md:heading-1xl-semibold">
        지우님의 동문들이
        <span className="block md:inline">
          {' '}
          가장 많이 북마크한 공고를 살펴보세요!
        </span>
      </div>

      <div className="mt-4 w-full text-sm md:mt-8 md:text-base">
        <div className="flex w-full flex-row items-center justify-between">
          <div className="flex items-center">
            <div className="text-contents-neutral-primary body-xl-semibold md:body-2xl-semibold">
              총 {jobList.length}건
            </div>
            <div className="text-base-neutral-border mx-2 md:mx-3">|</div>

            <Toggle
              checked={showClosed}
              onChange={setShowClosed}
              label="마감된 공고도 보기"
              className="hidden md:flex"
            />
          </div>
          <ArrayButton />
        </div>

        {/* 모바일 */}
        <Toggle
          checked={showClosed}
          onChange={setShowClosed}
          label="마감된 공고도 보기"
          className="mt-1 md:hidden"
        />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:mt-8 md:grid-cols-2 md:gap-x-4 md:gap-y-6">
        {paged.map((job, idx) => (
          <div
            key={`${page}-${idx}`}
            className="border-base-neutral-border flex rounded-[12px] border bg-white"
          >
            <div className="flex min-w-0 flex-1 items-center gap-[10px] px-2 py-4 md:gap-4 md:p-4">
              <div className="border-base-neutral-border relative h-[44px] w-[44px] overflow-hidden rounded-[12px] border bg-gray-50 md:h-[80px] md:w-[80px]">
                <Image
                  src="/images/sampleimage.png"
                  alt={`${job.company} logo`}
                  fill
                  sizes="(min-width: 768px) 80px, 44px"
                  className="object-contain"
                />
              </div>

              <div className="flex min-w-0 flex-1 flex-col">
                <div className="text-contents-neutral-tertiary md:web-summary mobile-summary">
                  {job.company}
                </div>
                <div className="text-contents-neutral-primary mobile-title2 md:web-title2 mt-[6px] md:mt-3">
                  {job.title}
                </div>
                <div className="mt-[6px] flex flex-row items-center md:mt-3">
                  <div className="text-contents-neutral-tertiary mobile-badge-lg md:body-lg-medium truncate">
                    {job.certifications.join(' · ')}
                  </div>
                  <div className="text-base-neutral-border mx-[6px] md:mx-3">
                    |
                  </div>
                  <div className="flex flex-row items-center gap-[1px] md:gap-[2px]">
                    <Image
                      src="/icons/visibility.svg"
                      alt="visibility"
                      width={20}
                      height={20}
                      className="h-3 w-3 md:h-5 md:w-5"
                    />
                    <div className="text-contents-neutral-tertiary mobile-badge-sm md:web-summary">
                      387
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-base-neutral-border flex w-12 flex-col self-stretch border-l md:w-[84px]">
              <button
                aria-label="북마크"
                className="flex flex-1 items-center justify-center"
              >
                <Image
                  src="/icons/bookmark_gray.svg"
                  alt="bookmark"
                  width={28}
                  height={28}
                  className="h-5 w-5 md:h-7 md:w-7"
                />
              </button>
              <div className="border-base-neutral-border flex flex-1 items-center justify-center border-t">
                <div className="text-contents-neutral-tertiary mobile-subtitle2 md:web-subtitle1">
                  {job.status}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Pagination
        total={jobList.length}
        page={page}
        pageSize={pageSize}
        onChange={setPage}
        windowSize={5}
        className="mt-8"
      />
    </div>
  );
};

export default ManyBookmark;
