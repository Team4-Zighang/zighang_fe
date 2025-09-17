import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: [
      'cdn.rallit.com',
      'd2juy7qzamcf56.cloudfront.net',
      'static.wanted.co.kr',
      'k.kakaocdn.net',
      'img1.kakaocdn.net',
      'groupby-public-image.s3.ap-northeast-2.amazonaws.com',
    ],
  },
};

export default nextConfig;
