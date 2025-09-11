import {
  BookmarkScrapResponse,
  type BookmarkCommonResponse,
} from '@/app/_apis/schemas/bookmarkResponse';
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

export async function PostBookmark(jobPostingId: number, scrapId?: number) {
  const { data } = await api.post<BookmarkScrapResponse>('scrap', {
    scrapId: scrapId ?? null,
    jobPostingId,
  });

  return data;
}

export async function DeleteBookmark(idList: number[]): Promise<void> {
  await api.delete('scrap', {
    data: {
      idList,
    },
  });
}
