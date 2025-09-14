'use client';

import { useState } from 'react';
import StarRates from './StarRates';
import Image from 'next/image';
import JobRateItem from './JobRateItem';
import Link from 'next/link';
import JobRateModal from './JobRateModal';
import { useParams } from 'next/navigation';
import { useRecruitmentEvalList } from '@/hooks/queries/useRecruitment';

const JobRate = () => {
  const { id } = useParams();
  const { data, isLoading, isFetching, isError } = useRecruitmentEvalList({
    id: Number(id),
  });

  const evalList = data?.data;
  console.log('evalList', evalList);

  const [isloggedin] = useState(true); // 나중에 로그인 여부로 바꾸기
  const [isRateOpen, setIsRateOpen] = useState(false);

  const onRateClick = () => {
    setIsRateOpen(!isRateOpen);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const onApplyClick = () => {
    setIsModalOpen(true);
  };

  if (isLoading || isFetching) {
    return (
      <div
        className={`bg-base-neutral-alternative flex rounded-[8px] px-[20px] py-[16px]`}
      >
        <span className="text-contents-primary-default body-lg-semibold">
          ??대학교&nbsp;
        </span>
        <span className="text-contents-neutral-primary body-lg-medium">
          동문의 공고평
        </span>
      </div>
    );
  }

  return (
    <>
      <div
        onClick={onRateClick}
        className={`bg-base-neutral-alternative flex cursor-pointer flex-col gap-[12px] rounded-[8px] px-[20px] py-[16px] ${isRateOpen ? 'max-h-[480px]' : ''}`}
      >
        <div className="flex w-full gap-[12px] md:gap-0">
          <div className="flex w-full flex-col justify-between md:flex-row">
            <div>
              <span className="text-contents-primary-default body-lg-semibold">
                {isloggedin ? `${evalList?.schoolName}` : '??대학교'}&nbsp;
              </span>
              <span className="text-contents-neutral-primary body-lg-medium">
                동문의 공고평
              </span>
            </div>
            <div className="flex items-center gap-[4px]">
              <span className="body-lg-semibold text-contents-neutral-primary">
                {isloggedin ? `${evalList?.avgScore.toFixed(1)}` : '??'}
              </span>
              <StarRates rate={isloggedin ? evalList?.avgScore : 0} />
              <span className="caption-md-medium text-contents-neutral-tertiary">
                ({isloggedin ? `${evalList?.totalCount}개` : '??개'})
              </span>
            </div>
          </div>
          <Image
            src={isRateOpen ? '/icons/arrow_up.svg' : '/icons/arrow_down.svg'}
            alt="info"
            width={24}
            height={24}
          />
        </div>
        {isRateOpen && (
          <div className="flex min-h-0 flex-1 flex-col gap-[8px] overflow-y-auto">
            {isloggedin ? (
              (evalList?.totalCount ?? 0) > 0 ? (
                evalList?.evalList.content.map((item, idx) => (
                  <JobRateItem key={item.createdAt ?? idx} item={item} />
                ))
              ) : (
                <div className="text-contents-neutral-tertiary">
                  공고평이 없습니다.
                </div>
              )
            ) : (
              <>
                <div className="flex h-[272px] flex-col items-center justify-center gap-[12px] rounded-[8px] bg-white md:h-[252px]">
                  <Image
                    src="/icons/star_circle.svg"
                    alt="star"
                    width={48}
                    height={48}
                  />
                  <div className="flex flex-col items-center gap-[4px]">
                    <span className="body-2xl-semibold text-contents-neutral-primary">
                      로그인이 필요해요 😢
                    </span>
                    <span className="body-md-medium text-contents-neutral-tertiary">
                      로그인하고 동문들의 공고 평가를 확인해보세요
                    </span>
                  </div>
                  <Link
                    onClick={(e) => e.stopPropagation()}
                    href="/onboarding"
                    className="bg-base-primary-default body-md-semibold text-contents-state-inverse cursor-pointer rounded-[12px] px-[24px] py-[12px]"
                  >
                    로그인하고 동문들의 공고 평가 보기
                  </Link>
                </div>
              </>
            )}
          </div>
        )}
        {isRateOpen && isloggedin && (
          <div
            onClick={(e) => {
              e.stopPropagation();
              onApplyClick();
            }}
            className="bg-base-primary-default body-md-semibold flex justify-center rounded-[12px] px-[24px] py-[12px] text-[#FFEAEA]"
          >
            지원하셨나요? 공고평 등록하기
          </div>
        )}
        {isModalOpen && (
          <div
            className="fixed inset-0 z-20 flex items-center justify-center bg-black/40"
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(false);
            }}
          >
            <JobRateModal onClose={() => setIsModalOpen(false)} />
          </div>
        )}
      </div>
    </>
  );
};

export default JobRate;
