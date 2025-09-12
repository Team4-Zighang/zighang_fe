import Image from 'next/image';
import React from 'react';

type StarRatesProps = {
  rate?: number;
};

const StarRates = ({ rate }: StarRatesProps) => {
  const count = Math.floor(rate || 0);
  const total = 5;
  return (
    <div className="flex">
      {[...Array(total)].map((_, i) =>
        i < count ? (
          <Image
            key={i}
            src="/icons/star_filled.svg"
            alt="star_filled"
            width={20}
            height={20}
          />
        ) : (
          <Image
            key={i}
            src="/icons/star.svg"
            alt="star"
            width={20}
            height={20}
          />
        )
      )}
    </div>
  );
};

export default StarRates;
