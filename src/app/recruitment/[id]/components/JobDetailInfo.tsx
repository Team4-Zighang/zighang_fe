import { RecruitmentItem } from '@/app/_apis/schemas/recruitmentResponse';

const JobDetailInfo = ({ item }: { item: RecruitmentItem }) => {
  return (
    <>
      <div className="bg-base-neutral-alternative body-sm-medium flex flex-col gap-[12px] rounded-[8px] px-[24px] py-[20px] md:flex-row md:gap-0">
        <div className="flex flex-1 flex-col gap-[12px]">
          <div className="flex">
            <span className="text-contents-neutral-tertiary w-[80px]">
              경력
            </span>
            <span className="text-contents-neutral-secondary">
              {item.career ?? ''}
            </span>
          </div>
          <div className="flex">
            <span className="text-contents-neutral-tertiary w-[80px]">
              직군
            </span>
            <span className="text-contents-neutral-secondary">
              {item.depthTwo}
            </span>
          </div>
          <div className="flex">
            <span className="text-contents-neutral-tertiary w-[80px]">
              학력
            </span>
            <span className="text-contents-neutral-secondary">
              {item.education}
            </span>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-[12px]">
          <div className="flex">
            <span className="text-contents-neutral-tertiary w-[80px]">
              근무형태
            </span>
            <span className="text-contents-neutral-secondary">
              {item.workType}
            </span>
          </div>
          <div className="flex">
            <span className="text-contents-neutral-tertiary w-[80px]">
              근무지역
            </span>
            <span className="text-contents-neutral-secondary">
              {item.region}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDetailInfo;
