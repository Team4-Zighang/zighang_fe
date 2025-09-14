/**
 * 북마크 등록 및 삭제
 */

import {
  DeleteBookmark,
  GetBookmarkList,
  PostBookmark,
} from '@/app/_apis/bookmark';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useDeleteBookmark() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (idList: number[]) => DeleteBookmark(idList),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarkList'] });
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

type BookmarkItem = {
  jobPostingResponse: { postingId: number };
  scrapId: number | null;
  __bookmarkedOptimistic?: boolean;
};

export function useToggleBookmark(page?: number, size?: number) {
  const qc = useQueryClient();
  const key = ['bookmarkList', page, size];

  return useMutation({
    mutationFn: async (vars: {
      postingId: number;
      next: boolean;
      scrapId: number | null;
    }) => {
      if (vars.next) {
        await PostBookmark(vars.postingId);
      } else {
        if (vars.scrapId != null) {
          await DeleteBookmark([vars.scrapId]);
        }
      }
    },
    onMutate: async ({ postingId, next }) => {
      await qc.cancelQueries({ queryKey: key });

      const prev =
        qc.getQueryData<Awaited<ReturnType<typeof GetBookmarkList>>>(key);

      // optimistic update
      if (prev) {
        const patched = {
          ...prev,
          data: prev.data.map((it: BookmarkItem) => {
            if (it.jobPostingResponse.postingId !== postingId) return it;

            if (next) {
              return { ...it, __bookmarkedOptimistic: true };
            }
            return {
              ...it,
              scrapId: null,
              __bookmarkedOptimistic: false,
            };
          }),
        };
        qc.setQueryData(key, patched);
      }

      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData(key, ctx.prev);
    },
  });
}
