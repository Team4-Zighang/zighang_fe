'use client';

import React, { useEffect, useState } from 'react';
import ReactSlider from 'react-slider';

const LABELS = [
  '신입',
  '1년차',
  '2년차',
  '3년차',
  '4년차',
  '5년차',
  '6년차',
  '7년차',
  '8년차',
  '9년차',
  '10년차+',
] as const;

type Props = {
  minValue: number; // 0~10 정수
  maxValue: number; // 0~10 정수
  onCommit: (min: number, max: number) => void; // 드래그/클릭 종료 시 정수 반영
};

export default function CareerSlider({ minValue, maxValue, onCommit }: Props) {
  const [live, setLive] = useState<[number, number]>([minValue, maxValue]);

  useEffect(() => {
    setLive([minValue, maxValue]);
  }, [minValue, maxValue]);

  return (
    <div className="h-[20px] w-full select-none">
      <div className="relative">
        <ReactSlider
          pearling={false}
          minDistance={0}
          className="absolute inset-0 flex h-[20px] items-center"
          min={0}
          max={10}
          step={0.01}
          value={live}
          onChange={(vals: number[]) => setLive([vals[0], vals[1]])}
          onAfterChange={(vals: number[]) => {
            const snapped: [number, number] = [
              Math.round(vals[0]),
              Math.round(vals[1]),
            ];
            onCommit(snapped[0], snapped[1]);
          }}
          renderTrack={(props, state) => {
            const { key, ...rest } =
              props as React.HTMLAttributes<HTMLDivElement> & {
                key?: React.Key;
              };
            const isSelected = state.index === 1;
            return (
              <div
                key={key}
                {...rest}
                className={`absolute top-1/2 h-[4px] -translate-y-1/2 rounded-full ${
                  isSelected
                    ? 'bg-contents-primary-accent'
                    : 'bg-base-neutral-border'
                }`}
                style={{
                  ...(rest.style || {}),
                }}
              />
            );
          }}
          renderThumb={(props, state) => {
            const { key, style, ...rest } =
              props as React.HTMLAttributes<HTMLDivElement> & {
                key?: React.Key;
              };
            const top = `calc(50%)`;
            const snap = Math.round(state.valueNow);

            return (
              <div
                key={key}
                {...rest}
                style={{
                  ...(style || {}),
                  top,
                  transform: 'translate(-0%, -50%)',
                }}
                aria-label={state.index === 0 ? '최소 경력' : '최대 경력'}
                className="bg-contents-primary-accent relative z-10 h-[20px] w-[20px] cursor-grab rounded-full border-[2px] border-white shadow-sm outline-none active:cursor-grabbing"
              >
                <span
                  className="body-sm-medium text-contents-neutral-tertiary absolute top-[28px] left-1/2 whitespace-nowrap"
                  style={{
                    transform:
                      snap === 0
                        ? 'translateX(0)'
                        : snap === 10
                          ? 'translateX(-100%)'
                          : 'translateX(-50%)',
                  }}
                >
                  {LABELS[snap as 0 | 10]}
                </span>
              </div>
            );
          }}
        />
      </div>
    </div>
  );
}
