// eslint-disable-next-line @next/next/no-img-element
'use client';

import AnalyzeCard from '@/app/bookmark/components/AnalyzeCard';
import { useEffect, useState } from 'react';

export default function PromotionMobile() {
  const titles = [
    '직장인을 행복하게!',
    '직행이라면 \n 행복해질 수 있어요',
    '직행에서 맞춤 공고를 \n 추천받아보세요',
    '출퇴근길이 한 결 \n가벼워질거예요',
    '직장인을 행복하게!',
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % titles.length);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="flex flex-col">
      <section className="relative h-[500px] w-full overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/promotion_mo.mp4" type="video/mp4" />
          <source src="/promo-video.webm" type="video/webm" />
          브라우저가 비디오 태그를 지원하지 않습니다.
        </video>

        <div className="relative z-10 flex h-full flex-col items-center justify-center">
          <div className="text-contents-neutral-primary heading-1xl-semibold text-center whitespace-pre-line">
            {titles[index]}
          </div>
        </div>
      </section>

      <section className="relative w-full">
        <img
          src="/dongdongsum_m.gif"
          alt="애니메이션"
          className="mx-auto w-full"
        />

        <div className="absolute inset-0 mx-5 flex flex-col items-start gap-2 py-[128px]">
          <div className="text-contents-primary-accent body-md-semibold">
            직행이와 함께 취준해요!
          </div>
          <div className="text-contents-neutral-primary heading-1xl-semibold">
            8가지 유형으로 직행이의 <br />
            모습을 확인할 수 있어요
          </div>
          <p className="text-contents-neutral-secondary body-md-regular">
            후드를 뒤집어쓴 직장인의 평범한 모습, <br />
            어딘가 당신과 닮진 않았나요? <br />
            우리나라 모든 직장인이 행복해질 때까지 함께해요! <br />
            직행이가 여러분을 응원할게요.
          </p>
        </div>
      </section>

      <section className="flex w-full justify-center">
        <AnalyzeCard
          customTitle="님의 취업 유형에 꼭 맞는 채용 공고예요!"
          customButtonText="나의 직행이를 친구들에게 공유해보세요!"
          customButtonHref="/bookmark"
        />
      </section>
    </main>
  );
}
