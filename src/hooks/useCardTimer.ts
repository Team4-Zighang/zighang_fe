'use client';
import { useEffect, useMemo, useState } from 'react';

export type UseCardTimeProps = {
  flipped: boolean[];
  remainTime: number[];
  isBack: (id: number) => boolean;
  isLocked: (id: number) => boolean;
  toggle: (id: number) => void;
  newPick: (id: number) => void;
  formatHMS: (sec: number) => string;
};

export function useCardTimer(
  cardCount: number,
  countdownSec = 60
): UseCardTimeProps {
  const [flipped, setFlipped] = useState<boolean[]>(() =>
    Array(cardCount).fill(false)
  );
  const [cardUnlockTime, setcardUnlockTime] = useState<(number | null)[]>(() =>
    Array(cardCount).fill(null)
  );
  const [now, setNow] = useState<number>(() => Date.now());

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const remainTime = useMemo(
    () =>
      cardUnlockTime.map((unlock) =>
        unlock ? Math.max(0, Math.floor((unlock - now) / 1000)) : 0
      ),
    [cardUnlockTime, now]
  );

  useEffect(() => {
    let changedFlip = false;
    let changedLock = false;

    setFlipped((prev) => {
      const next = [...prev];
      for (let i = 0; i < prev.length; i++) {
        if (prev[i] && remainTime[i] <= 0 && cardUnlockTime[i]) {
          next[i] = false;
          changedFlip = true;
        }
      }
      return changedFlip ? next : prev;
    });

    setcardUnlockTime((prev) => {
      const next = [...prev];
      for (let i = 0; i < prev.length; i++) {
        if (prev[i] && remainTime[i] <= 0 && prev[i] !== null) {
          next[i] = null;
          changedLock = true;
        }
      }
      return changedLock ? next : prev;
    });
  }, [remainTime, cardUnlockTime]);

  const toggle = (id: number) => {
    setFlipped((prev) => {
      const isBack = prev[id];
      if (isBack && cardUnlockTime[id] && remainTime[id] > 0) return prev;

      const nextFlipped = [...prev];
      if (!isBack) {
        nextFlipped[id] = true;
        setcardUnlockTime((prevLU) => {
          const unlock = [...prevLU];
          unlock[id] = Date.now() + countdownSec * 1000;
          return unlock;
        });
      } else {
        nextFlipped[id] = false;
        setcardUnlockTime((prevLU) => {
          const unlock = [...prevLU];
          unlock[id] = null;
          return unlock;
        });
      }
      return nextFlipped;
    });
  };

  const newPick = (id: number) => {
    setFlipped((prev) => {
      const next = [...prev];
      next[id] = false;
      return next;
    });
    setcardUnlockTime((prev) => {
      const next = [...prev];
      next[id] = null;
      return next;
    });
  };

  const isBack = (id: number) => !!flipped[id];
  const isLocked = (id: number) => isBack(id) && remainTime[id] > 0;

  const formatHMS = (sec: number) => {
    const s = Math.max(0, sec);
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const ss = s % 60;
    return [h, m, ss].map((v) => String(v).padStart(2, '0')).join(':');
  };

  return { flipped, remainTime, isBack, isLocked, toggle, newPick, formatHMS };
}
