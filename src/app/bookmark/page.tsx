'use client';
import Image from 'next/image';
import Footer from '../_components/common/Footer';
import Header from '../_components/common/Header';
import { Toggle } from '../_components/common/Toggle';
import SearchBar from '../home/components/SearchBar';
import { useState } from 'react';
import BookmarkList from './components/BookmarkList';
import BookMarkFilter from './components/BookmarkFilter';
import AnalyzeCard from './components/AnalyzeCard';

const page = () => {
  // TODO: 로그인 및 데이터 관리 추후 페이지에서 적용

  const [showClosed, setShowClosed] = useState(false);

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
        <div className="flex w-[1200px] flex-col gap-[32px] py-[64px]">
          {/* 검색창 */}
          <SearchBar
            mdWidth="w-full"
            placeholder="직무 혹은 기업을 검색해보세요"
          />
          {/* 필터 */}
          <div className="flex flex-col gap-[16px]">
            <div className="flex justify-between">
              <div className="flex items-center">
                <span className="body-2xl-semibold text-contents-neutral-primary">
                  총 00건
                </span>
                <div className="bg-base-neutral-border mx-[12px] h-[16px] w-px self-center" />
                <Toggle
                  checked={showClosed}
                  onChange={setShowClosed}
                  label="마감된 공고도 보기"
                />
              </div>
              <div className="flex cursor-pointer">
                <div className="text-contents-neutral-tertiary web-summary">
                  마감임박순
                </div>
                <Image
                  src="/icons/arrow_under.svg"
                  width={20}
                  height={20}
                  alt=""
                />
              </div>
            </div>
            <BookMarkFilter />
            {/* 북마크 리스트 */}
            <BookmarkList />
          </div>
        </div>
        <AnalyzeCard />
      </div>
      <div className="block md:hidden">mobile</div>
      <Footer />
    </>
  );
};

export default page;
