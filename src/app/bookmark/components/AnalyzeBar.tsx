import React from 'react';

interface AnalyzeBarProps {
  label: string;
  leftLabel: string;
  rightLabel: string;
  leftValue: number;
  rightValue: number;
}

const AnalyzeBar = ({
  label,
  leftLabel,
  rightLabel,
  leftValue,
  rightValue,
}: AnalyzeBarProps) => {
  const isLeftAccent = leftValue >= rightValue;
  const accentValue = isLeftAccent ? leftValue : rightValue;
  const accentLabel = isLeftAccent ? leftLabel : rightLabel;
  const percent = accentValue;

  return (
    <div>
      <div className="mb-[8px] flex items-center">
        <span className="body-lg-semibold text-contents-neutral-tertiary">
          {label}
        </span>
        <div className="bg-base-neutral-border mx-[8px] h-[8px] w-px" />
        <div className="flex gap-[4px]">
          <span className="body-lg-semibold text-contents-primary-accent">
            {percent}%
          </span>
          <span className="body-lg-bold text-contents-neutral-secondary">
            {accentLabel}
          </span>
        </div>
      </div>
      <div
        className={`bg-base-neutral-alternative flex h-[22px] w-full ${isLeftAccent ? '' : 'justify-end'} rounded-[50px] shadow-inner`}
      >
        <div
          className={`h-full rounded-[50px] ${
            isLeftAccent ? 'bg-gradient-to-r' : 'bg-gradient-to-l'
          } from-[#9E80FF60] to-[#7A52FF]`}
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="mt-[4px] flex justify-between">
        <span className="caption-sm-medium text-contents-state-unselected">
          {leftLabel}
        </span>
        <span className="caption-sm-medium text-contents-state-unselected">
          {rightLabel}
        </span>
      </div>
    </div>
  );
};

export default AnalyzeBar;
