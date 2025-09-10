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
