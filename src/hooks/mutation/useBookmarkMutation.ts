/**
 * 북마크 등록 및 삭제
 */

import {
  RecruitmentCommonResponse,
  RecruitmentItem,
} from '@/app/_apis/schemas/recruitmentResponse';
import { DeleteBookmark, PostBookmark } from '@/app/_apis/bookmark';
import { CardShowOpenResponse } from '@/app/_apis/schemas/cardResponse';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GetRecruitmentDetail } from '@/app/_apis/recruitment';

export function useDeleteBookmark() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (idList: number[]) => DeleteBookmark(idList),
    onSuccess: (_, variables) => {
      const scrapId = variables[0];

      queryClient.invalidateQueries({ queryKey: ['bookmarkList'] });
      queryClient.invalidateQueries({ queryKey: ['AlumniScrap'] });
      queryClient.invalidateQueries({ queryKey: ['DetailInfo'] });
      queryClient.invalidateQueries({ queryKey: ['Hotposting'] });
      queryClient.invalidateQueries({ queryKey: ['CardScrap'] });
      queryClient.invalidateQueries({ queryKey: ['OpenedCard'] });

      queryClient.setQueryData<CardShowOpenResponse[]>(
        ['OpenedCard'],
        (old) => {
          if (!old) return old;
          return old.map((card) =>
            card.cardJobPosting.scrapId === scrapId
              ? {
                  ...card,
                  cardJobPosting: {
                    ...card.cardJobPosting,
                    isScrap: false,
                  },
                }
              : card
          );
        }
      );
    },
    onError: (error) => {
      console.error('삭제 실패:', error);
    },
  });
}

export function usePostBookmark() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      jobPostingId,
      scrapId,
    }: {
      jobPostingId: number;
      scrapId?: number;
    }) => PostBookmark(jobPostingId, scrapId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarkList'] });
    },
    onError: (error) => {
      console.error('등록 실패 :', error);
    },
  });
}

type ToggleVars = {
  postingId: number;
  scrapId?: number | null;
  next: boolean;
};

export function useJobDetailScrapMutation(postingId: number) {
  const qc = useQueryClient();
  const detailKey = ['recruitmentDetail', postingId];

  return useMutation({
    mutationFn: async ({ postingId, scrapId, next }: ToggleVars) => {
      if (next) {
        console.log('등록');
        return PostBookmark(postingId, scrapId ?? undefined);
      } else {
        console.log('해제');
        if (!scrapId) throw new Error('scrapId가 필요합니다');
        return DeleteBookmark([scrapId]);
      }
    },

    onMutate: async (vars) => {
      await qc.cancelQueries({ queryKey: detailKey });
      const prev =
        qc.getQueryData<RecruitmentCommonResponse<RecruitmentItem>>(detailKey);

      if (prev?.data) {
        const current = prev.data;
        const optimistic: RecruitmentCommonResponse<RecruitmentItem> = {
          ...prev,
          data: {
            ...current,
            isSaved: vars.next,
            scrapId: vars.next ? current.scrapId : null,
          },
        };
        qc.setQueryData(detailKey, optimistic);
      }

      return { prev };
    },

    onSuccess: async (_result, variables) => {
      if (variables.next) {
        const fresh = await GetRecruitmentDetail(variables.postingId);
        qc.setQueryData(detailKey, fresh);
      }
    },

    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData(detailKey, ctx.prev);
      console.error('북마크 토글 실패:', _err);
    },
  });
}
