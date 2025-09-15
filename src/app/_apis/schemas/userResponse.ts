export interface Member {
  memberId: number;
  memberName: string;
  profileImageUrl: string;
  role: string;
}

export interface Onboarding {
  jobCategory: string;
  careerYear: number;
  region: string;
  school: string;
  major: string;
}

export interface JobRole {
  jobRole: string[];
}

export interface MemberResponse {
  success: boolean;
  timestamp: string;
  data: {
    member: Member;
    onboarding: Onboarding;
    jobRole: JobRole;
  };
}
