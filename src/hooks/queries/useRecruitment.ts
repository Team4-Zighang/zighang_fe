import { GetMemo } from '@/app/_apis/memo';
import {
  GetRecruitmentDetail,
  GetRecruitmentEvalList,
} from '@/app/_apis/recruitment';
import { useQuery } from '@tanstack/react-query';

/**
 * 공고 상세 불러오기
 */

export const useRecruitmentDetail = ({ postingId }: { postingId: number }) => {
  return useQuery({
    queryKey: ['recruitmentDetail', postingId],
    queryFn: () => GetRecruitmentDetail(postingId),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
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
