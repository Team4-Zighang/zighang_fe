import { GetShowOpen } from '@/app/_apis/card';
import { useQuery } from '@tanstack/react-query';

export function useCardOpen() {
  return useQuery({
    queryKey: ['OpenedCard'],
    queryFn: () => GetShowOpen(),
  });
}
