'use client';

import ArrayButton from '@/app/_components/common/ArrayButton';
import Loader from '@/app/_components/common/Loader';
import Pagination from '@/app/_components/common/Pagination';
import { Toggle } from '@/app/_components/common/Toggle';
import { useCardScrapMutation } from '@/hooks/mutation/useCardMutation';
import { useGetAlumniScrap } from '@/hooks/queries/useAlumni';
import { getMember, getToken } from '@/store/member';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const ManyBookmark = () => {
  const [page, setPage] = useState(1);
  const [showClosed, setShowClosed] = useState(false);

  const { data: scrapdata, isLoading, isError } = useGetAlumniScrap(page);
  const router = useRouter();
  const scrapmutate = useCardScrapMutation();
  const memberData = getMember();

  useEffect(() => {}, [page]);

  //수정예정
  const token = getToken();
  if (!token) {
    return (
      <div className="flex w-full flex-col items-center justify-center">
        <Image
          src="/icons/lock.svg"
          alt="nologin"
          width={36}
          height={36}
          className="h-6 w-6 md:h-9 md:w-9"
        />
        <div className="text-contents-primary-accent heading-md-semibold">
          로그인 후 이용 가능
        </div>
      </div>
    );
  }

  if (isLoading)
    return (
      <div className="flex w-full items-center justify-center">
        <Loader />
      </div>
    );
  if (isError) return <div className="text-center">에러가 발생했습니다.</div>;

  const items = Array.isArray(scrapdata?.data) ? scrapdata!.data : [];

  return (
    <>
      <div className="mt-4 w-full text-sm md:mt-8 md:text-base">
        <div className="flex w-full flex-row items-center justify-between">
          <div className="flex items-center">
            <div className="text-contents-neutral-primary body-xl-semibold md:body-2xl-semibold">
              총 {scrapdata?.totalElements ?? 0}건
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
        {items.map((scrap) => (
          <div
            key={scrap.postingId}
            onClick={() => router.push(`/recruitment/${scrap.postingId}`)}
            className="border-base-neutral-border flex cursor-pointer rounded-[12px] border bg-white md:w-[592px]"
          >
            <div className="flex min-w-0 flex-1 items-center gap-[10px] px-2 py-4 md:gap-4 md:p-4">
              <div className="border-base-neutral-border relative h-[44px] w-[44px] overflow-hidden rounded-[12px] border bg-gray-50 md:h-[80px] md:w-[80px]">
                <Image
                  src={scrap.companyImageUrl || '/images/sampleimage.png'}
                  alt={`${scrap.companyName} logo`}
                  fill
                  sizes="(min-width: 768px) 80px, 44px"
                  className="object-contain"
                />
              </div>

              <div className="flex min-w-0 flex-1 flex-col">
                <div className="text-contents-neutral-tertiary md:web-summary mobile-summary">
                  {scrap.companyName}
                </div>
                <div className="text-contents-neutral-primary mobile-title2 md:web-title2 mt-[6px] md:mt-3">
                  {scrap.postingTitle}
                </div>
                <div className="mt-[6px] flex flex-row items-center md:mt-3">
                  <div className="text-contents-neutral-tertiary mobile-badge-lg md:body-lg-medium truncate">
                    {[
                      scrap.career,
                      scrap.recruitmentType,
                      scrap.education,
                      scrap.region,
                    ].join(' · ')}
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
                      {scrap.totalViews}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-base-neutral-border flex w-12 flex-col self-stretch border-l md:w-[84px]">
              <button
                aria-label="북마크"
                className="flex flex-1 cursor-pointer items-center justify-center"
                onClick={(e) => {
                  e.stopPropagation();
                  scrapmutate.mutate({
                    scrapId: null,
                    jobPostingId: scrap.postingId,
                  });
                }}
              >
                <Image
                  src={
                    scrap.isSaved
                      ? '/icons/bookmark_selected.svg'
                      : '/icons/bookmark_gray.svg'
                  }
                  alt="bookmark"
                  width={28}
                  height={28}
                  className="h-5 w-5 md:h-7 md:w-7"
                />
              </button>
              <div className="border-base-neutral-border flex flex-1 items-center justify-center border-t">
                <div className="text-contents-neutral-tertiary mobile-subtitle2 md:web-subtitle1">
                  {scrap.dday}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Pagination
        totalPages={scrapdata?.totalPages ?? 1}
        page={(scrapdata?.page ?? 0) + 1}
        onChange={setPage}
        className="mt-8"
      />
    </>
  );
};

export default ManyBookmark;
