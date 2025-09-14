'use client';

import { useKakaoOauth } from '@/app/_apis/auth';

export default function KakaoCallbackPage() {
  useKakaoOauth();
}
