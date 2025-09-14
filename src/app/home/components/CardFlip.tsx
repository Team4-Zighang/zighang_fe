'use client';
import Image from 'next/image';
import React from 'react';

type CardFlipProps = {
  img: string;
  back: React.ReactNode;
  backShown: boolean;
  locked: boolean;
  onToggle: () => void;
};

const CardFlip = ({
  img,
  back,
  backShown,
  locked,
  onToggle,
}: CardFlipProps) => {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => {
        if (!locked) onToggle();
      }}
      aria-pressed={backShown}
      className="relative h-[386px] w-full gap-4 overflow-hidden rounded-3xl"
    >
      <div
        className="relative h-full w-full transition-transform duration-500"
        style={{
          transformStyle: 'preserve-3d',
          transform: backShown ? 'rotateY(180deg)' : 'none',
        }}
      >
        <div
          className="absolute inset-0 overflow-hidden rounded-3xl"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <Image
            src={img}
            alt="card"
            fill
            className="cursor-pointer object-cover"
            sizes="280px"
            priority
          />
        </div>

        <div
          className="border-base-neutral-border bg-base-neutral-default absolute inset-0 flex items-start rounded-3xl border p-6 shadow-[0_4px_30px_0_rgba(0,0,0,0.03)]"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          {back}
        </div>
      </div>
    </div>
  );
};

export default React.memo(CardFlip);
