import Image from 'next/image';
import React from 'react';

const SimilarJobItem = () => {
  // 폰트 디자인 확인 후 재적용
  return (
    <div className="border-base-neutral-border flex cursor-pointer justify-between rounded-[12px] border-[1px] p-[16px]">
      <div className="flex items-center gap-[16px]">
        <section className="border-base-neutral-border h-[64px] w-[64px] overflow-hidden rounded-[16px] border-[1px] bg-white object-cover">
          <Image
            src="/images/example_company.png"
            width={64}
            height={64}
            alt="company_logo"
          />
        </section>
        <div className="flex flex-col gap-[8px]">
          <span className="body-sm-medium text-contents-neutral-primary">
            사업 전략 및 신규 사업 개발
          </span>
          <span className="body-sm-medium text-contents-neutral-tertiary">
            (주)삼성전자
          </span>
          <div className="flex gap-[6px]">
            <span className="caption-sm-medium bg-base-neutral-alternative text-contents-neutral-tertiary flex h-[36px] items-center rounded-[8px] px-[8px]">
              서비스 기획자
            </span>
            <span className="caption-sm-medium bg-base-neutral-alternative text-contents-neutral-tertiary flex h-[36px] items-center rounded-[8px] px-[8px]">
              정규직
            </span>
            <span className="caption-sm-medium bg-base-neutral-alternative text-contents-neutral-tertiary flex h-[36px] items-center rounded-[8px] px-[8px]">
              3년차 이상
            </span>
          </div>
        </div>
      </div>
      <Image
        alt="arrow"
        src={'/icons/arrow_right.svg'}
        width={24}
        height={24}
      />
    </div>
  );
};

export default SimilarJobItem;
