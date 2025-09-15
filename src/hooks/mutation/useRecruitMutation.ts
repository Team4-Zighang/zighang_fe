import { PostMemo } from '@/app/_apis/memo';
import { PostRecruitmentEval } from '@/app/_apis/recruitment';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function usePostRecruitmentEval({ id }: { id: number }) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: PostRecruitmentEval,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recruitmentEvalList', id] });
      console.log('공고평가 전송 성공');
    },
    onError: (error) => {
      console.error('공고평가 전송 실패:', error);
    },
  });
}

export function usePostMemo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: PostMemo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['memo'] });
      console.log('메모 전송 성공');
    },
    onError: (error) => {
      console.error('메모 전송 실패:', error);
    },
  });
}
