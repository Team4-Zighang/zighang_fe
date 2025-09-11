///scrap?page=1&size=10

import api from './api';
import { BookmarkItem } from './schemas/bookmarkResponse';

export async function GetBookmarkList(
  page?: number,
  size?: number
): Promise<BookmarkItem[]> {
  const res = await api.get<{ data: BookmarkItem[] }>('scrap', {
    params: {
      page,
      size,
    },
  });

  return res.data.data;
}
