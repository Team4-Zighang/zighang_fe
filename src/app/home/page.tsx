import React from 'react';
import PostingLotto from './components/PostingLotto';
import Image from 'next/image';
import Footer from '../_components/common/Footer';

const page = () => {
  return (
    <>
      <div className="flex flex-col items-start px-4 lg:px-[270px]">
        <Image
          src="/images/zighang_banner.png"
          alt="배너"
          width={900}
          height={136}
          className="sm:mt-6 sm:block sm:w-full"
        />
        <PostingLotto />
      </div>
      <Footer />
    </>
  );
};

export default page;
