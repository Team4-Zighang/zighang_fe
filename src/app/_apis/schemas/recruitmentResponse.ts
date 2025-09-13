// /posting/{postingId} get 응답
export interface RecruitmentItem {
  isSaved: boolean;
  scrapId: number | null;
  postingId: number;
  title: string;
  education: string;
  depthTwo: string;
  career: string;
  workType: string;
  region: string;
  company: {
    companyName: string | null;
    companyImageUrl: string | null;
  };
  viewCount: number;
  recruitmentImageUrl: string | null;
  recruitmentContent: string | null;
  recruitmentOriginalUrl: string;
  uploadDate: string;
  expiredDate: string;
}

/**
 * 공고 평가 관련
 */

// /posting/eval/{postingId} get 응답 -> 공고평 리스트
export interface EvalContent {
  score: number;
  major: string;
  createdAt: string;
  recruitmentStep: string;
  evalText: string;
}

export interface RecruitmentEvalItem {
  content: EvalContent[];
  pageable: {
    paged: true;
    pageNumber: 0;
    pageSize: 0;
    offset: 0;
    sort: {
      sorted: true;
      empty: true;
      unsorted: true;
    };
    unpaged: true;
  };
  first: boolean;
  last: boolean;
  size: number;
  number: number;
  sort: {
    sorted: true;
    empty: true;
    unsorted: true;
  };
  numberOfElements: number;
  empty: boolean;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: any[];
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Page<T> {
  content: T[];
  pageable: Pageable;
  first: boolean;
  last: boolean;
  size: number;
  number: number;
  sort: any[];
  numberOfElements: number;
  empty: boolean;
}

export interface RecruitmentEvalList {
  schoolName: string;
  avgScore: number;
  totalCount: number;
  evalList: Page<EvalContent>;
}

export interface RecruitmentCommonResponse<T> {
  success: boolean;
  timestamp: string;
  data: T;
}
