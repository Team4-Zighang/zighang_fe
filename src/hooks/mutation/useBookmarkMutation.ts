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
