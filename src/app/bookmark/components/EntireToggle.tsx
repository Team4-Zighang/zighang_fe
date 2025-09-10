import { Toggle } from '@/app/_components/common/Toggle';
import React, { useState } from 'react';

const EntireToggle = () => {
  const [showClosed, setShowClosed] = useState(false);

  return (
    <div className="flex flex-col gap-[4px] md:flex-row md:items-center md:gap-0">
      <div className="flex">
        <span className="body-2xl-semibold text-contents-neutral-primary">
          총 00건
        </span>
        <div className="bg-base-neutral-border mx-[12px] h-[16px] w-px self-center" />
      </div>
      <Toggle
        checked={showClosed}
        onChange={setShowClosed}
        label="마감된 공고도 보기"
      />
    </div>
  );
};

export default EntireToggle;
