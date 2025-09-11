import type { BookmarkCommonResponse } from '@/app/_apis/schemas/bookmarkResponse';
import api from './api';

export async function GetBookmarkList(
  page: number,
  size: number
): Promise<BookmarkCommonResponse> {
  const { data } = await api.get<BookmarkCommonResponse>('scrap', {
    params: { page, size },
  });
  return data;
}
