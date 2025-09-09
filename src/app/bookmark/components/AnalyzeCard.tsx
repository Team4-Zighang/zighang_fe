import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const AnalyzeCard = () => {
  return (
    <div className="md:px-auto flex flex-col gap-[16px] px-[20px] py-[48px] md:w-[1200px]">
      <span className="heading-sm-semibold md:heading-1xl-semibold">
        00님이 북마크한 공고들을 분석했어요!
      </span>
      <div className="bg-base-primary-alternative flex w-full flex-col gap-[24px] rounded-[16px] p-[12px] md:h-[360px] md:flex-row md:gap-[0px] md:p-[0px]">
        <Image
          className="w-full object-contain md:mr-[32px] md:w-[360px]"
          src="/images/zighang_character_1.png"
          alt="zighang character"
          width={360}
          height={360}
        />
        <div className="flex flex-1 flex-col gap-[8px] p-[8px] md:gap-[80px] md:p-0 md:py-[52px]">
          <div className="flex flex-col">
            <span className="text-contents-primary-accent body-lg-semibold md:body-xl-semibold">
              당신의 취업 유형은 바로...
            </span>
            <span className="text-contents-neutral-primary heading-2xl-semibold md:title-lg-semibold">
              듬직행
            </span>
          </div>
          <span className="body-md-medium md:body-xl-regular text-contents-neutral-tertiary">
            주로 대기업에서 주5일 오피스 출근을 선호하시네요. 개인 성장도
            중요하지만, 연봉과 복지를 추구하는 점이 듬직해요!
          </span>
        </div>
        <div className="flex w-full flex-col justify-between gap-[12px] rounded-[12px] bg-white px-[20px] py-[20px] md:m-[32px] md:w-[400px] md:px-[24px]">
          {/* AnalyzeBar로 컴포넌트 분리 */}
          {/* 기업 규모 */}
          <div>
            <div className="mb-[8px] flex items-center">
              <span className="body-lg-semibold text-contents-neutral-tertiary">
                기업 규모
              </span>
              <div className="bg-base-neutral-border mx-[8px] h-[8px] w-px" />
              <div className="flex gap-[4px]">
                <span className="body-lg-semibold text-contents-primary-accent">
                  82%
                </span>
                <span className="body-lg-bold text-contents-neutral-secondary">
                  대기업
                </span>
              </div>
            </div>
            <div className="bg-base-neutral-alternative flex h-[22px] w-full justify-end rounded-[50px] shadow-inner">
              <div className="h-full w-[82%] rounded-[50px] bg-gradient-to-l from-[#9E80FF60] to-[#7A52FF]" />
            </div>
            <div className="mt-[4px] flex justify-between">
              <span className="caption-sm-medium text-contents-state-unselected">
                스타트업
              </span>
              <span className="caption-sm-medium text-contents-state-unselected">
                대기업
              </span>
            </div>
          </div>
          {/* 근무 형태 */}
          <div>
            <div className="mb-[8px] flex items-center">
              <span className="body-lg-semibold text-contents-neutral-tertiary">
                근무 형태
              </span>
              <div className="bg-base-neutral-border mx-[8px] h-[8px] w-px" />
              <div className="flex gap-[4px]">
                <span className="body-lg-semibold text-contents-primary-accent">
                  62%
                </span>
                <span className="body-lg-bold text-contents-neutral-secondary">
                  오피스
                </span>
              </div>
            </div>
            <div className="bg-base-neutral-alternative flex h-[22px] w-full rounded-[50px] shadow-inner">
              <div className="h-full w-[62%] rounded-[50px] bg-gradient-to-r from-[#9E80FF60] to-[#7A52FF]" />
            </div>
            <div className="mt-[4px] flex justify-between">
              <span className="caption-sm-medium text-contents-state-unselected">
                오피스
              </span>
              <span className="caption-sm-medium text-contents-state-unselected">
                원격/탄력
              </span>
            </div>
          </div>
          {/* 가치 추구 */}
          <div>
            <div className="mb-[8px] flex items-center">
              <span className="body-lg-semibold text-contents-neutral-tertiary">
                가치 추구
              </span>
              <div className="bg-base-neutral-border mx-[8px] h-[8px] w-px" />
              <div className="flex gap-[4px]">
                <span className="body-lg-semibold text-contents-primary-accent">
                  54%
                </span>
                <span className="body-lg-bold text-contents-neutral-secondary">
                  연봉/복지
                </span>
              </div>
            </div>
            <div className="bg-base-neutral-alternative flex h-[22px] w-full justify-end rounded-[50px] shadow-inner">
              <div className="h-full w-[54%] rounded-[50px] bg-gradient-to-l from-[#9E80FF60] to-[#7A52FF]" />
            </div>
            <div className="mt-[4px] flex justify-between">
              <span className="caption-sm-medium text-contents-state-unselected">
                개인 성장
              </span>
              <span className="caption-sm-medium text-contents-state-unselected">
                연봉/복지
              </span>
            </div>
          </div>
        </div>
      </div>
      <Link
        href="/"
        className="body-lg-medium md:heading-sm-medium text-contents-neutral-primary active:bg-base-primary-default active:text-contents-state-inverse border-base-neutral-border bg-base-neutral-alternative hover:bg-base-primary-alternative flex h-[52px] items-center justify-center rounded-[16px] border-[1px] md:h-[72px]"
      >
        직행이들의 스토리가 궁금하다면? 👀
      </Link>
    </div>
  );
};

export default AnalyzeCard;
