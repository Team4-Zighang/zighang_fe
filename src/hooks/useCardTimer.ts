import { useState, useCallback, useEffect, useRef } from 'react';

export const useCardTimer = (cardCount: number, duration: number) => {
  const [isBack, setIsBack] = useState<boolean[]>(Array(cardCount).fill(false));
  const [remainTime, setRemainTime] = useState<number[]>(
    Array(cardCount).fill(duration)
  );

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isBackRef = useRef(isBack);

  useEffect(() => {
    isBackRef.current = isBack;
  }, [isBack]);

  useEffect(() => {
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      setRemainTime((prev) =>
        prev.map((t, i) => {
          if (!isBackRef.current[i]) return t;
          return t > 0 ? t - 1 : 0;
        })
      );
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const toggle = useCallback(
    (idx: number) => {
      setIsBack((prev) => prev.map((v, i) => (i === idx ? true : v)));
      setRemainTime((prev) => prev.map((t, i) => (i === idx ? duration : t)));
    },
    [duration]
  );

  const openSync = useCallback(
    (idx: number, openTime?: string) => {
      setIsBack((prev) => prev.map((v, i) => (i === idx ? true : v)));

      setRemainTime((prev) =>
        prev.map((t, i) => {
          if (i !== idx) return t;

          if (openTime) {
            const openedAt = new Date(openTime).getTime();
            const now = Date.now();
            const elapsed = Math.floor((now - openedAt) / 1000);
            return Math.max(0, duration - elapsed);
          } else {
            return duration;
          }
        })
      );
    },
    [duration]
  );

  const syncBackState = useCallback((states: boolean[]) => {
    setIsBack(states);
  }, []);

  const isLocked = useCallback((idx: number) => isBack[idx], [isBack]);

  const formatHMS = (sec: number) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(
      2,
      '0'
    )}:${String(s).padStart(2, '0')}`;
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
