'use client';
import { useState } from 'react';

const YearSlider = () => {
  const [value, setValue] = useState(0);

  const percent = (value / 10) * 100;

  return (
    <div className="relative w-full">
      <input
        type="range"
        min="0"
        max="10"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="bg-base-neutral-border [&::-moz-range-thumb]:border-base-neutral-border [&::-moz-range-thumb]:bg-contents-primary-accent [&::-webkit-slider-thumb]:border-base-neutral-border [&::-webkit-slider-thumb]:bg-contents-primary-accent h-1 w-full appearance-none rounded-full [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2"
        style={{
          background: `linear-gradient(to right, #7a52ff ${percent}%, #E2E6EB ${percent}%)`,
        }}
      />

      <div
        className="body-sm-medium text-contents-neutral-tertiary absolute top-6 truncate text-center"
        style={{
          left: `${percent}%`,
          transform:
            value === 0
              ? 'translateX(0%)'
              : value === 10
                ? 'translateX(-100%)'
                : 'translateX(-50%)',
        }}
      >
        {value === 0 ? '신입' : `${value}년차`}
      </div>
    </div>
  );
};

export default YearSlider;
