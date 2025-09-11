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

export interface BookmarkPersonalityResponse {
  success: boolean;
  timestamp: string;
  data: PersonalityResponse;
}

export interface PersonalityResponse {
  characterName: string;
  companyValue: {
    majorValue: number;
    startUpValue: number;
  };
  workTypeValue: {
    officeValue: number;
    remoteValue: number;
  };
  pursuitOfValue: {
    welfareFeeValue: number;
    personalGrowthValue: number;
  };
}

export type BookmarkFileType = 'RESUME' | 'PORTFOLIO';

export const BOOKMARK_FILE_TYPE = {
  RESUME: 'RESUME',
  PORTFOLIO: 'PORTFOLIO',
} as const;

export interface BookmarkFileResponse {
  success: boolean;
  timestamp: string;
  data: {
    fileUrl: string;
    originalFileName: string;
  };
}
