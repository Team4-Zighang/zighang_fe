import Image from 'next/image';
import React from 'react';

const JobTitleArea = () => {
  return (
    <>
      <div className="flex gap-[16px] py-[12px] md:gap-[20px] md:py-0">
        <section className="border-base-neutral-border h-[80px] w-[80px] overflow-hidden rounded-[16px] border-[1px] bg-white object-cover md:h-[120px] md:w-[120px]">
          <Image
            src="/images/example_company.png"
            width={120}
            height={120}
            alt="company_logo"
          />
        </section>
        <div className="flex flex-col justify-center gap-[8px]">
          <span className="mobile-title1 md:web-title1 text text-contents-neutral-primary">
            직무이름
          </span>
          <span className="mobile-subtitle1 md:web-subtitle1 text-contents-neutral-tertiary">
            회사이름
          </span>
          <div className="mobile-badge-sm md:web-badge-sm flex h-[24px] gap-[4px] md:h-[28px] md:gap-[8px]">
            <span className="text-contents-primary-default flex items-center gap-[2px] rounded-[8px] bg-purple-200 px-[8px] md:gap-[8px]">
              <Image
                src="/icons/hot.svg"
                width={18}
                height={18}
                alt="hot_icon"
                className="h-[14px] w-[14px] md:h-[18px] md:w-[18px]"
              />
              오늘 뜬 공고
            </span>
            <span className="text-contents-neutral-tertiary bg-base-neutral-alternative flex items-center gap-[4px] rounded-[8px] px-[8px] md:gap-[8px]">
              <Image
                src="/icons/eye.svg"
                width={18}
                height={18}
                alt="eye_icon"
                className="h-[14px] w-[14px] md:h-[18px] md:w-[18px]"
              />
              000
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobTitleArea;
