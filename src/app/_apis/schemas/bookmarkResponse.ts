export interface BookmarkFile {
  fileUrl: string | null;
  originalFileName: string | null;
}

export interface BookmarkItem {
  scrapId: number | null;
  memoId: number | null;
  memoContent: string | null;
  jobPostingResponse: {
    postingId: number;
    title: string;
    companyName: string;
    expiredDate: string | null;
    qualification: string | null;
    preferentialTreatment: string | null;
    dday: number | null;
  };
  fileResponse: BookmarkFile;
  portfolioResponse: BookmarkFile;
}

export interface BookmarkCommonResponse {
  data: BookmarkItem[];
  totalPages: number;
  last: boolean;
  totalElements: number;
  page: number;
  size: number;
  success: boolean;
  timestamp: string;
}

export interface BookmarkScrapResponse {
  success: boolean;
  timestamp: string;
  data: boolean;
}
