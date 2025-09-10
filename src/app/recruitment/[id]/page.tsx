'use client';
import JobTitleArea from './components/JobTitleArea';
import JobInfoBanner from './components/JobInfoBanner';
import JobDetailDate from './components/JobDetailDate';
import JobDetailInfo from './components/JobDetailInfo';
import JobRate from './components/JobRate';
import Image from 'next/image';
import SimilarJob from './components/SimilarJob';
import JobExitTab from './components/JobExitTab';
import BookmarkMemo from './components/BookmarkMemo';
import RecruitFooter from './components/RecruitFooter';
import { useState } from 'react';
import TopAlert from './components/TopAlert';

const page = () => {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  return (
    <>
      {alertMessage && (
        <TopAlert
          message={alertMessage}
          onClose={() => setAlertMessage(null)}
        />
      )}
      {/* 상단 배너 */}
      <JobInfoBanner />
      <div className="flex w-full flex-col items-center pb-[72px] md:pb-0">
        <div className="flex w-full justify-between md:w-[1200px]">
          {/* 채용 상세정보 */}
          <div className="flex w-full flex-col gap-[20px] px-[16px] md:w-[640px] md:gap-[48px] md:px-0 md:py-[48px]">
            <JobTitleArea />
            <div className="flex flex-col gap-[8px]">
              {/* 마감일 */}
              <JobDetailDate />
              {/* 경력 등 정보 */}
              <JobDetailInfo />
              {/* 공고평 정보 */}
              <JobRate />
            </div>
            <div className="flex justify-center">
              <Image
                className="object-fit w-full"
                alt="상세 이미지"
                src="/images/example.png"
                width={712}
                height={2610}
              />
            </div>
            <SimilarJob />
          </div>
          {/* 메모 구역 */}
          <div className="hidden flex-col gap-[16px] py-[52px] md:flex md:w-[380px]">
            <JobExitTab onBookmarked={() => setAlertMessage('북마크')} />
            <BookmarkMemo onSaved={() => setAlertMessage('메모')} />
          </div>
        </div>
      </div>
      {/* 모바일 하단 고정 버튼 바 */}
      <RecruitFooter />
    </>
  );
};

export default page;
