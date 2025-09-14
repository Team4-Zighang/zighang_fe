'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { GetUser } from './user';

export function useKakaoOauth() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = searchParams.get('accessToken');

    if (token) {
      localStorage.setItem('accessToken', token);

      GetUser()
        .then((data) => {
          localStorage.setItem('memberInfo', JSON.stringify(data));

          router.push('/');
        })
        .catch((err) => {
          console.error('멤버 정보 호출 실패:', err);
          router.push('/login');
        });
    }
  }, [searchParams, router]);
}
