import { useState, useCallback } from 'react';

export const useCardTimer = (cardCount: number, duration: number) => {
  const [isBack, setIsBack] = useState<boolean[]>(Array(cardCount).fill(false));
  const [remainTime, setRemainTime] = useState<number[]>(
    Array(cardCount).fill(duration)
  );

  const toggle = useCallback((idx: number) => {
    setIsBack((prev) => prev.map((v, i) => (i === idx ? !v : v)));
  }, []);

  const isLocked = useCallback((idx: number) => isBack[idx], [isBack]);

  const syncBackState = useCallback((states: boolean[]) => {
    setIsBack(states);
  }, []);

  const openSync = useCallback((idx: number) => {
    setIsBack((prev) => prev.map((v, i) => (i === idx ? true : v)));
  }, []);

  const formatHMS = (sec: number) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  return {
    remainTime,
    isBack,
    isLocked,
    toggle,
    formatHMS,
    openSync,
    syncBackState,
  };
};
