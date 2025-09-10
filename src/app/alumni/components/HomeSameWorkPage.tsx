import React from 'react';
import JobCard from './JobCard';
import PopularCompany from './PopularCompany';

const HomeSameWorkPage = () => {
  return (
    <div className="mt-8 flex w-full flex-col md:flex-row md:gap-6">
      <div className="flex w-full flex-col gap-5 bg-gray-100 px-[26px] pt-14 pb-6 md:w-[588px] md:rounded-[12px] md:px-[26px] md:py-6">
        <div className="text-contents-neutral-secondary heading-lg-semibold">
          가장 뜨거운 공고 TOP3
        </div>

        <div className="md:contents">
          <JobCard />
        </div>
      </div>

      <div className="flex w-full flex-col bg-gray-100 px-[26px] pt-10 pb-14 md:flex-1 md:rounded-[12px] md:px-[26px] md:py-6">
        <div className="text-contents-neutral-secondary heading-md-semibold md:heading-lg-semibold">
          가장 인기 많은 기업 TOP3
        </div>
        <PopularCompany />
      </div>
    </div>
  );
};

export default HomeSameWorkPage;
