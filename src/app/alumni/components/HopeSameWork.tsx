import Image from 'next/image';
import React from 'react';
import HomeSameWorkPage from './HomeSameWorkPage';

const HopeSameWork = () => {
  return (
    <div className="flex w-full flex-col items-start px-[120px] py-20">
      <div className="flex w-full flex-col gap-8">
        <div className="heading-1xl-semibold text-black">
          같은 직무를 희망하는 동문의 공고를 볼 수 있어요
        </div>

        <div className="flex w-full flex-row justify-between gap-[57px]">
          <div className="flex flex-row items-center gap-[13.5px]">
            <div className="flex flex-row gap-2">
              <Image
                src="/icons/school.svg"
                alt="schoolicon"
                width={24}
                height={24}
                className="ml-[5.5px] h-[24px] w-[24px] flex-shrink-0"
              />
              <div className="text-contents-neutral-tertiary body-md-medium">
                {' '}
                학교명{' '}
              </div>
            </div>
            <div className="bg-base-neutral-alternative text-contents-neutral-secondary body-md-medium flex h-[34px] w-[248px] items-center rounded-[12px] px-[20px]">
              한국대학교
            </div>
          </div>

          <div className="flex flex-row gap-[13.5px]">
            <div className="flex flex-row items-center gap-2">
              <Image
                src="/icons/library.svg"
                alt="libraryIcon"
                width={24}
                height={24}
                className="h-[24px] w-[24px] flex-shrink-0"
              />
              <div className="text-contents-neutral-tertiary body-md-medium">
                직무명
              </div>
            </div>
            <div className="bg-base-neutral-alternative text-contents-neutral-secondary body-md-medium flex h-[34px] w-[248px] items-center rounded-[12px] px-[20px]">
              UIUX·프로덕트, 서비스 기획자
            </div>
          </div>

          <div className="bg-base-primary-alternative flex flex-row items-center gap-1 rounded-[6px] px-3 py-2">
            <Image
              src="/icons/help.svg"
              alt="libraryIcon"
              width={24}
              height={24}
              className="h-[24px] w-[24px] flex-shrink-0"
            />
            <div className="body-lg-medium text-purple-900">
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
