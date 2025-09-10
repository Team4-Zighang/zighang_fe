import Image from 'next/image';
import React from 'react';

const JobDetailDate = () => {
  return (
    <>
      <div className="bg-base-primary-alternative flex h-[48px] w-full items-center gap-[16px] rounded-[8px] px-[20px]">
        <span className="text-contents-primary-default body-lg-semibold flex gap-[8px]">
          <Image
            src="/icons/calender.svg"
            width={20}
            height={20}
            alt="calender"
          />
          0월 00일 00:00 마감
        </span>
        <span className="text-contents-neutral-tertiary body-sm-medium">
          00월 00일 게시
        </span>
      </div>
    </>
  );
};

export default JobDetailDate;
