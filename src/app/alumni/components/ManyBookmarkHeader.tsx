'use client';
import { getMember, getToken } from '@/store/member';
import React from 'react';

const ManyBookmarkHeader = () => {
  const memberData = getMember();
  const token = getToken();

  return (
    <div className="text-contents-neutral-primary web-title2 md:heading-1xl-semibold">
      {token && memberData?.member?.memberName ? (
        <>
          {memberData.member.memberName}님의 동문들이
          <span className="block md:inline">
            {' '}
            가장 많이 북마크한 공고를 살펴보세요!
          </span>
        </>
      ) : (
        <div className="web-title2 md:heading-1xl-semibold text-black md:whitespace-nowrap">
          동문들이 가장 많이
          <span className="block md:inline"> 북마크한 공고를 살펴보세요!</span>
        </div>
      )}
    </div>
  );
};

export default ManyBookmarkHeader;
