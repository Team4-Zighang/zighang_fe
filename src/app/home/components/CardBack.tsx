'use client';
import React from 'react';

type CardBackProps = { bank: string; title: string };

const CardBack = ({ bank, title }: CardBackProps) => {
  return (
    <div className="flex flex-col items-start">
      <div className="border-base-neutral-border h-16 w-16 rounded-[8px] border" />
      <div className="body-md-medium text-contents-neutral-tertiary mt-2">
        {bank}
      </div>
      <div className="heading-sm-semibold text-contents-neutral-primary text-start">
        {title}
      </div>
    </div>
  );
};

export default CardBack;
