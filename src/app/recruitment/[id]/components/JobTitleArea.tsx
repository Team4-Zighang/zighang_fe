import Image from 'next/image';
import React from 'react';

const JobTitleArea = () => {
  return (
    <>
      <div className="flex gap-[20px]">
        <section className="border-base-neutral-border h-[120px] w-[120px] overflow-hidden rounded-[16px] border-[1px] bg-white object-cover">
          <Image
            src="/images/example_company.png"
            width={120}
            height={120}
            alt="company_logo"
          />
        </section>
        <div className="flex flex-col justify-center gap-[8px]">
          <span className="web-title1 text text-contents-neutral-primary">
            직무이름
          </span>
          <span className="web-subtitle1 text-contents-neutral-tertiary">
            회사이름
          </span>
          <div className="web-badge-sm flex gap-[8px]">
            <span className="text-contents-primary-default flex h-[28px] items-center gap-[8px] rounded-[8px] bg-purple-200 px-[8px]">
              <Image
                src="/icons/hot.svg"
                width={18}
                height={18}
                alt="hot_icon"
              />
              오늘 뜬 공고
            </span>
            <span className="text-contents-neutral-tertiary bg-base-neutral-alternative flex h-[28px] items-center gap-[8px] rounded-[8px] px-[8px]">
              <Image
                src="/icons/eye.svg"
                width={18}
                height={18}
                alt="eye_icon"
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
