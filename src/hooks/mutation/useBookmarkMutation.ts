/**
 * 북마크 등록 및 삭제
 */

import { DeleteBookmark, PostBookmark } from '@/app/_apis/bookmark';
import { CardShowOpenResponse } from '@/app/_apis/schemas/cardResponse';
import { useMutation, useQueryClient } from '@tanstack/react-query';

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
