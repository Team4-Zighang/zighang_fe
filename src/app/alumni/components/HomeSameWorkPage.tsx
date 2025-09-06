import React from 'react';
import JobCard from './JobCard';
import PopularCompany from './PopularCompany';

const HomeSameWorkPage = () => {
  return (
    <div className="mt-8 flex w-full flex-row gap-6">
      <div className="flex w-[588px] flex-col gap-5 rounded-[12px] bg-gray-100 px-[26px] py-6">
        <div className="text-contents-neutral-secondary heading-lg-semibold">
          가장 뜨거운 공고 TOP3
        </div>
        <JobCard />
      </div>

      <div className="flex-1 flex-col rounded-[12px] bg-gray-100 px-[26px] py-6">
        <div className="text-contents-neutral-secondary heading-lg-semibold">
          가장 인기 많은 기업 TOP3
        </div>
        <PopularCompany />
      </div>
    </div>
  );
};

export default HomeSameWorkPage;
