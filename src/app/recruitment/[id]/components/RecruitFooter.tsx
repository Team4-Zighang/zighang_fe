'use client';

import Image from 'next/image';
import React, { useRef, useState } from 'react';
import BookmarkMemo from './BookmarkMemo';
import Link from 'next/link';
import { useRecruitmentDetail } from '@/hooks/queries/useRecruitment';
import { useParams } from 'next/dist/client/components/navigation';
import {
  useDeleteBookmark,
  usePostBookmark,
} from '@/hooks/mutation/useBookmarkMutation';
import { isLoggedIn } from '@/utils/getUser';
import LoginModal from '@/app/_components/common/LoginModal';

const RecruitFooter = () => {
  const { id } = useParams();
  const { data, isLoading, isFetching } = useRecruitmentDetail({
    id: Number(id),
  });

  const job = data?.data;
  const [isBookmarked, setIsBookmarked] = useState(job?.isSaved ?? false);

  const { mutate: deleteBookmark, isPending: isDeletePending } =
    useDeleteBookmark();
  const { mutate: postBookmark, isPending: isPostPending } = usePostBookmark();
  const [bookmarkLoading, setBookmarkLoading] = useState(false);

  const [modal, setModal] = useState(false);

  const clickingRef = useRef(false);
  const onBookmarkClick = async () => {
    if (!isLoggedIn()) {
      setModal(true);
      return;
    }

    if (
      clickingRef.current ||
      bookmarkLoading ||
      isPostPending ||
      isDeletePending
    )
      return;
    clickingRef.current = true;

    try {
      setBookmarkLoading(true);

      if (isBookmarked) {
        if (job?.scrapId !== null && job?.scrapId !== undefined) {
          await deleteBookmark([job.scrapId], {
            onSuccess: () => {
              setIsBookmarked(false);
              setBookmarkLoading(false);
            },
          });
        } else {
          setIsBookmarked(false);
          setBookmarkLoading(false);
        }
      } else {
        if (job?.postingId !== undefined) {
          await postBookmark(
            {
              jobPostingId: job.postingId,
            },
            {
              onSuccess: () => {
                setIsBookmarked(true);
                setBookmarkLoading(false);
              },
            }
          );
        } else {
          setIsBookmarked(true);
          setBookmarkLoading(false);
        }
      }
    } catch (error) {
      console.error('북마크 처리 중 오류 발생:', error);
    } finally {
      setBookmarkLoading(false);
      clickingRef.current = false; // ✅ 락 해제
    }
  };

  const [isMemoOpen, setIsMemoOpen] = useState(false);
  const onMemoClick = () => {
    setIsMemoOpen(!isMemoOpen);
  };

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
          onDoubleClick={(e) => e.preventDefault()}
          disabled={bookmarkLoading}
          className={`flex h-[40px] w-[40px] items-center justify-center rounded-full active:bg-[#00000008] ${bookmarkLoading ? 'cursor-not-allowed' : ''} ${isBookmarked ? 'border-none' : 'border-base-neutral-border'}`}
        >
          <Image
            src={
              isLoading || isFetching
                ? '/icons/bookmark_unselected.svg'
                : isBookmarked
                  ? '/icons/bookmark_selected.svg'
                  : '/icons/bookmark_unselected.svg'
            }
            alt="bookmark"
            width={28}
            height={28}
            className={`m-auto ${bookmarkLoading ? 'opacity-50' : ''}`}
          />
        </button>

        <button className="flex h-[40px] w-[40px] items-center justify-center rounded-full active:bg-[#00000008]">
          <Image src="/icons/share.svg" alt="share" width={28} height={28} />
        </button>
        <Link
          href={job?.recruitmentOriginalUrl || '/'}
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
