import {
  DeleteBookmark,
  GetBookmarkList,
  GetPersonalityAnalysis,
  PostBookmark,
} from '@/app/_apis/bookmark';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

/**
 * 북마크 리스트 불러오기
 */
export function useBookmarkList({
  page,
  size,
}: {
  page: number;
  size: number;
}) {
  return useQuery({
    queryKey: ['bookmarkList', page, size],
    queryFn: () => GetBookmarkList(page, size),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

/**
 * 분석 결과 불러오기
 */

export function usePersonalityAnalysis() {
  return useQuery({
    queryKey: ['PersonalityAnalysis'],
    queryFn: () => GetPersonalityAnalysis(),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

/**
 * 북마크 등록 및 삭제
 */

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
          data: prev.data.map((it) => {
            if (it.jobPostingResponse.postingId !== postingId) return it;

            if (next) {
              return { ...it, __bookmarkedOptimistic: true } as any;
            }
            return {
              ...it,
              scrapId: null,
              __bookmarkedOptimistic: false,
            } as any;
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
