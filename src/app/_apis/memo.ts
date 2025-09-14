import api from './api';
import {
  MemoCommonResponse,
  MemoPostRequest,
  MemoPostResponse,
} from './schemas/memoResponse';

export async function PostMemo({
  postingId,
  content,
}: MemoPostRequest): Promise<MemoCommonResponse<MemoPostResponse>> {
  const { data } = await api.post('memo/save', {
    postingId,
    content,
  });

  return data;
}

export async function GetMemo(
  postingId: number
): Promise<MemoCommonResponse<string>> {
  const { data } = await api.get(`memo/${postingId}`);
  return data;
}
