// /posting/{postingId} get 응답
export interface RecruitmentItem {
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

export interface RecruitmentCommonResponse<T> {
  success: boolean;
  timestamp: string;
  data: T;
}
