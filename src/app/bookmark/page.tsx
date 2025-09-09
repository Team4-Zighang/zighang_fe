'use client';
import Footer from '../_components/common/Footer';
import Header from '../_components/common/Header';
import SearchBar from '../home/components/SearchBar';
import BookmarkList from './components/BookmarkList';
import BookMarkFilter from './components/BookmarkFilter';
import AnalyzeCard from './components/AnalyzeCard';
import ArrayButton from './components/ArrayButton';
import EntireToggle from './components/EntireToggle';

const page = () => {
  // TODO: 로그인 및 데이터 관리 추후 페이지에서 적용
  return (
    <>
      <Header />
      {/* 상단 배너 */}
      <div className="flex-col">
        <div className="flex h-[320px] w-full bg-[url('/images/zighang_bookmark_mo.png')] bg-cover bg-center py-[32px] md:bg-[url('/images/zighang_bookmark.png')] md:pt-[80px]">
          <div className="mx-[20px] flex h-full flex-col justify-between md:mx-auto md:w-[1200px]">
            <div className="flex flex-col">
              <span className="text-contents-primary-accent body-xl-semibold">
                북마크
              </span>
              <span className="heading-3xl-semibold hidden py-[8px] md:block">
                내가 담은 기회, 한눈에 확인하세요!
              </span>
              <span className="body-xl-regular hidden text-[#474748] md:block">
                저장해둔 공고와 메모를 언제든 간편하게 볼 수 있어요
              </span>
              <span className="heading-lg-semibold block py-[8px] md:hidden">
                내가 담은 기회,
                <br /> 한눈에 확인하세요!
              </span>
              <span className="body-md-medium block text-[#474748] md:hidden">
                저장해둔 공고와 메모를 <br />
                언제든 간편하게 볼 수 있어요
              </span>
            </div>
            <span className="text-contents-state-unselected body-sm-medium">
              * 내가 북마크한 기업과 직무는 동문에게 공유될 수 있어요. 단,
              서류와 메모 등의 개인 정보는 공유되지 않으니 안심하세요.
            </span>
          </div>
        </div>
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
      <Footer />
    </>
  );
};

export default page;
