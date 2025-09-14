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
