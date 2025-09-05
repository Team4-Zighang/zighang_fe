'use client';
import Image from 'next/image';
import Footer from '../_components/common/Footer';
import Header from '../_components/common/Header';
import { Toggle } from '../_components/common/Toggle';
import SearchBar from '../home/components/SearchBar';
import { useState } from 'react';
import BookmarkList from './components/BookmarkList';
import BookMarkFilter from './components/BookmarkFilter';

const page = () => {
  const [showClosed, setShowClosed] = useState(false);

  return (
    <>
      <Header />
      {/* 상단 배너 */}
      <div className="hidden flex-col md:block">
        <div className="flex h-[320px] w-full bg-[url('/images/zighang_bookmark.png')] bg-cover bg-center pt-[80px] pb-[32px]">
          <div className="mx-auto flex h-full w-[1200px] flex-col justify-between">
            <div className="flex flex-col">
              <span className="text-contents-primary-accent body-xl-semibold">
                북마크
              </span>
              <span className="heading-3xl-semibold py-[8px]">
                내가 담은 기회, 한눈에 확인하세요!
              </span>
              <span className="body-xl-regular text-[#474748]">
                저장해둔 공고와 메모를 언제든 간편하게 볼 수 있어요
              </span>
            </div>
            <span className="text-contents-state-unselected body-sm-medium">
              * 내가 북마크한 기업과 직무는 동문에게 공유될 수 있어요. 단,
              서류와 메모 등의 개인 정보는 공유되지 않으니 안심하세요.
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex w-[1200px] flex-col gap-[32px] py-[64px]">
          {/* 검색창 */}
          <SearchBar
            mdWidth="w-full"
            placeholder="직무 혹은 기업을 검색해보세요"
          />
          {/* 필터 */}
          <div className="flex flex-col gap-[16px]">
            <div className="flex justify-between">
              <div className="flex items-center">
                <span className="body-2xl-semibold text-contents-neutral-primary">
                  총 00건
                </span>
                <div className="bg-base-neutral-border mx-[12px] h-[16px] w-px self-center" />
                <Toggle
                  checked={showClosed}
                  onChange={setShowClosed}
                  label="마감된 공고도 보기"
                />
              </div>
              <div className="flex cursor-pointer">
                <div className="text-contents-neutral-tertiary web-summary">
                  마감임박순
                </div>
                <Image
                  src="/icons/arrow_under.svg"
                  width={20}
                  height={20}
                  alt=""
                />
              </div>
            </div>
            <BookMarkFilter />
            {/* 북마크 리스트 */}
            <BookmarkList />
          </div>
        </div>
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
                <span className="text-contents-primary-accent">
                  당신의 취업 유형은 바로...
                </span>
                <span className="text-contents-neutral-primary">듬직행</span>
              </div>
              <span className="body-xl-regular text-contents-neutral-tertiary">
                주로 대기업에서 주5일 오피스 출근을 선호하시네요. 개인 성장도
                중요하지만, 연봉과 복지를 추구하는 점이 듬직해요!
              </span>
            </div>
            <div className="m-[32px] flex w-[400px] flex-col justify-between rounded-[12px] bg-white px-[24px] py-[20px]">
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
                <div className="bg-base-neutral-alternative h-[22px] w-full rounded-[50px] shadow-inner">
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
      </div>
      <div className="block md:hidden">mobile</div>
      <Footer />
    </>
  );
};

export default page;
