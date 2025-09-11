import {
  GetAlumniScrap,
  GetCompany,
  GetDetailInfo,
  GetHotPosting,
  GetInfo,
} from '@/app/_apis/alumni';
import { AlumniScrapResponse } from '@/app/_apis/schemas/alumniResponse';
import { useIsMobile } from '@/app/_components/common/Pagination';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

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

export function useGetAlumniScrap(page: number) {
  const isMobile = useIsMobile();

  return useQuery<AlumniScrapResponse>({
    queryKey: ['AlumniScrap', page, isMobile],
    queryFn: () => GetAlumniScrap(page, isMobile),
    staleTime: 1000 * 30,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
  });
}

export function useAlumniInfo() {
  return useQuery({
    queryKey: ['Info'],
    queryFn: () => GetInfo(),
  });
}

export function useAlumniDetailInfo(memberId: number) {
  return useQuery({
    queryKey: ['DetailInfo', memberId],
    queryFn: () => GetDetailInfo(memberId),
  });
}
