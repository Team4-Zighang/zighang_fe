import React from 'react';
import PostingLotto from './components/PostingLotto';
import Image from 'next/image';
import Footer from '../_components/Footer';

const page = () => {
  return (
    <>
      <div className="flex flex-col items-start px-[270px]">
        <PostingLotto />
        <Image
          src="/images/zighang_banner.png"
          alt="배너"
          width={900}
          height={136}
          className="mt-12 w-full"
        />
      </div>
      <Footer />
    </>
  );
};

export default page;
