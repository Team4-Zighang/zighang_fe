'use client';

import React from 'react';

type LoaderProps = {
  size?: number | string;
  color?: string;
  durationMs?: number;
  className?: string;
};

function toCssSize(v: number | string | undefined, fallback: string) {
  if (v === undefined) return fallback;
  return typeof v === 'number' ? `${v}px` : v;
}

export default function Loader({
  size = 50,
  color = '#333',
  durationMs = 1000,
  className,
}: LoaderProps) {
  const styleVars = {
    ['--size' as any]: toCssSize(size, '50px'),
    ['--color' as any]: color,
    ['--duration' as any]: `${durationMs}ms`,
  };

  return (
    <div
      role="status"
      className={`loader ${className ?? ''}`}
      style={styleVars as React.CSSProperties}
    >
      <style jsx>{`
        .loader {
          width: var(--size);
          height: var(--size);
          border-radius: 50%;
          display: inline-block;
          position: relative;
          vertical-align: middle;
          animation: loader-1 var(--duration) infinite linear;
        }

        .loader::before,
        .loader::after {
          content: '';
          position: absolute;
          width: 80%;
          height: 80%;
          top: 5%;
          background-color: var(--color);
          border-radius: 50%;
        }
        .loader::before {
          left: -5%;
          transform-origin: 10% 50%;
          animation: loader-2 var(--duration) infinite alternate ease-in-out;
        }
        .loader::after {
          right: -5%;
          transform-origin: 90% 50%;
          transform: scale(0);
          animation: loader-2 var(--duration) var(--duration) infinite alternate
            ease-in-out;
        }

        @keyframes loader-1 {
          0% {
            transform: rotate(20deg);
          }
          100% {
            transform: rotate(380deg);
          }
        }

        @keyframes loader-2 {
          0% {
            transform: scale(0);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
