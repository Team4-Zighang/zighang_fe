import { GetPersonalityAnalysis } from '@/app/_apis/bookmark';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import AnalyzeBar from './AnalyzeBar';
import { PersonalityResponse } from '@/app/_apis/schemas/bookmarkResponse';

const CHARACTER_MAP: Record<string, { img: string; desc: string }> = {
  듬직행: {
    img: '/images/characters/zighang_character_1.png',
    desc: '대기업 정규직에서 안정적인 연봉과 복지를 중시하며, 출근이든 원격이든 든든하게 일할 수 있는 환경을 선호하시네요. 신뢰감이 느껴지는 듬직행이에요!',
  },
  실속행: {
    img: '/images/characters/zighang_character_2.png',
    desc: '대기업이든 스타트업이든, 연봉과 복지를 꼼꼼히 따지며 계약직의 실속을 챙기시네요. 현실 감각이 돋보이는 실속행이에요!',
  },
  성실행: {
    img: '/images/characters/zighang_character_3.png',
    desc: '안정적인 정규직을 바탕으로, 출근과 원격 근무를 통해 다양한 경험과 성장을 추구하시네요. 차근차근 발전해 나가는 성실행이에요!',
  },
  단짠행: {
    img: '/images/characters/zighang_character_4.png',
    desc: '대기업에 계약직으로 합류해, 안정 속에서도 새로운 경험과 배움을 찾아가시네요. 달콤쌉쌀한 도전을 즐기는 단짠행이에요!',
  },
  모험행: {
    img: '/images/characters/zighang_character_5.png',
    desc: '대기업의 안정된 환경에서 원격으로 일하며, 연봉과 복지보다 다양한 경험을 우선시하시네요. 정규직보다는 새로운 도전을 즐기는 모험행이에요!',
  },
  찐동행: {
    img: '/images/characters/zighang_character_6.png',
    desc: '스타트업에서 정규직으로 출근하며, 연봉과 복지를 챙기면서도 함께 성장하는 길을 선택하셨네요. 진득하게 동행하는 찐동행이에요!',
  },
  도전행: {
    img: '/images/characters/zighang_character_7.png',
    desc: '스타트업에서 출근하며 계약직으로 다양한 경험과 배움을 쌓는 길을 선택하셨네요. 새로운 기회를 향해 과감히 나아가는 도전행이에요!',
  },
  자유행: {
    img: '/images/characters/zighang_character_8.png',
    desc: '스타트업의 유연한 원격 근무를 통해 연봉·복지와 배움을 균형 있게 선택해가시네요. 자유로운 발걸음이 매력적인 자유행이에요!',
  },
};

const AnalyzeCard = () => {
  const [personality, setPersonality] = useState<PersonalityResponse>();
  const [isNotFound, setIsNotFound] = useState(false);

  const characterInfo =
    personality?.characterName && CHARACTER_MAP[personality.characterName]
      ? CHARACTER_MAP[personality.characterName]
      : CHARACTER_MAP['듬직행'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await GetPersonalityAnalysis();
        if (res && res.success) {
          setPersonality(res.data);
          setIsNotFound(false);
        }
        console.log('Personality Analysis Data:', res.data);
      } catch (error) {
        setIsNotFound(true);
        console.error('Error fetching personality analysis:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="md:px-auto flex w-full flex-col gap-[16px] px-[20px] py-[48px] md:w-[1200px]">
      <span className="heading-sm-semibold md:heading-1xl-semibold">
        지우님이 북마크한 공고들을 분석했어요!
      </span>
      <div className="bg-base-primary-alternative flex w-full flex-col gap-[24px] rounded-[16px] p-[12px] md:h-[360px] md:flex-row md:gap-[0px] md:p-[0px]">
        {isNotFound ? (
          <div className="">분석중입니다...</div>
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
                  {personality?.characterName ?? '...'}
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
                leftValue={personality?.companyValue.startUpValue ?? 0}
                rightValue={personality?.companyValue.majorValue ?? 0}
              />
              <AnalyzeBar
                label="근무 형태"
                leftLabel="오피스"
                rightLabel="원격/탄력"
                leftValue={personality?.workTypeValue.officeValue ?? 0}
                rightValue={personality?.workTypeValue.remoteValue ?? 0}
              />
              <AnalyzeBar
                label="가치 추구"
                leftLabel="개인 성장"
                rightLabel="연봉/복지"
                leftValue={personality?.pursuitOfValue.personalGrowthValue ?? 0}
                rightValue={personality?.pursuitOfValue.welfareFeeValue ?? 0}
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
