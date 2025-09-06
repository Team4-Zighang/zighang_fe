import Image from 'next/image';
import React from 'react';

const jobs = [
  {
    company: '쿠팡',
    title: 'Senior Product Manager (SCM Demand Forecasting Science)',
    certification: '5~10년차 · 정규직 · 학력 무관 · 서울',
    status: '상시',
  },
  {
    company: '네이버',
    title: 'Senior Product Manager (SCM Demand Forecasting Science)',
    certification: '5~10년차 · 정규직 · 학력 무관 · 서울',
    status: '상시',
  },
  {
    company: '카카오',
    title: 'Senior Product Manager (SCM Demand Forecasting Science)',
    certification: '5~10년차 · 정규직 · 학력 무관 · 서울',
    status: '상시',
  },
];

const jobList = [...jobs, ...jobs].slice(0, 6);

const ManyBookmark = () => {
  return (
    <div className="flex flex-col items-start px-[120px] pb-8">
      <div className="text-contents-neutral-primary heading-1xl-semibold">
        지우님의 동문들이 가장 많이 북마크한 공고를 살펴보세요!
      </div>

      <div className="mt-8 flex flex-row">
        <div className="text-contents-neutral-primary body-2xl-semibold">
          총 83건
        </div>
        <div className="text-base-neutral-border mx-3"> | </div>
        <div className="text-contents-neutral-secondary body-lg-medium">
          마감된 공고도 보기
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-6">
        {jobList.map((job, idx) => (
          <div
            key={idx}
            className="border-base-neutral-border flex rounded-[12px] border bg-white"
          >
            <div className="flex w-full flex-1 items-center justify-center gap-6 pl-5">
              <div className="border-base-neutral-border relative h-[80px] w-[80px] rounded-[12px] border bg-gray-50">
                <Image
                  src="/images/sampleimage.png"
                  alt={`${job.company} logo`}
                  width={80}
                  height={80}
                  className="object-fit"
                />
              </div>

              <div className="flex flex-1 flex-col pt-5 pr-5 pb-5">
                <div className="text-contents-neutral-tertiary web-summary">
                  {job.company}
                </div>
                <div className="text-contents-neutral-primary web-title2 mt-3">
                  {job.title}
                </div>
                <div className="text-contents-neutral-secondary body-lg-medium mt-3 line-clamp-1">
                  {job.certification}
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="border-l-base-neutral-border border-b-base-neutral-border flex h-[82px] w-[84px] cursor-pointer flex-col items-center justify-center border-b border-l px-2">
                <Image
                  src={'/icons/bookmark.svg'}
                  alt="bookmark"
                  width={28}
                  height={28}
                  className="h-7 w-7"
                />
              </div>
              <div className="border-l-base-neutral-border flex h-[84px] w-[84px] items-center justify-center border-l px-2">
                <div className="text-contents-neutral-tertiary web-subtitle1">
                  {job.status}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManyBookmark;
