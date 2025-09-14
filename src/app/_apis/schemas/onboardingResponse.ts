export interface OnBoardingResquest {
  jobCategory: string;
  jobRole: string[];
  careerYear: string;
  region: string;
  school: string;
  major: string;
}

export interface OnBoardingResponse {
  success: boolean;
  timestamp: string;
  data: boolean;
}

export interface SchoolListResponse {
  success: boolean;
  timestamp: string;
  data: string[];
}
