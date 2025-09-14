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
