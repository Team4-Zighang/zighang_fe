export type TrendType = 'UP' | 'DOWN' | 'STABLE' | 'NEW';

const normalizeTrend = (t: TrendType): 'UP' | 'DOWN' | 'STABLE' =>
  t === 'NEW' ? 'STABLE' : t;

export const getTrendIcon = (t: TrendType) => {
  const type = normalizeTrend(t);
  return type === 'UP'
    ? '/icons/rank_up.svg'
    : type === 'DOWN'
      ? '/icons/rank_down.svg'
      : '/icons/rank_none.svg';
};

export const getTrendColor = (t: TrendType) => {
  const type = normalizeTrend(t);
  return type === 'UP'
    ? 'text-red-500'
    : type === 'DOWN'
      ? 'text-blue-500'
      : 'text-contents-neutral-tertiary';
};
