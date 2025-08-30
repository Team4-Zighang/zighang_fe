'use client';
import Footer from '../_components/common/Footer';
import Header from '../_components/common/Header';

import { useState } from 'react';

const page = () => {
  const [showClosed, setShowClosed] = useState(false);

  return (
    <>
      <Header />
      <div className="hidden flex-col md:block">
        <div className="flex h-[320px] w-full flex-col bg-[url('/images/zighang_bookmark.png')] bg-cover bg-center pt-[80px] pb-[32px]">
          <span className="text-contents-primary-accent">북마크</span>
          <span className="">내가 담은 기회, 한눈에 확인하세요!</span>
          <span className="body-xl-regular text-[#474748]">
            저장해둔 공고와 메모를 언제든 간편하게 볼 수 있어요
          </span>
          <span className="text-contents-state-unselected">
            * 내가 북마크한 기업과 직무는 동문에게 공유될 수 있어요. 단, 서류와
            메모 등의 개인 정보는 공유되지 않으니 안심하세요.
          </span>
        </div>
      </div>

      <div className="block md:hidden">mobile</div>
      <Footer />
    </>
  );
};

export default page;
