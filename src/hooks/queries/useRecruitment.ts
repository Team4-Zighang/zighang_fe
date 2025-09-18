import { GetMemo } from '@/app/_apis/memo';
import {
  GetRecruitmentDetail,
  GetRecruitmentEvalList,
} from '@/app/_apis/recruitment';
import {
  RecruitmentCommonResponse,
  RecruitmentItem,
} from '@/app/_apis/schemas/recruitmentResponse';
import { useQueries, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

/**
 * 공고 상세 불러오기
 */

export const useRecruitmentDetail = ({ postingId }: { postingId: number }) => {
  return useQuery({
    queryKey: ['recruitmentDetail', postingId],
    queryFn: () => GetRecruitmentDetail(postingId),
    gcTime: 30 * 60 * 1000,
    staleTime: 0,
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    placeholderData: (prev) => prev,
  });
};

/**
 * 공고평 목록 불러오기
 */
export function useRecruitmentEvalList({ id }: { id: number }) {
  return useQuery({
    queryKey: ['recruitmentEvalList', id],
    queryFn: () => GetRecruitmentEvalList(id),
    enabled: Number.isFinite(id) && id > 0,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

// 메모 불러오기
export function useGetMemo({ id }: { id: number }) {
  return useQuery({
    queryKey: ['memo'],
    queryFn: () => GetMemo(id),
    enabled: Number.isFinite(id) && id > 0,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

export function useSimilarJobs(count = 6, min = 30000, max = 35000) {
  const randomIds = useMemo(() => {
    const ids = new Set<number>();
    while (ids.size < count) {
      ids.add(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return Array.from(ids);
  }, [count, min, max]);

  const queries = useMemo(
    () =>
      randomIds.map((id) => ({
        queryKey: ['recruitmentDetail', id] as const,
        queryFn: () => GetRecruitmentDetail(id),
        gcTime: 30 * 60 * 1000,
        staleTime: 0,
        refetchOnMount: 'always' as const,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        placeholderData: (prev: any) => prev,
        select: (res: RecruitmentCommonResponse<RecruitmentItem>) => res.data,
      })),
    [randomIds]
  );

  const jobDetails = useQueries({
    queries,
  });

  return { randomIds, jobDetails };
}
