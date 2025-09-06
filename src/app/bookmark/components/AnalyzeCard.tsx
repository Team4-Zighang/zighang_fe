import Image from 'next/image';
import React from 'react';

const AnalyzeCard = () => {
  return (
    <div className="flex w-[1200px] flex-col gap-[16px] py-[48px]">
      <div className="flex items-center justify-between">
        <span className="heading-1xl-semibold">
          00님이 북마크한 공고들을 분석했어요!
        </span>
        <span className="body-2xl-medium text-contents-primary-default underline decoration-solid underline-offset-4">
          내 유형에 맞는 공고 탐색
        </span>
      </div>
      <div className="flex h-[360px] w-full rounded-[16px] bg-[#F6E7FF]">
        <Image
          className="mr-[32px] object-contain"
          src="/images/zighang_character_1.png"
          alt="zighang character"
          width={360}
          height={360}
        />
        <div className="flex flex-1 flex-col gap-[80px] py-[52px]">
          <div className="flex flex-col">
            <span className="text-contents-primary-accent body-xl-semibold">
              당신의 취업 유형은 바로...
            </span>
            <span className="text-contents-neutral-primary title-lg-semibold">
              듬직행
            </span>
          </div>
          <span className="body-xl-regular text-contents-neutral-tertiary">
            주로 대기업에서 주5일 오피스 출근을 선호하시네요. 개인 성장도
            중요하지만, 연봉과 복지를 추구하는 점이 듬직해요!
          </span>
        </div>
        <div className="m-[32px] flex w-[400px] flex-col justify-between rounded-[12px] bg-white px-[24px] py-[20px]">
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
    </div>
  );
};

export default AnalyzeCard;
