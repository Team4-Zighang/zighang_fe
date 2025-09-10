'use client';

import { useState } from 'react';
import StarRates from './StarRates';
import Image from 'next/image';
import JobRateItem from './JobRateItem';

const JobRate = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onRateClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div
        onClick={onRateClick}
        className={`bg-base-neutral-alternative flex cursor-pointer flex-col gap-[12px] rounded-[8px] px-[20px] py-[16px] ${isOpen ? 'max-h-[480px]' : ''}`}
      >
        <div className="flex w-full gap-[12px] md:gap-0">
          <div className="flex w-full flex-col justify-between md:flex-row">
            <div>
              <span className="text-contents-primary-default body-lg-semibold">
                한국대학교 &nbsp;
              </span>
              <span className="text-contents-neutral-primary body-lg-medium">
                동문의 공고평
              </span>
            </div>
            <div className="flex items-center gap-[4px]">
              <span className="body-lg-semibold text-contents-neutral-primary">
                3.4
              </span>
              <StarRates rate={3.4} />
              <span className="caption-md-medium text-contents-neutral-tertiary">
                (00개)
              </span>
            </div>
          </div>
          <Image
            src={isOpen ? '/icons/arrow_up.svg' : '/icons/arrow_down.svg'}
            alt="info"
            width={24}
            height={24}
          />
        </div>
        {isOpen && (
          <div className="flex min-h-0 flex-1 flex-col gap-[8px] overflow-y-auto">
            <JobRateItem />
            <JobRateItem />
            <JobRateItem />
            <JobRateItem />
          </div>
        )}
        {isOpen && (
          <div className="bg-base-primary-default body-md-semibold flex justify-center rounded-[12px] px-[24px] py-[12px] text-[#FFEAEA]">
            지원하셨나요? 공고평 등록하기
          </div>
        )}
      </div>
    </>
  );
};

export default JobRate;
