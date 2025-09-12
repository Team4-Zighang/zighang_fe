'use client';
import React, { useEffect } from 'react';
import JobTitleArea from './JobTitleArea';
import JobDetailDate from './JobDetailDate';
import JobDetailInfo from './JobDetailInfo';
import JobRate from './JobRate';
import SimilarJob from './SimilarJob';
import Image from 'next/image';

const JobDetail = () => {
  return (
    <div className="flex w-full flex-col gap-[20px] px-[16px] md:w-[640px] md:gap-[48px] md:px-0 md:py-[48px]">
      <JobTitleArea />
      <div className="flex flex-col gap-[8px]">
        <JobDetailDate />
        <JobDetailInfo />
        <JobRate />
      </div>
      <div className="flex justify-center">
        <Image
          className="object-fit w-full"
          alt="상세 이미지"
          src="/images/example.png"
          width={712}
          height={2610}
        />
      </div>
      <SimilarJob />
    </div>
  );
};

export default JobDetail;
