import React from 'react';
import StarRates from './StarRates';
import { EvalContent } from '@/app/_apis/schemas/recruitmentResponse';

const JobRateItem = ({ item }: { item: EvalContent }) => {
  return (
    <>
      <div className="flex flex-col gap-[4px] rounded-[8px] bg-white p-[12px]">
        <StarRates rate={item.score} />
        <div className="flex justify-between">
          <div className="flex flex-col">
            <span className="body-md-semibold">{item.major}</span>
            <span className="caption-md-medium text-contents-neutral-tertiary">
              {item.createdAt}
            </span>
          </div>
          <span className="body-sm-medium text-contents-primary-default">
            {item.recruitmentStep}
          </span>
        </div>
        <span className="body-md-medium text-contents-neutral-secondary">
          {item.evalText}
        </span>
      </div>
    </>
  );
};

export default JobRateItem;
