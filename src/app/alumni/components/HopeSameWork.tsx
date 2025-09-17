'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import HomeSameWorkPage from './HomeSameWorkPage';
import { useRouter } from 'next/navigation';
import { getMember, getToken } from '@/store/member';

const HopeSameWork = () => {
  const router = useRouter();
  const [schoolName, setSchoolName] = useState<string>('');
  const [jobRoles, setJobRoles] = useState<string[]>([]);

  useEffect(() => {
    const memberData = getMember();
    const token = getToken();

    if (memberData) {
      setSchoolName(memberData.onboarding?.school || '');
      setJobRoles(memberData.jobRole?.jobRole || []);
    }

    if (!token) {
      setSchoolName('');
    }
  }, []);

  const handleClick = () => {
    const token = getToken();
    if (!schoolName || !token) {
      router.push('/onboarding');
    }
  };

  return (
    <div className="flex w-full flex-col items-start md:px-[120px] md:py-20">
      <div className="flex w-full flex-col items-start px-5 pt-12 md:px-0 md:py-0">
        <div className="web-title2 md:heading-1xl-semibold text-black md:whitespace-nowrap">
          같은 직무를 희망하는
          <span className="block md:inline"> 동문의 공고를 볼 수 있어요</span>
        </div>

        <div
          className="mt-8 mb-4 flex w-full cursor-pointer justify-end lg:hidden"
          onClick={() => router.push('/onboarding')}
        >
          <button type="button" aria-label="희망 직무 도움말">
            <Image src="/icons/help.svg" alt="help" width={20} height={20} />
          </button>
        </div>

        <div
          className="flex w-full flex-col gap-6 md:mt-8 md:flex-row md:items-center md:justify-between"
          onClick={handleClick}
        >
          <div className="flex flex-col gap-4 md:flex-row md:gap-[57px]">
            <div className="flex flex-row items-center gap-[13.5px]">
              <div className="flex shrink-0 flex-row items-center gap-2">
                <Image
                  src="/icons/school.svg"
                  alt="school"
                  width={24}
                  height={24}
                />
                <div className="text-contents-neutral-tertiary body-md-medium">
                  학교명
                </div>
              </div>

              <div className="bg-base-neutral-alternative text-contents-neutral-secondary body-md-medium flex h-[34px] min-w-0 flex-1 items-center rounded-[12px] px-[20px] md:w-[248px] md:flex-none">
                <span className="truncate">
                  {schoolName || '학교 선택 필요'}
                </span>
              </div>
            </div>

            <div className="flex flex-row items-center gap-[13.5px]">
              <div className="flex shrink-0 flex-row items-center gap-2">
                <Image
                  src="/icons/library.svg"
                  alt="job"
                  width={24}
                  height={24}
                />
                <div className="text-contents-neutral-tertiary body-md-medium">
                  직무명
                </div>
              </div>
              <div className="bg-base-neutral-alternative text-contents-neutral-secondary body-md-medium flex h-[34px] min-w-0 flex-1 items-center rounded-[12px] px-[20px] text-ellipsis md:w-[248px] md:flex-none">
                <span className="truncate">
                  {jobRoles.length > 0 ? jobRoles.join(', ') : '직무 선택 필요'}
                </span>
              </div>
            </div>
          </div>
          <div
            className="bg-base-primary-alternative hidden cursor-pointer flex-row items-center gap-1 rounded-[6px] px-3 py-2 lg:flex"
            onClick={() => router.push('/onboarding')}
          >
            <Image src="/icons/help.svg" alt="help" width={24} height={24} />
            <div className="body-lg-medium break-words whitespace-normal text-purple-900">
              희망 직무가 변경되셨나요?
            </div>
          </div>
        </div>
      </div>

      <HomeSameWorkPage />
    </div>
  );
};

export default HopeSameWork;
