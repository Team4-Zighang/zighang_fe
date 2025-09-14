export interface MemoPostRequest {
  postingId: number;
  content: string;
}

export interface MemoPostResponse {
  memoId: number;
  message: string;
}

export interface MemoCommonResponse<T> {
  success: boolean;
  timestamp: string;
  data: T;
}
