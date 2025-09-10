'use client';
import Image from 'next/image';
import React, { useState } from 'react';

const BookmarkMemo = ({ onSaved }: { onSaved?: () => void }) => {
  const [memo, setMemo] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [isloggedin] = useState(false); // 나중에 로그인 여부로 바꾸기

  const onSaveClick = () => {
    if (!memo) return;
    setIsSaved(true);
    onSaved?.(); // 저장 시 부모에 알림 요청
  };

  return (
    <div className="relative flex w-full flex-col rounded-[12px] border-[1px] border-[#D2CB9B10] px-[8px] md:px-0">
      <div className="h-[16px] w-full rounded-t-[12px] bg-[#FEF9C8]"></div>
      <div className="flex h-[224px] w-full flex-col gap-[12px] rounded-b-[12px] bg-[#FFFCDD] px-[20px] py-[12px] md:h-full md:gap-[24px]">
        <textarea
          className="body-lg-medium h-[144px] outline-none placeholder:text-[#D6CD7C] md:h-[300px]"
          placeholder="작성한 메모는 북마크에 같이 저장돼요"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
        ></textarea>
        <button
          onClick={onSaveClick}
          disabled={!memo}
          className={`self-end rounded-[4px] px-[8px] py-[4px] text-[#5F5B3E] hover:bg-[#F7F0A8] ${
            memo
              ? 'cursor-pointer bg-[#EDE69E]'
              : 'cursor-not-allowed bg-[#FDF6AE] opacity-60'
          }`}
        >
          저장하기
        </button>
      </div>
      {isSaved && !isloggedin && (
        <div className="absolute top-[98%] right-[15%] z-10 flex w-[320px] translate-x-1/2 flex-col items-center">
          <Image
            src="/icons/polygon.svg"
            alt=""
            width={18}
            height={9}
            className="z-10"
          />
          <div className="flex w-full flex-col gap-[16px] rounded-[12px] bg-white px-[12px] py-[16px] shadow-[0_-8px_24px_rgba(0,0,0,0.12)]">
            <div className="flex flex-col items-center">
              <span className="body-lg-semibold">
                마음에 든다면 메모와 함께 저장하세요!
              </span>
              <span className="body-sm-medium text-contents-neutral-tertiary">
                북마크와 메모 기능으로 <br /> 언제든 다시 확인할 수 있어요
              </span>
            </div>
            <button className="body-sm-semibold bg-contents-primary-accent rounded-[8px] py-[12px] text-white">
              로그인하고 저장하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookmarkMemo;
