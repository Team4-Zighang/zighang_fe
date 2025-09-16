'use client';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { useCardTimer } from '@/hooks/useCardTimer';
import {
  useCardMutation,
  useCardReplaceMutation,
  useCardShowMutation,
} from '@/hooks/mutation/useCardMutation';
import CardBack from './CardBack';
import TimeCard, { CardProps } from './TimeCard';
import ScrapBubble from './ScrapBubble';
import { useCardOpen, useScrap } from '@/hooks/queries/useCard';
import { getToken } from '@/store/member';
import { useRouter } from 'next/navigation';

const frontImgs = [
  '/images/zighang_card_1.png',
  '/images/zighang_card_2.png',
  '/images/zighang_card_3.png',
];
const positions = ['LEFT', 'CENTER', 'RIGHT'] as const;

const PostingLotto = () => {
  const cardShowMutation = useCardShowMutation();
  const cardMutation = useCardMutation();
  const cardReplaceMutation = useCardReplaceMutation();
  const { data: openedCards } = useCardOpen();
  const { data: scrapcard } = useScrap();
  const router = useRouter();
  const token = getToken();

  const [scrapBubble, setScrapBubble] = useState(false);
  const iconWrapRef = useRef<HTMLDivElement>(null);

  const scrapCount = scrapcard?.scrapCount ?? 0;
  const isScrapInsufficient = scrapCount < 3;

  const [cards, setCards] = useState<CardProps[]>(
    frontImgs.map((img, idx) => ({
      id: String(idx + 1),
      frontImg: img,
    }))
  );

  const {
    remainTime,
    isBack,
    isLocked,
    toggle,
    formatHMS,
    openSync,
    syncBackState,
  } = useCardTimer(3, 900, (idx) => {
    const position = positions[idx];
    cardReplaceMutation.mutate({ position });
  });

  const lastSigRef = useRef<string>('');

  useEffect(() => {
    const alreadyVisited = sessionStorage.getItem('cardVisited');
    if (!alreadyVisited) {
      cardMutation.mutate();
      sessionStorage.setItem('cardVisited', 'true');
    }
  }, [cardMutation]);

  useEffect(() => {
    if (!openedCards || openedCards.length === 0) return;

    const sig = openedCards
      .map(
        (oc) =>
          `${oc.position}:${oc.cardJobPosting.jobPostingId}:${oc.cardOpenTime}`
      )
      .sort()
      .join('|');

    if (sig === lastSigRef.current) return;
    lastSigRef.current = sig;

    const backStates = [false, false, false];

    setCards((prev) => {
      const newCards = [...prev];
      openedCards.forEach((oc) => {
        const pos = oc.position as 'LEFT' | 'CENTER' | 'RIGHT';
        const idx = positions.indexOf(pos);
        if (idx === -1) return;

        newCards[idx] = {
          ...newCards[idx],
          back: (
            <CardBack
              index={idx}
              jobPostingId={oc.cardJobPosting.jobPostingId}
              companyImageUrl={
                oc.cardJobPosting.companyImageUrl ?? '/images/sampleimage.png'
              }
              bank={oc.cardJobPosting.companyName ?? ''}
              title={oc.cardJobPosting.title ?? ''}
              career={oc.cardJobPosting.career}
              recruitmentType={oc.cardJobPosting.recruitmentType}
              academicConditions={oc.cardJobPosting.academicConditions}
              address={oc.cardJobPosting.address}
              isScrap={oc.cardJobPosting.isScrap}
              scrapId={null}
            />
          ),
        };

        backStates[idx] = true;
        openSync(idx, oc.cardOpenTime);
      });
      return newCards;
    });

    syncBackState(backStates);
  }, [openedCards, openSync, syncBackState]);

  //카드 클릭했을때
  const handleFlip = (i: number) => {
    if (!token) {
      router.push('/onboarding');
      return;
    }

    const alreadyOpened = openedCards?.some(
      (oc) => oc?.position === positions[i]
    );
    if (alreadyOpened) return;
    if (isLocked(i)) return;

    const position = positions[i];
    cardShowMutation.mutate(
      { position },
      {
        onSuccess: (res) => {
          const job = res.data?.cardJobPosting ?? res.data.cardJobPosting;
          setCards((prev) =>
            prev.map((card, idx) =>
              idx === i
                ? {
                    ...card,
                    back: (
                      <CardBack
                        jobPostingId={job.jobPostingId}
                        scrapId={null}
                        index={idx}
                        companyImageUrl={
                          job.companyImageUrl ?? '/images/sampleimage.png'
                        }
                        bank={job.companyName}
                        title={job.title}
                        career={job.career}
                        recruitmentType={job.recruitmentType}
                        academicConditions={job.academicConditions}
                        address={job.address}
                        isScrap={job.isScrap}
                      />
                    ),
                  }
                : card
            )
          );
          toggle(i);
        },
      }
    );
  };

  // 새로 뽑기
  const handleRefresh = () => {
    cardMutation.mutate(undefined, {
      onSuccess: () => {
        setCards(
          frontImgs.map((img, idx) => ({
            id: String(idx + 1),
            frontImg: img,
          }))
        );
        syncBackState([false, false, false]);
      },
    });
  };

  useEffect(() => {
    if (!scrapBubble) return;
    const onDown = (e: MouseEvent) => {
      if (!iconWrapRef.current) return;
      if (!iconWrapRef.current.contains(e.target as Node))
        setScrapBubble(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [scrapBubble]);

  return (
    <div className="mt-12 flex w-full flex-col items-start">
      <div className="flex w-full flex-row items-start justify-between gap-3 px-4 sm:flex-row">
        <div className="heading-md-semibold text-contents-neutral-primary">
          나만의 공고 뽑기
        </div>
        <div className="flex flex-row items-center">
          <button
            className="flex items-center gap-1 py-2 pr-4 pl-3 disabled:cursor-not-allowed"
            type="button"
            onClick={handleRefresh}
            disabled={cardMutation.isPending || isScrapInsufficient}
          >
            <Image
              src="/icons/refresh.svg"
              alt="refreshIcon"
              width={20}
              height={20}
            />

            <span
              className={`body-lg-medium ${
                cardMutation.isPending
                  ? 'text-contents-primary-default'
                  : isScrapInsufficient
                    ? 'text-contents-neutral-tertiary'
                    : 'text-contents-primary-default'
              }`}
            >
              {cardMutation.isPending ? '뽑는 중' : '새로 뽑기'}
            </span>
          </button>
          <div ref={iconWrapRef} className="relative">
            <Image
              src="/icons/question_mark.svg"
              alt="questionIcon"
              width={20}
              height={20}
              className="cursor-pointer"
              onClick={() => setScrapBubble((v) => !v)}
            />
            {scrapBubble && (
              <ScrapBubble onClose={() => setScrapBubble(false)} />
            )}
          </div>
        </div>
      </div>

      {/* 모바일 */}
      <div className="mt-4 w-full lg:hidden">
        <div
          className="no-scrollbar flex gap-3 overflow-x-auto px-4"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {cards.map((card, id) => (
            <div
              key={card.id}
              className="flex w-[260px] shrink-0 flex-col items-center sm:w-[280px]"
            >
              <TimeCard
                card={card}
                index={id}
                widthClass="w-full"
                isBack={isBack}
                isLocked={isLocked}
                remainTime={remainTime}
                toggle={handleFlip}
                formatHMS={formatHMS}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 데스크탑 */}
      <div className="mt-4 hidden w-full grid-cols-3 gap-4 lg:grid">
        {cards.map((card, id) => (
          <TimeCard
            key={card.id}
            card={card}
            index={id}
            widthClass="w-[289px]"
            isBack={isBack}
            isLocked={isLocked}
            remainTime={remainTime}
            toggle={handleFlip}
            formatHMS={formatHMS}
          />
        ))}
      </div>
    </div>
  );
};

export default PostingLotto;
