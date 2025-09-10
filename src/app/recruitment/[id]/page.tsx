import JobTitleArea from './components/JobTitleArea';
import JobInfoBanner from './components/JobInfoBanner';

const page = () => {
  return (
    <>
      {/* 상단 배너 */}
      <JobInfoBanner />
      <div className="flex flex-col items-center">
        <div className="flex w-full justify-between md:w-[1200px]">
          {/* 채용 상세정보 */}
          <div className="flex flex-col gap-[48px] py-[48px] md:w-[640px]">
            <JobTitleArea />
          </div>
          {/* 메모 구역 */}
          <div className="flex flex-col gap-[16px] py-[52px] md:w-[380px]"></div>
        </div>
      </div>
    </>
  );
};

export default page;
