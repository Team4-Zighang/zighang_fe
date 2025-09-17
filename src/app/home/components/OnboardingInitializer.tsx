'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useOnboardingMutation } from '@/hooks/mutation/useOnboardingMutation';
import { GetUser } from '@/app/_apis/user';

const OnboardingInitializer = () => {
  const router = useRouter();
  const onboardingMutation = useOnboardingMutation();
  const didRun = useRef(false);

  useEffect(() => {
    if (didRun.current) return;
    didRun.current = true;

    const pending = sessionStorage.getItem('pendingOnboarding');
    if (pending) {
      const payload = JSON.parse(pending);

      onboardingMutation.mutate(payload, {
        onSuccess: async () => {
          try {
            sessionStorage.removeItem('pendingOnboarding');
            const data = await GetUser();
            localStorage.setItem('memberInfo', JSON.stringify(data));
          } catch (err) {
            console.error('GetUser 실패:', err);
          }
        },
        onError: (err) => {
          console.error('온보딩 제출 실패:', err);
          sessionStorage.removeItem('pendingOnboarding');
        },
      });
    } else {
      GetUser()
        .then((data) => {
          localStorage.setItem('memberInfo', JSON.stringify(data));
        })
        .catch((err) => {
          console.error('멤버 정보 호출 실패:', err);
          router.push('/home');
        });
    }
  }, []);

  return null;
};

export default OnboardingInitializer;
