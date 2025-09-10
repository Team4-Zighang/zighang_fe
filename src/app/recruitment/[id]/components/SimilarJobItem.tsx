import Image from 'next/image';
import React from 'react';

const SimilarJobItem = () => {
  return (
    <a
      href="/recruitment/1" // 추후 id로 변경
      className="border-base-neutral-border flex cursor-pointer justify-between rounded-[12px] border-[1px] p-[16px]"
    >
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
          <span className="body-lg-semibold text-contents-neutral-primary">
            사업 전략 및 신규 사업 개발
          </span>
          <span className="body-sm-medium text-contents-neutral-tertiary">
            (주)삼성전자
          </span>
          <div className="flex gap-[6px]">
            <span className="md:web-badge-sm mobile-badge-sm bg-base-neutral-alternative text-contents-neutral-tertiary flex items-center rounded-[8px] px-[8px] py-[4px]">
              서비스 기획자
            </span>
            <span className="md:web-badge-sm mobile-badge-sm bg-base-neutral-alternative text-contents-neutral-tertiary flex items-center rounded-[8px] px-[8px] py-[4px]">
              정규직
            </span>
            <span className="md:web-badge-sm mobile-badge-sm bg-base-neutral-alternative text-contents-neutral-tertiary flex items-center rounded-[8px] px-[8px] py-[4px]">
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
    </a>
  );
};

export default SimilarJobItem;
