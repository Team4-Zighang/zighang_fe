'use client';

import { Suspense } from 'react';
import { useKakaoOauth } from '@/app/_apis/auth';

function KakaoCallbackInner() {
  useKakaoOauth();
  return <div>로그인 처리 중...</div>;
}

export default function KakaoCallbackPage() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <KakaoCallbackInner />
    </Suspense>
  );
}
