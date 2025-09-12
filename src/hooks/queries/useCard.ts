import { GetScrap, GetShowOpen } from '@/app/_apis/card';
import { useQuery } from '@tanstack/react-query';

export function useCardOpen() {
  return useQuery({
    queryKey: ['OpenedCard'],
    queryFn: () => GetShowOpen(),
  });
}

export function useScrap() {
  return useQuery({
    queryKey: ['CardScrap'],
    queryFn: () => GetScrap(),
  });
}
