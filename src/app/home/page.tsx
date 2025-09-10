import React from 'react';
import PostingLotto from './components/PostingLotto';
import Image from 'next/image';
import Footer from '../_components/common/Footer';
import Header from '../_components/common/Header';
import SearchBar from './components/SearchBar';
import NavigateGroup from './components/NavigateGroup';
import JobGroup from './components/JobGroup';

const page = () => {
  return (
    <>
      <div className="flex flex-col items-center overflow-visible px-[16px]">
        <div className="flex w-full flex-col gap-[24px]">
          <div className="flex flex-col items-stretch gap-[20px] pt-[36px] md:items-center md:px-0 md:pt-[80px]">
            <div className="mobile-title1 md:heading-md-bold flex flex-col items-center md:flex-row md:text-[22px]">
              <span>대기업 및 유니콘 채용 공고를&nbsp;</span>
              <div className="flex">
                <span className="text-contents-primary-default">
                  빠짐없이 모두&nbsp;
                </span>
                <span>모았어요.</span>
              </div>
            </div>
            <SearchBar />
          </div>
          <NavigateGroup />
        </div>
        {/* 반응형 대응 */}
        <div className="mx-auto flex w-full max-w-[900px] flex-col items-center">
          <JobGroup />
          <Image
            src="/images/zighang_banner.png"
            alt="배너"
            width={900}
            height={136}
            className="w-full rounded-[8px] pt-[20px] md:pt-[24px]"
          />
          <PostingLotto />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default page;
