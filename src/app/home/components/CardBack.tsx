'use client';
import Image from 'next/image';
import React from 'react';

type CardBackProps = {
  index: number;
  jobPostingId: number;
  companyImageUrl: string | null;
  bank: string;
  title: string;
  career: string;
  recruitmentType: string;
  academicConditions: string;
  address: string;
  isScrap: boolean;
};

const CardBack = ({
  index,
  bank,
  title,
  companyImageUrl,
  career,
  recruitmentType,
  academicConditions,
  address,
  isScrap,
}: CardBackProps) => {
  const ImageUrl =
    !companyImageUrl ||
    companyImageUrl.trim() === '' ||
    companyImageUrl.toLowerCase().includes('null')
      ? '/images/sampleimage.png'
      : companyImageUrl;

  return (
    <div className="flex flex-col items-start">
      <div className="flex w-full flex-row items-start justify-between">
        <Image
          src={ImageUrl}
          alt="companyImageUrl"
          width={64}
          height={64}
          className="border-base-neutral-border h-16 w-16 rounded-[8px] border"
        />

        <Image
          src={
            isScrap
              ? '/icons/bookmark_selected.svg'
              : '/icons/bookmark_unselected.svg'
          }
          alt="북마크"
          width={24}
          height={24}
        />
      </div>

      <div className="flex flex-col items-start">
        <div className="body-md-medium text-contents-neutral-tertiary mt-2">
          {bank}
        </div>
        <div className="heading-sm-semibold text-contents-neutral-primary max-w-[241px] text-start text-ellipsis">
          {title}
        </div>

        <div className="text-contents-primary-accent body-md-semibold mt-2">
          {index === 0 && '희귀 공고 선착순 발견'}
          {index === 1 && '아직 지원한 사람이 적은 공고'}
          {index === 2 && '초기 지원자가 되세요'}
        </div>

        <div className="mt-[45px] flex flex-col items-start gap-2">
          <div className="flex w-full flex-row items-center gap-1">
            <Image
              src="/icons/article.svg"
              alt="career"
              width={20}
              height={20}
              className="aspect-[1/1]"
            />
            <div className="text-contents-neutral-secondary body-sm-medium">
              {career}
            </div>
          </div>
          <div className="flex flex-row items-center gap-1">
            <Image
              src="/icons/work.svg"
              alt="recruitmentType"
              width={20}
              height={20}
              className="aspect-[1/1]"
            />
            <div className="text-contents-neutral-secondary body-sm-medium">
              {recruitmentType}
            </div>
          </div>

          <div className="flex flex-row items-center gap-1">
            <Image
              src="/icons/school.svg"
              alt="academicConditions"
              width={20}
              height={20}
              className="aspect-[1/1]"
            />
            <div className="text-contents-neutral-secondary body-sm-medium">
              {academicConditions}
            </div>
          </div>

          <div className="flex flex-row items-center gap-1">
            <Image
              src="/icons/location.svg"
              alt="address"
              width={20}
              height={20}
              className="aspect-[1/1]"
            />
            <div className="text-contents-neutral-secondary body-sm-medium max-w-[217px] truncate">
              {address}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardBack;
