import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

const labels = [
  '마감 임박 순',
  '마감 여유 순',
  '최신 등록 순',
  '오래된 등록 순',
  '조회수 높은 순',
  '조회수 낮은 순',
];

const ArrayButton = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState(labels[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 시 닫기
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex cursor-pointer items-center"
        onClick={() => setDropdownOpen((v) => !v)}
      >
        <div className="text-contents-neutral-tertiary body-md-medium md:web-summary">
          {selectedLabel}
        </div>
        <Image src="/icons/arrow_under.svg" width={20} height={20} alt="" />
      </button>
      {dropdownOpen && (
        <div className="absolute top-[12px] right-0 z-10 mt-[8px] w-[128px] rounded-[12px] bg-white py-[4px] shadow-lg md:w-[160px]">
          {labels.map((label) => (
            <div
              key={label}
              className="body-sm-medium md:body-lg-medium text-contents-neutral-primary r hover:bg-base-neutral-alternative flex h-[44px] w-full cursor-pointer items-center justify-start px-[16px]"
              onClick={() => {
                setDropdownOpen(false);
                setSelectedLabel(label);
              }}
            >
              {label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArrayButton;
