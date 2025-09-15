'use client';
import JobInfoBanner from './components/JobInfoBanner';
import JobExitTab from './components/JobExitTab';
import BookmarkMemo from './components/BookmarkMemo';
import RecruitFooter from './components/RecruitFooter';
import { useState } from 'react';
import TopAlert from './components/TopAlert';
import JobDetail from './components/JobDetail';

const Page = () => {
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
          <JobDetail />
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

export default Page;
