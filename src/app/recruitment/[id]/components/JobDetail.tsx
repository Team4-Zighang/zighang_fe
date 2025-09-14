'use client';
import React, { useEffect } from 'react';
import JobTitleArea from './JobTitleArea';
import JobDetailDate from './JobDetailDate';
import JobDetailInfo from './JobDetailInfo';
import JobRate from './JobRate';
import SimilarJob from './SimilarJob';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useRecruitmentDetail } from '@/hooks/queries/useRecruitment';
import Loader from '@/app/_components/common/Loader';

const JobDetail = () => {
  const { id } = useParams();
  const { data, isLoading, isFetching, isError } = useRecruitmentDetail({
    id: Number(id),
  });

  const job = data?.data;
  const recruitmentOriginalUrl = job?.recruitmentOriginalUrl;
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(
        'recruitmentOriginalUrl',
        recruitmentOriginalUrl || ''
      );
    }
  }, [recruitmentOriginalUrl]);

  if (isFetching || isLoading)
    return (
      <div className="flex h-[100vh] w-full items-center justify-center md:w-[640px]">
        <Loader />
      </div>
    );

  if (isError) {
    return <div>Error occurred while fetching data.</div>;
  }

  return (
    <div className="flex w-full flex-col gap-[20px] px-[16px] md:w-[640px] md:gap-[48px] md:px-0 md:py-[48px]">
      <JobTitleArea item={job!} />
      <div className="flex flex-col gap-[8px]">
        <JobDetailDate
          expiredDate={job?.expiredDate}
          uploadDate={job?.uploadDate}
        />
        <JobDetailInfo item={job!} />
        <JobRate />
      </div>
      <div className="flex w-full justify-center">
        {job?.recruitmentImageUrl ? (
          <Image
            className="object-fit w-full"
            alt="상세 이미지"
            src={job.recruitmentImageUrl}
            width={712}
            height={2610}
          />
        ) : job?.recruitmentContent ? (
          <div
            className="w-full rounded bg-white"
            dangerouslySetInnerHTML={{ __html: job.recruitmentContent }}
          />
        ) : (
          <div className="text-contents-neutral-tertiary">상세 정보 없음</div>
        )}
      </div>
      <SimilarJob />
    </div>
  );
};

export default JobDetail;
