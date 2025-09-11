export interface jobPostingTop3Response {
  postingId: number;
  title: string;
  companyName: string;
  companyImageUrl: string | null;
  depthTwo: string;
  recruitmentType: string;
  career: string;
  dday: string;
  isSaved: boolean;
  changeRankValue: number;
  changeRankStatus: string;
}

export interface companiesTop3Response {
  companyName: string;
  companyImageUrl: string;
  isSaved: boolean;
}

export interface AlumniScrapItem {
  postingId: number;
  postingTitle: string;
  companyName: string;
  companyImageUrl: string;
  career: string;
  recruitmentType: string;
  education: string;
  region: string;
  totalViews: number;
  dday: string;
  isSaved: boolean;
}

export interface AlumniScrapResponse {
  data: AlumniScrapItem[];
  totalPages: number;
  last: boolean;
  totalElements: number;
  page: number;
  size: number;
  success: boolean;
  timestamp: string;
}

export interface AlumniInfoResponse {
  memberId: number;
  memberName: string;
  school: string;
  jobRole: string;
  major: string;
  companyLists: [
    {
      companyName: string;
      companyImageUrl: string;
    },
  ];
}
