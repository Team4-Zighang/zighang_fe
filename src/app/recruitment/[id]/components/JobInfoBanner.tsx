import Image from 'next/image';
import React from 'react';

const JobInfoBanner = () => {
  return (
    <div className="border-base-neutral-border flex w-full items-center p-[16px] md:justify-center md:border md:border-b-[1px] md:py-[24px]">
      <div className="flex w-full justify-between md:w-[1200px] md:justify-start md:gap-[20px]">
        <div className="flex gap-[6px]">
          <span className="mobile-badge-lg md:body-sm-medium bg-base-neutral-alternative text-contents-neutral-tertiary flex items-center rounded-[8px] px-[10px] py-[7px] md:h-[36px] md:px-[16px]">
            서비스 기획자
          </span>
          <span className="mobile-badge-lg md:body-sm-medium bg-base-neutral-alternative text-contents-neutral-tertiary flex items-center rounded-[8px] px-[10px] py-[7px] md:h-[36px] md:px-[16px]">
            정규직
          </span>
          <span className="mobile-badge-lg md:body-sm-medium bg-base-neutral-alternative text-contents-neutral-tertiary flex items-center rounded-[8px] px-[10px] py-[7px] md:h-[36px] md:px-[16px]">
            3년차 이상
          </span>
        </div>
        <div className="flex items-center gap-[4px]">
          <span className="mobile-badge-lg md:body-lg-semibold text-contents-primary-default">
            00곳
          </span>
          <span className="mobile-badge-lg md:body-lg-medium text-contents-neutral-tertiary">
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
