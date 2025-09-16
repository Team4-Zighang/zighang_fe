'use client';
import HorizontalScroll from '@/app/_components/common/HorizontalScroll';
import { useAlumniInfo } from '@/hooks/queries/useAlumni';
import Image from 'next/image';
import React, { useState } from 'react';
import AlumniModal from './AlumniModal';
import Loader from '@/app/_components/common/Loader';
import { getToken } from '@/store/member';

const SearchAlumni = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: infoData, isLoading, isError } = useAlumniInfo();
  const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null);

  const token = getToken();

  if (!token) {
    return (
      <div className="mt-8 flex w-full flex-col items-center justify-center">
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

  if (isLoading) {
    return (
      <div className="mt-8 flex w-full items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return <div className="mt-8 text-center">에러가 발생했습니다.</div>;
  }

  return (
    <>
      <div className="mt-8">
        <HorizontalScroll cardWidthMobile={306} cardWidthWeb={356} gap={24}>
          {infoData?.map((info) => {
            const jobRoles = Array.isArray(info.jobRole)
              ? info.jobRole
              : [info.jobRole];
            const majors = Array.isArray(info.major)
              ? info.major
              : [info.major];

            return (
              <div
                key={info.memberId}
                className="bg-base-neutral-alternative w-[306px] shrink-0 snap-start rounded-[12px] px-6 pt-5 pb-7 md:w-[356px] md:px-6"
              >
                <div className="grid grid-cols-2 gap-2">
                  {info?.companyLists.map((b, i) => (
                    <div
                      key={i}
                      className="border-base-neutral-border flex items-center justify-center rounded-[8px] border"
                    >
                      <Image
                        src={b.companyImageUrl || '/images/sampleimage.png'}
                        alt={`${b.companyName} logo`}
                        width={150}
                        height={106}
                        className="h-[89px] w-[126px] rounded-[8px] object-cover md:h-[106px] md:w-[150px]"
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex w-full items-start justify-between">
                  <div className="min-w-0">
                    <div className="text-contents-neutral-tertiary web-summary flex flex-wrap items-center gap-x-1">
                      <span>{info.school}</span>
                      <span className="mx-1 text-gray-400">|</span>
                      {majors.map((m, idx) => (
                        <span key={idx} className="flex items-center">
                          {idx > 0 && (
                            <span className="px-1 text-gray-400">·</span>
                          )}
                          {m}
                        </span>
                      ))}
                    </div>
                    <div className="text-contents-neutral-secondary heading-lg-semibold mt-[6px]">
                      {info.memberName}
                    </div>
                  </div>
                  <Image
                    src="/icons/arrow_right.svg"
                    alt="상세"
                    width={24}
                    height={24}
                    className="mt-4 cursor-pointer"
                    onClick={() => {
                      setSelectedMemberId(info.memberId);
                      setIsOpen(true);
                    }}
                  />
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {jobRoles.map((role, idx) => (
                    <span
                      key={idx}
                      className="rounded-[8px] bg-gray-500 px-2 py-1 text-sm font-medium text-white"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </HorizontalScroll>
      </div>

      {isOpen && selectedMemberId && (
        <AlumniModal
          memberId={selectedMemberId}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default SearchAlumni;
