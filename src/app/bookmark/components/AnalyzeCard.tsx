import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import AnalyzeBar from './AnalyzeBar';
import { usePersonalityAnalysis } from '@/hooks/queries/useBookmark';
import Loader from '@/app/_components/common/Loader';
import { CHARACTER_MAP } from '@/utils/character';
import { isLoggedIn } from '@/utils/getUser';
import { getMember } from '@/store/member';

const AnalyzeCard = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [name, setName] = useState<string | undefined>();

  useEffect(() => {
    setLoggedIn(isLoggedIn());
    setName(getMember()?.member?.memberName);
  }, []);

  const {
    data: personality,
    isLoading: isLoadingPersonality,
    isFetching,
    isError,
  } = usePersonalityAnalysis();

  const characterInfo =
    personality?.data.characterName &&
    CHARACTER_MAP[personality.data.characterName]
      ? CHARACTER_MAP[personality.data.characterName]
      : CHARACTER_MAP['듬직행'];

  if (isLoadingPersonality || isFetching)
    return (
      <div className="flex h-[360px] w-full items-center justify-center">
        <Loader size={20} />
      </div>
    );

  return (
    <div className="md:px-auto flex w-full flex-col gap-[16px] px-[20px] py-[48px] md:w-[1200px]">
      <span className="heading-sm-semibold md:heading-1xl-semibold">
        {name}님이 북마크한 공고들을 분석했어요!
      </span>
      <div
        className={`bg-base-primary-alternative flex w-full flex-col gap-[24px] rounded-[16px] p-[12px] md:h-[360px] md:flex-row md:gap-[0px] md:p-[0px] ${isError ? 'md:justify-between' : ''}`}
      >
        {isError || !loggedIn ? (
          <>
            <div className="flex flex-col justify-between gap-[8px] p-[8px] md:gap-[80px] md:p-[40px]">
              <div className="flex flex-col">
                <span className="text-contents-primary-accent body-lg-semibold md:body-xl-semibold">
                  북마크 수가 부족해요
                </span>
                <span className="text-contents-neutral-primary heading-2xl-semibold md:title-sm-semibold">
                  공고 3개 북마크하면
                  <br />
                  나의 취업유형을 찾아줘요
                </span>
              </div>
              <span className="body-md-medium md:body-lg-regular text-contents-neutral-tertiary">
                공고를 3개 이상 북마크하면 취업 유형을 찾아드릴게요.
                <br />
                취업유형을 바탕으로 나와 맞는 공고를 추천받을 수 있어요
              </span>
            </div>
            <Image
              className="w-full object-contain md:mr-[32px] md:w-[360px]"
              src="/images/characters/zighang_character_1.png"
              alt="zighang character"
              width={360}
              height={360}
            />
          </>
        ) : (
          <>
            <Image
              className="w-full object-contain md:mr-[32px] md:w-[360px]"
              src={characterInfo.img}
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
                  {personality?.data.characterName ?? '...'}
                </span>
              </div>
              <span className="body-md-medium md:body-xl-regular text-contents-neutral-tertiary">
                {characterInfo.desc}
              </span>
            </div>
            <div className="flex w-full flex-col justify-between gap-[12px] rounded-[12px] bg-white px-[20px] py-[20px] md:m-[32px] md:w-[400px] md:px-[24px]">
              <AnalyzeBar
                label="기업 규모"
                leftLabel="스타트업"
                rightLabel="대기업"
                leftValue={personality?.data.companyValue.startUpValue ?? 0}
                rightValue={personality?.data.companyValue.majorValue ?? 0}
              />
              <AnalyzeBar
                label="근무 형태"
                leftLabel="오피스"
                rightLabel="원격/탄력"
                leftValue={personality?.data.workTypeValue.officeValue ?? 0}
                rightValue={personality?.data.workTypeValue.remoteValue ?? 0}
              />
              <AnalyzeBar
                label="가치 추구"
                leftLabel="개인 성장"
                rightLabel="연봉/복지"
                leftValue={
                  personality?.data.pursuitOfValue.personalGrowthValue ?? 0
                }
                rightValue={
                  personality?.data.pursuitOfValue.welfareFeeValue ?? 0
                }
              />
            </div>
          </>
        )}
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
