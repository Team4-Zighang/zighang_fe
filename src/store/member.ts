export type MemberData = {
  jobRole?: {
    jobRole?: string[];
  };
  member?: {
    memberId?: number;
    memberName?: string;
    profileImageUrl?: string;
    role?: string;
  };
  onboarding?: {
    careerYear?: number;
    school?: string;
    jobCategory?: string;
    major?: string;
    region?: string[];
  };
};

export function getMember(): MemberData | null {
  if (typeof window === 'undefined') return null;

  try {
    const raw = localStorage.getItem('memberInfo');
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    return parsed?.data || null;
  } catch {
    return null;
  }
}

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('accessToken');
}
