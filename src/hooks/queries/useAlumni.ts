import { GetCompany, GetHotPosting } from '@/app/_apis/alumni';
import { useQuery } from '@tanstack/react-query';

/**
 * 인기있는공고 top3
 */
export function useHotposting() {
  return useQuery({
    queryKey: ['Hotposting'],
    queryFn: () => GetHotPosting(),
  });
}

/**
 * 인기있는기업 top3
 */
export function useHotcompanies() {
  return useQuery({
    queryKey: ['Hotcompanies'],
    queryFn: () => GetCompany(),
  });
}
