import React from 'react';
import StarRates from './StarRates';

const JobRateItem = () => {
  return (
    <>
      <div className="flex flex-col gap-[4px] rounded-[8px] bg-white p-[12px]">
        <StarRates rate={3.4} />
        <div className="flex justify-between">
          <div className="flex flex-col">
            <span className="body-md-semibold">학과명</span>
            <span className="caption-md-medium text-contents-neutral-tertiary">
              2025.09.01
            </span>
          </div>
          <span className="body-sm-medium text-contents-primary-default">
            서류탈락
          </span>
        </div>
        <span className="body-md-medium text-contents-neutral-secondary">
          공고평을 작성해주세고, 공고 설명이 상세해서 지원 준비에 도움이 많이
          되었어요. 다만 우대사항 기준이 조금 모호해서 준비가 어려웠습니다.
          전체적으로 직무 적합성 평가가 잘 드러난 공고였습니다.
        </span>
      </div>
    </>
  );
};

export default JobRateItem;
