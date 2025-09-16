'use client';
import Loader from '@/app/_components/common/Loader';
import { useHotcompanies } from '@/hooks/queries/useAlumni';
import { getToken } from '@/store/member';
import Image from 'next/image';

const PopularCompany = () => {
  const { data: hotcompanies, isLoading, isError } = useHotcompanies();

  const token = getToken();
  if (!token) {
    return (
      <div className="mt-5 flex w-full flex-col items-center justify-center">
        <Image
          src="/icons/lock.svg"
          alt="nologin"
          width={36}
          height={36}
          className="h-6 w-6 md:h-9 md:w-9"
        />
        <div className="text-contents-primary-accent heading-md-semibold">
          로그인 후 이용 가능
        </div>
      </div>
    );
  }

  if (isLoading)
    return (
      <div className="mt-5 flex w-full items-center justify-center">
        <Loader />
      </div>
    );
  if (isError)
    return <div className="mt-5 text-center">에러가 발생했습니다.</div>;

  return (
    <div className="mt-5 flex snap-x snap-mandatory gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] md:flex-col md:gap-5 md:overflow-visible [&::-webkit-scrollbar]:hidden">
      {hotcompanies?.map((hotcompany, idx) => (
        <div
          key={idx}
          className="border-base-neutral-border flex shrink-0 basis-[88%] snap-start items-stretch rounded-[12px] border bg-white md:basis-auto"
        >
          <div className="flex min-w-0 flex-1 flex-row items-center gap-3 p-2 md:gap-4 md:p-4">
            <div className="border-base-neutral-border relative h-[44px] w-[44px] overflow-hidden rounded-[12px] border bg-gray-50 md:h-[80px] md:w-[80px]">
              <Image
                src={hotcompany.companyImageUrl || '/images/sampleimage.png'}
                alt={`${hotcompany.companyName} logo`}
                fill
                sizes="(min-width: 768px) 80px, 44px"
                className="object-contain"
              />
            </div>

            <div className="flex min-w-0 flex-col">
              <div className="text-contents-neutral-primary mobile-title2 md:web-title2 mt-[6px]">
                {hotcompany.companyName}
              </div>
            </div>
          </div>

          <button
            aria-label="북마크"
            className="border-l-base-neutral-border flex w-12 cursor-pointer items-center justify-center border-l px-2 md:w-[84px]"
          >
            <Image
              src="/icons/bookmark_gray.svg"
              alt="bookmark"
              width={28}
              height={28}
              className="h-7 w-7"
            />
          </button>
        </div>
      ))}
    </div>
  );
};

export default PopularCompany;
