'use client';

import { Suspense } from 'react';
import { useKakaoOauth } from '@/app/_apis/auth';
import Loader from '@/app/_components/common/Loader';

function KakaoCallbackInner() {
  useKakaoOauth();
  return (
    <div className="flex items-center justify-center">
      <Loader />
    </div>
  );
}

export default function KakaoCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center">
          {' '}
          <Loader />
        </div>
      }
    >
      <KakaoCallbackInner />
    </Suspense>
  );
}
