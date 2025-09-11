const JobDetailInfo = () => {
  return (
    <>
      <div className="bg-base-neutral-alternative body-sm-medium flex flex-col gap-[12px] rounded-[8px] px-[24px] py-[20px] md:flex-row md:gap-0">
        <div className="flex flex-1 flex-col gap-[12px]">
          <div className="flex">
            <span className="text-contents-neutral-tertiary w-[80px]">
              경력
            </span>
            <span className="text-contents-neutral-secondary">0년차 이상</span>
          </div>
          <div className="flex">
            <span className="text-contents-neutral-tertiary w-[80px]">
              직군
            </span>
            <span className="text-contents-neutral-secondary">
              프로덕트 매니저, 서비스 기획자
            </span>
          </div>
          <div className="flex">
            <span className="text-contents-neutral-tertiary w-[80px]">
              학력
            </span>
            <span className="text-contents-neutral-secondary">학사 이상</span>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-[12px]">
          <div className="flex">
            <span className="text-contents-neutral-tertiary w-[80px]">
              근무형태
            </span>
            <span className="text-contents-neutral-secondary">
              정규직, 산업기능요원
            </span>
          </div>
          <div className="flex">
            <span className="text-contents-neutral-tertiary w-[80px]">
              근무지역
            </span>
            <span className="text-contents-neutral-secondary">
              경기도 수원시 영통구
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDetailInfo;
