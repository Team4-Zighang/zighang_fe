'use client';

import LoginModal from '@/app/_components/common/LoginModal';
import {
  useDeleteBookmark,
  usePostBookmark,
} from '@/hooks/mutation/useBookmarkMutation';
import { useRecruitmentDetail } from '@/hooks/queries/useRecruitment';
import { isLoggedIn } from '@/utils/getUser';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

const JobExitTab = ({ onBookmarked }: { onBookmarked: () => void }) => {
  const { id } = useParams();
  const { data, isLoading, isFetching } = useRecruitmentDetail({
    id: Number(id),
  });

  const job = data?.data;
  const [isBookmarked, setIsBookmarked] = useState(job?.isSaved ?? false);

  useEffect(() => {
    setIsBookmarked(job?.isSaved ?? false);
  }, [job?.isSaved]);

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
                onBookmarked?.();
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

  return (
    <>
      <div className="flex gap-[8px]">
        <button
          onClick={onBookmarkClick}
          disabled={bookmarkLoading || isPostPending || isDeletePending}
          className={` ${bookmarkLoading || isPostPending || isDeletePending ? 'pointer-events-none cursor-not-allowed opacity-70' : 'cursor-pointer'} ${isBookmarked ? 'bg-base-primary-alternative border-none' : 'bg-base-neutral-alternative border-base-neutral-border'} flex h-[48px] w-[48px] items-center justify-center rounded-[8px] border-[1px] disabled:cursor-not-allowed`}
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
        <button className="web-action bg-base-primary-alternative text-contents-primary-accent flex flex-1 items-center justify-center rounded-[8px]">
          공유하기
        </button>
        <Link
          href={job?.recruitmentOriginalUrl || '/'}
          className="web-action bg-base-primary-default flex flex-1 items-center justify-center rounded-[8px] text-white"
        >
          지원하기
        </Link>
      </div>
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
      {modal && <LoginModal onClose={() => setModal(false)} />}
    </>
  );
};

export default JobExitTab;
