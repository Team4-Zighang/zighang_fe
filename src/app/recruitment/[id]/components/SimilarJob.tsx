import Image from 'next/image';
import React from 'react';
import SimilarJobItem from './SimilarJobItem';
import { useRecruitmentDetail } from '@/hooks/queries/useRecruitment';

function getRandomPostingIds(count = 6, min = 30000, max = 35000) {
  const ids = new Set<number>();
  while (ids.size < count) {
    ids.add(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return Array.from(ids);
}

function useMultipleRecruitmentDetails(ids: number[]) {
  return ids.map((id) => useRecruitmentDetail({ postingId: id }));
}

const SimilarJob = () => {
  const randomIds = React.useMemo(() => getRandomPostingIds(), []);
  const jobDetails = useMultipleRecruitmentDetails(randomIds);

  return (
    <div className="flex flex-col gap-[8px] py-[36px] md:gap-[20px]">
      <div className="flex flex-col gap-[8px]">
        <span className="heading-sm-bold text-contents-neutral-primary">
          비슷한 채용공고
        </span>
        <div className="flex justify-between py-[8px] md:justify-start md:gap-[8px]">
          <div className="flex gap-[6px]">
            <span className="mobile-badge-lg md:body-sm-medium bg-base-neutral-alternative text-contents-neutral-tertiary flex h-[31px] items-center rounded-[8px] px-[10px] md:h-[36px] md:px-[16px]">
              서비스 기획자
            </span>
            <span className="mobile-badge-lg md:body-sm-medium bg-base-neutral-alternative text-contents-neutral-tertiary flex h-[31px] items-center rounded-[8px] px-[10px] md:h-[36px] md:px-[16px]">
              정규직
            </span>
            <span className="mobile-badge-lg md:body-sm-medium bg-base-neutral-alternative text-contents-neutral-tertiary flex h-[31px] items-center rounded-[8px] px-[10px] md:h-[36px] md:px-[16px]">
              3년차 이상
            </span>
          </div>
          <div className="flex items-center gap-[4px]">
            <span className="mobile-badge-lg md:body-lg-semibold text-contents-primary-default">
              22곳
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
      <div className="flex flex-col gap-[8px]">
        {jobDetails.map(({ data }, idx) =>
          data?.data ? (
            <SimilarJobItem
              key={randomIds[idx]}
              item={data.data}
              isLoading={!data}
            />
          ) : null
        )}
      </div>
    </div>
  );
};

export default SimilarJob;
