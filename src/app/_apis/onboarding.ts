import api from './api';
import {
  MajorListResponse,
  OnBoardingResponse,
  OnBoardingResquest,
  SchoolListResponse,
} from './schemas/onboardingResponse';

export async function Onboarding(
  body: OnBoardingResquest
): Promise<OnBoardingResponse> {
  const res = await api.post<OnBoardingResponse>(`/onboarding`, body);

  return res.data;
}

export async function GetSchoolList(): Promise<SchoolListResponse> {
  const res = await api.get<SchoolListResponse>('/onboarding/school');

  return res.data;
}

export async function GetMajorList(school: string): Promise<MajorListResponse> {
  const res = await api.get<MajorListResponse>(`/onboarding/major/${school}`);

  return res.data;
}
