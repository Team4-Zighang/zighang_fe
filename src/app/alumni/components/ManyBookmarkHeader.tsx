'use client';
import { getMember } from '@/store/member';
import React from 'react';

const ManyBookmarkHeader = () => {
  const memberData = getMember();
  return (
    <div className="text-contents-neutral-primary web-title2 md:heading-1xl-semibold">
      {memberData?.member?.memberName}님의 동문들이
      <span className="block md:inline">
        {' '}
        가장 많이 북마크한 공고를 살펴보세요!
      </span>
    </div>
  );
};

export default ManyBookmarkHeader;
