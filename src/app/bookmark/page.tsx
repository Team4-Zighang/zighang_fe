'use client';
import SearchBar from '../home/components/SearchBar';
import BookmarkList from './components/BookmarkList';
import BookMarkFilter from './components/BookmarkFilter';
import AnalyzeCard from './components/AnalyzeCard';
import ArrayButton from '../_components/common/ArrayButton';
import EntireToggle from './components/EntireToggle';
import BookmarkBanner from './components/BookmarkBanner';

const page = () => {
  // TODO: 로그인 및 데이터 관리 추후 페이지에서 적용
  return (
    <>
      {/* 상단 배너 */}
      <div className="flex-col">
        <BookmarkBanner />
      </div>
      <div className="flex flex-col items-center">
        <div className="flex w-full flex-col gap-[32px] px-[20px] py-[64px] md:w-[1200px]">
          {/* 검색창 */}
          <SearchBar
            mdWidth="w-full"
            placeholder="직무 혹은 기업을 검색해보세요"
          />
          {/* 필터 */}
          <div className="flex flex-col gap-[16px]">
            <div className="flex items-center justify-between">
              <EntireToggle />
              <ArrayButton />
            </div>
            <BookMarkFilter />
            {/* 북마크 리스트 */}
            <BookmarkList />
          </div>
        </div>
        <AnalyzeCard />
      </div>
    </>
  );
};

export default page;
