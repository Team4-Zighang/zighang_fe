import api from './api';
import {
  OnBoardingResponse,
  OnBoardingResquest,
} from './schemas/OnboardingResponse';

export async function Onboarding(
  body: OnBoardingResquest
): Promise<OnBoardingResponse> {
  const res = await api.post<OnBoardingResponse>(`/onboarding`, body);

  console.log(res.data);
  return res.data;
}
