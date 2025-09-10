import Image from 'next/image';
import React from 'react';

const JobInfoBanner = () => {
  return (
    <div className="border-base-neutral-border flex w-full items-center justify-center border border-b-[1px] py-[24px]">
      <div className="flex gap-[20px] md:w-[1200px]">
        <div className="flex gap-[6px]">
          <span className="body-sm-medium bg-base-neutral-alternative text-contents-neutral-tertiary flex h-[36px] items-center rounded-[8px] px-[16px]">
            서비스 기획자
          </span>
          <span className="body-sm-medium bg-base-neutral-alternative text-contents-neutral-tertiary flex h-[36px] items-center rounded-[8px] px-[16px]">
            정규직
          </span>
          <span className="body-sm-medium bg-base-neutral-alternative text-contents-neutral-tertiary flex h-[36px] items-center rounded-[8px] px-[16px]">
            3년차 이상
          </span>
        </div>
        <div className="flex items-center gap-[4px]">
          <span className="body-lg-semibold text-contents-primary-default">
            00곳
          </span>
          <span className="body-lg-medium text-contents-neutral-tertiary">
            에서 채용중
          </span>
          <Image
            className="object-fit"
            alt="arrow"
            src="/icons/arrow_forward.svg"
            width={20}
            height={20}
          />
        </div>
      </div>
    </div>
  );
};

export default JobInfoBanner;
