'use client';
import { useAlumniDetailInfo } from '@/hooks/queries/useAlumni';
import Image from 'next/image';
import React from 'react';

interface AlumniModalProps {
  onClose: () => void;
  memberId: number;
}

const AlumniModal = ({ onClose, memberId }: AlumniModalProps) => {
  const {
    data: detailInfo,
    isLoading,
    isError,
  } = useAlumniDetailInfo(memberId);

  if (isLoading) return <div>로딩 중...</div>;
  if (isError || !detailInfo) return <div>에러가 발생했습니다.</div>;

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/40">
      <div className="bg-base-white shadow-modal flex h-screen w-full flex-col rounded-none px-5 py-0 md:h-[635px] md:max-w-[630px] md:rounded-[12px] md:px-[23px] md:py-10">
        <div className="relative mt-4 mb-8 flex w-full items-center justify-center md:mt-0 md:mb-3">
          <h2 className="body-2xl-semibold md:web-title1 text-center text-gray-900">
            {detailInfo.memberName}님의 북마크
          </h2>
          <button onClick={onClose} className="absolute right-0 cursor-pointer">
            <Image src="/icons/close.svg" alt="닫기" width={28} height={28} />
          </button>
        </div>

        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-center md:gap-6">
          <div className="flex items-center gap-[10px]">
            <span className="bg-base-primary-default text-base-white web-badge-sm rounded-[4px] px-1 py-[2px]">
              학과명
            </span>
            <span className="text-contents-neutral-secondary web-badge-lg">
              {detailInfo.major}
            </span>
          </div>
          <div className="flex items-center gap-[10px]">
            <span className="bg-base-primary-default text-base-white web-badge-sm rounded-[4px] px-1 py-[2px]">
              희망 직무
            </span>
            <span className="text-contents-neutral-secondary web-badge-lg">
              {detailInfo.jobRole}
            </span>
          </div>
        </div>
        <div className="bg-base-neutral-border mt-4 h-[1px] w-full md:hidden"></div>

        <div className="md:custom-scrollbar mt-8 flex flex-1 flex-col gap-4 overflow-y-auto pb-3 md:mt-6 md:max-h-[450px] md:pb-0">
          {detailInfo.scrapList.map((scrap) => (
            <div
              key={scrap.postingId}
              className="border-base-neutral-border bg-base-neutral-default shadow-modal flex w-full rounded-2xl border md:w-[550px] md:rounded-3xl"
            >
              <div className="flex min-w-0 flex-1 items-center gap-3 px-3 py-4 md:gap-4 md:px-4 md:py-6">
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
                  <div className="text-contents-neutral-tertiary mobile-summary md:web-summary">
                    {scrap.companyName}
                  </div>
                  <div className="text-contents-neutral-primary mobile-title2 md:web-title2 mt-[6px] md:mt-3">
                    {scrap.postingTitle}
                  </div>
                  <div className="mt-[6px] flex items-center md:mt-3">
                    <div className="text-contents-neutral-tertiary mobile-badge-lg md:body-lg-medium truncate">
                      {[
                        scrap.career,
                        scrap.recruitmentType,
                        scrap.education,
                        scrap.region,
                      ].join(' · ')}
                    </div>
                    <span className="text-base-neutral-border mx-2 md:mx-3">
                      |
                    </span>
                    <div className="flex items-center gap-[2px]">
                      <Image
                        src="/icons/visibility.svg"
                        alt="visibility"
                        width={20}
                        height={20}
                        className="h-3 w-3 md:h-5 md:w-5"
                      />
                      <span className="text-contents-neutral-tertiary mobile-badge-sm md:web-summary">
                        {scrap.totalViews}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-base-neutral-border flex w-10 flex-col self-stretch border-l md:w-[84px]">
                <button
                  aria-label="북마크"
                  className="flex flex-1 items-center justify-center"
                >
                  <Image
                    src={
                      scrap.isSaved
                        ? '/icons/bookmark_selected.svg'
                        : '/icons/bookmark_gray.svg'
                    }
                    alt="bookmark"
                    width={24}
                    height={24}
                    className="h-5 w-5 md:h-7 md:w-7"
                  />
                </button>
                <div className="border-base-neutral-border flex flex-1 items-center justify-center border-t">
                  <span className="text-contents-neutral-tertiary mobile-subtitle2 md:web-subtitle1">
                    {scrap.dday}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlumniModal;
