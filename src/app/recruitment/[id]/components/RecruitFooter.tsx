'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import BookmarkMemo from './BookmarkMemo';
import Link from 'next/link';

const RecruitFooter = () => {
  const [isMemoOpen, setIsMemoOpen] = useState(false);
  const onMemoClick = () => {
    setIsMemoOpen(!isMemoOpen);
  };

  const [isBookmarked, setIsBookmarked] = useState(false);
  const onBookmarkClick = () => {
    setIsBookmarked(!isBookmarked);
  };

  const [originalUrl, setOriginalUrl] = useState('/');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setOriginalUrl(localStorage.getItem('recruitmentOriginalUrl') || '/');
    }
  }, []);

  return (
    <>
      <div className="border-base-neutral-border fixed bottom-0 left-0 z-10 box-border flex w-full items-center gap-[8px] border-t-[1px] bg-white px-[16px] py-[12px] shadow-[0_-2px_8px_rgba(0,0,0,0.1)] md:hidden">
        <button
          onClick={onMemoClick}
          className="flex h-[40px] w-[40px] items-center justify-center rounded-full active:bg-[#00000008]"
        >
          <Image src="/icons/note.svg" alt="note" width={28} height={28} />
        </button>
        <button
          onClick={onBookmarkClick}
          className="flex h-[40px] w-[40px] items-center justify-center rounded-full active:bg-[#00000008]"
        >
          <Image
            src={`${isBookmarked ? '/icons/bookmark_selected.svg' : '/icons/bookmark_unselected.svg'}`}
            alt="bookmark"
            width={28}
            height={28}
          />
        </button>
        <button className="flex h-[40px] w-[40px] items-center justify-center rounded-full active:bg-[#00000008]">
          <Image src="/icons/share.svg" alt="share" width={28} height={28} />
        </button>
        <Link
          href={originalUrl}
          className="bg-base-primary-default mobile-action flex h-[48px] flex-1 items-center justify-center rounded-[8px] text-white"
        >
          지원하기
        </Link>
      </div>
      {isMemoOpen && (
        <div
          className="fixed inset-0 z-20 flex items-center justify-center bg-black/40"
          onClick={() => setIsMemoOpen(false)}
        >
          <div className="w-full" onClick={(e) => e.stopPropagation()}>
            <BookmarkMemo />
          </div>
        </div>
      )}
    </>
  );
};

export default RecruitFooter;
