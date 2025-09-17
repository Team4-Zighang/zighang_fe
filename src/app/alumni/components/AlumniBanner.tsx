import Image from 'next/image';
import React from 'react';

const AlumniBanner = () => {
  return (
    <div className="relative h-[320px] w-full">
      <Image
        src="/images/zighang-alumni-KV-m.webp"
        alt="alumnibanner-mobile"
        fill
        className="object-cover md:hidden"
        priority
      />

      <Image
        src="/images/zighang-alumni-KV-d.webp"
        alt="alumnibanner-desktop"
        fill
        className="hidden object-cover md:block"
        priority
      />

      <div className="absolute inset-0 flex flex-col gap-2 px-5 py-8 md:px-[120px] md:pt-20 md:pb-8">
        <div className="text-contents-primary-accent body-lg-semibold md:body-xl-semibold">
          동문관
        </div>

        <div className="text-contents-neutral-primary heading-2xl-semibold md:heading-3xl-semibold">
          동문들과
          <span className="block md:inline"> 북마크를 공유해요</span>
        </div>

        <div className="text-contents-neutral-secondary body-md-medium md:body-xl-regular">
          후배, 동기, 선배들이 북마크한
          <span className="block md:inline"> 공고들을 확인할 수 있어요</span>
        </div>

        <div className="text-contents-state-unselected body-sm-medium md:body-xs-medium mt-auto md:mt-[72px]">
          * 내가 북마크한 기업과 직무는 동문에게 공유돼요. 단, 서류와 메모 등의
          개인 정보는 공유되지 않으니 안심하세요.
        </div>
      </div>
    </div>
  );
};

export default AlumniBanner;
