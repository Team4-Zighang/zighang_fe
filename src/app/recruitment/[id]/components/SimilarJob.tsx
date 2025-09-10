import Image from 'next/image';
import React from 'react';
import SimilarJobItem from './SimilarJobItem';

const SimilarJob = () => {
  return (
    <div className="py-36px flex flex-col gap-[20px]">
      <div className="flex flex-col gap-[8px]">
        <span className="heading-sm-bold text-contents-neutral-primary">
          비슷한 채용공고
        </span>
        <div className="flex gap-[8px] py-[8px]">
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
      <div className="flex flex-col gap-[8px]">
        <SimilarJobItem />
        <SimilarJobItem />
        <SimilarJobItem />
        <SimilarJobItem />
        <SimilarJobItem />
        <SimilarJobItem />
      </div>
    </div>
  );
};

export default SimilarJob;
