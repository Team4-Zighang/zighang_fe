import { Onboarding } from '@/app/_apis/onboarding';
import { OnBoardingResquest } from '@/app/_apis/schemas/onboardingResponse';
import { useMutation } from '@tanstack/react-query';

export function useOnboardingMutation() {
  return useMutation({
    mutationFn: (data: OnBoardingResquest) => Onboarding(data),
    onError: (error) => {
      console.error('온보딩 실패:', error);
    },
  });
}
