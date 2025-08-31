'use client';
import Image from 'next/image';
import Footer from '../_components/common/Footer';
import Header from '../_components/common/Header';
import { Toggle } from '../_components/common/Toggle';
import SearchBar from '../home/components/SearchBar';
import { useState } from 'react';
import { BookMarkFilter } from './components/BookmarkFilter';

const page = () => {
  const [showClosed, setShowClosed] = useState(false);

  return (
    <>
      <Header />
      {/* 상단 배너 */}
      <div className="hidden flex-col md:block">
        <div className="flex h-[320px] w-full bg-[url('/images/zighang_bookmark.png')] bg-cover bg-center pt-[80px] pb-[32px]">
          <div className="mx-auto flex h-full w-[1200px] flex-col justify-between">
            <div className="flex flex-col">
              <span className="text-contents-primary-accent body-xl-semibold">
                북마크
              </span>
              <span className="heading-3xl-semibold py-[8px]">
                내가 담은 기회, 한눈에 확인하세요!
              </span>
              <span className="body-xl-regular text-[#474748]">
                저장해둔 공고와 메모를 언제든 간편하게 볼 수 있어요
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
          </div>
        </div>
        {/* 북마크 리스트 */}
        <div className="py-[48px]">공고분석</div>
      </div>
      <div className="block md:hidden">mobile</div>
      <Footer />
    </>
  );
};

export default page;
