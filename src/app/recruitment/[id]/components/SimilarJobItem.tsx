import { RecruitmentItem } from '@/app/_apis/schemas/recruitmentResponse';
import Loader from '@/app/_components/common/Loader';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type SimilarJobItemProps = {
  item?: RecruitmentItem;
  isLoading?: boolean;
};

const SimilarJobItem = ({ item, isLoading }: SimilarJobItemProps) => {
  if (isLoading) {
    return (
      <div className="border-base-neutral-border flex h-[108px] cursor-pointer items-center justify-center rounded-[12px] border-[1px]">
        <Loader size={40} />
      </div>
    );
  }

  return (
    <Link
      href={`/recruitment/${item?.postingId}`}
      className="border-base-neutral-border flex cursor-pointer justify-between rounded-[12px] border-[1px] p-[16px]"
      onClick={() => window.scrollTo(0, 0)}
    >
      <div className="flex items-center gap-[16px]">
        <section className="border-base-neutral-border h-[64px] w-[64px] overflow-hidden rounded-[16px] border-[1px] bg-white object-cover">
          <Image
            src={item?.company.companyImageUrl || '/images/sampleimage.png'}
            width={64}
            height={64}
            alt="company_logo"
          />
        </section>
        <div className="flex flex-col gap-[8px]">
          <span className="body-lg-semibold text-contents-neutral-primary">
            {item?.title}
          </span>
          <span className="body-sm-medium text-contents-neutral-tertiary">
            {item?.company.companyName}
          </span>
          <div className="flex gap-[6px]">
            <span className="md:web-badge-sm mobile-badge-sm bg-base-neutral-alternative text-contents-neutral-tertiary flex items-center rounded-[8px] px-[8px] py-[4px]">
              {item?.depthTwo}
            </span>
            <span className="md:web-badge-sm mobile-badge-sm bg-base-neutral-alternative text-contents-neutral-tertiary flex items-center truncate rounded-[8px] px-[8px] py-[4px]">
              {item?.workType}
            </span>
            <span className="md:web-badge-sm mobile-badge-sm bg-base-neutral-alternative text-contents-neutral-tertiary flex items-center truncate rounded-[8px] px-[8px] py-[4px]">
              {item?.career}
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
    </Link>
  );
};

export default SimilarJobItem;
