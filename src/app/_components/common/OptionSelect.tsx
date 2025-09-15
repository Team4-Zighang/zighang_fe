'use client';
import React, { useState } from 'react';

type OptionSelectProps = {
  options: string[];
  onChange?: (selected: string[]) => void;
};

export const regions = [
  '전체',
  '서울',
  '경기',
  '인천',
  '부산',
  '대구',
  '광주',
  '대전',
  '울산',
  '세종',
  '강원',
  '경남',
  '경북',
  '전남',
  '전북',
  '충남',
  '충북',
  '제주',
];

export const jobs = [
  '전체',
  '마케팅 기획·전략',
  '퍼포먼스 마케팅',
  '콘텐츠마케팅',
  'SNS마케팅',
  '브랜드 마케팅',
  'CRM마케팅',
  '글로벌 마케팅',
  '광고기획(AE)',
  '홍보·PR',
  '전시·행사 마케팅',
  '기타 마케팅',
];

const OptionSelect = ({ options, onChange }: OptionSelectProps) => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleOption = (option: string) => {
    let newSelected: string[];

    if (option === '전체') {
      if (selected.includes('전체')) {
        newSelected = [];
      } else {
        newSelected = [...options];
      }
    } else {
      if (selected.includes(option)) {
        newSelected = selected.filter((o) => o !== option && o !== '전체');
      } else {
        newSelected = [...selected.filter((o) => o !== '전체'), option];

        if (newSelected.length === options.length - 1) {
          newSelected = [...options];
        }
      }
    }

    setSelected(newSelected);
    onChange?.(newSelected);
  };

  return (
    <div className="flex w-full flex-wrap items-center gap-[6px]">
      {options.map((option) => {
        const isActive = selected.includes(option);
        return (
          <button
            key={option}
            onClick={() => toggleOption(option)}
            className={`cursor-pointer rounded-[12px] px-4 py-[10px] text-center transition ${
              isActive
                ? 'border-base-primary-border body-sm-semibold bg-base-primary-alternative border text-[#7951FF]'
                : 'border-base-neutral-border body-sm-medium bg-base-neutral-default text-contents-neutral-tertiary border'
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
};

export default OptionSelect;
