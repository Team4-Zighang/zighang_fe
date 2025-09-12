'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const JobExitTab = ({ onBookmarked }: { onBookmarked: () => void }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const [originalUrl, setOriginalUrl] = useState('/');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setOriginalUrl(localStorage.getItem('recruitmentOriginalUrl') || '/');
    }
  }, []);

  const onBookmarkClick = () => {
    if (!isBookmarked) {
      onBookmarked();
    }
    setIsBookmarked(!isBookmarked);
  };
  return (
    <>
      <div className="flex gap-[8px]">
        <button
          onClick={onBookmarkClick}
          className={`${isBookmarked ? 'bg-base-primary-alternative border-none' : 'bg-base-neutral-alternative border-base-neutral-border'} h-[48px] w-[48px] rounded-[8px] border-[1px]`}
        >
          <Image
            src={
              isBookmarked
                ? '/icons/bookmark_selected.svg'
                : '/icons/bookmark_unselected.svg'
            }
            alt="bookmark"
            width={28}
            height={28}
            className="m-auto"
          />
        </button>
        <button className="web-action bg-base-primary-alternative text-contents-primary-accent flex flex-1 items-center justify-center rounded-[8px]">
          공유하기
        </button>
        <Link
          href={originalUrl}
          className="web-action bg-base-primary-default flex flex-1 items-center justify-center rounded-[8px] text-white"
        >
          지원하기
        </Link>
      </div>
      {/* 폰트 디자인 적용 */}
      <div className="bg-base-neutral-alternative flex h-[48px] items-center justify-center rounded-[8px]">
        <div className="text-contents-neutral-secondary web-badge-lg flex flex-1 justify-center">
          <span className="">내 이력서의&nbsp;</span>
          <span className="text-contents-primary-default">기아자동차</span>
          <span className="">&nbsp;서류합격률은?</span>
        </div>
        <div className="border-base-neutral-border h-[24px] border-[1px]"></div>
        <Image
          src="/icons/partner.svg"
          alt="partner"
          width={137}
          height={44}
          className=""
        />
      </div>
    </>
  );
};

export default JobExitTab;
