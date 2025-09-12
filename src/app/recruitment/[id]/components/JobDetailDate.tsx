import Image from 'next/image';
import React from 'react';

const JobDetailDate = ({
  expiredDate,
  uploadDate,
}: {
  expiredDate?: string;
  uploadDate?: string;
}) => {
  return (
    <>
      <div className="bg-base-primary-alternative flex h-[44px] w-full items-center gap-[16px] rounded-[8px] px-[16px] md:h-[48px] md:px-[20px]">
        <span className="text-contents-primary-default body-sm-semibold md:body-lg-semibold flex gap-[8px]">
          <Image
            src="/icons/calender.svg"
            width={20}
            height={20}
            alt="calender"
          />
          {expiredDate === '무관' || '상시채용'
            ? expiredDate
            : `${expiredDate} 마감`}
        </span>
        <span className="text-contents-neutral-tertiary caption-md-medium md:body-sm-medium">
          {uploadDate}
        </span>
      </div>
    </>
  );
};

export default JobDetailDate;
