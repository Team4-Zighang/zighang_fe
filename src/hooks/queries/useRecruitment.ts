import { GetRecruitmentDetail } from '@/app/_apis/recruitment';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

/**
 * 공고 상세 불러오기
 */

export const useRecruitmentDetail = ({ id }: { id: number }) => {
  return useQuery({
    queryKey: ['recruitmentDetail', id],
    queryFn: () => GetRecruitmentDetail(id),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
