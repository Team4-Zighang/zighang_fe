import Image from 'next/image';
import React from 'react';

const AlumniBanner = () => {
  return (
    <div className="relative w-full flex-col">
      <Image
        src="/images/zighang-alumni-d.png"
        alt="alumnibanner"
        className="w-full"
        width={1440}
        height={320}
        priority
      />
      <div className="absolute inset-0 gap-2 px-[120px] pt-20 pb-8">
        <div className="text-contents-primary-accent body-xl-semibold flex items-start">
          동문관
        </div>
        <div className="text-contents-neutral-primary heading-3xl-semibold">
          동문들과 북마크를 공유해요
        </div>
        <div className="text-contents-neutral-secondary body-xl-regular">
          후배, 동기, 선배들이 북마크한 공고들을 확인할 수 있어요
        </div>

        <div className="text-contents-state-unselected body-sm-medium mt-[72px]">
          * 내가 북마크한 기업과 직무는 동문에게 공유될 수 있어요. 단, 서류와
          메모 등의 개인 정보는 공유되지 않으니 안심하세요.
        </div>
      </div>
    </div>
  );
};

export default AlumniBanner;
