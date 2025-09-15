import { Onboarding } from '@/app/_apis/onboarding';
import { OnBoardingResquest } from '@/app/_apis/schemas/onboardingResponse';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export function useOnboardingMutation() {
  const router = useRouter();
  return useMutation({
    mutationFn: (data: OnBoardingResquest) => Onboarding(data),
    onSuccess: () => {
      router.push('/home');
    },
    onError: (error) => {
      console.error('온보딩 실패:', error);
    },
  });
}
