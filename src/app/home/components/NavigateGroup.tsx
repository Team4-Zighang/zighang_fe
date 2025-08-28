import Image from 'next/image';
import Link from 'next/link';

export default function NavigateGroup() {
  return (
    <div className="mb-[24px] flex justify-center md:mb-[48px] md:gap-[16px]">
      <Link
        href="/company"
        className="flex cursor-pointer items-center px-[4px]"
      >
        <div className="body-sm-semibold md:body-lg-semibold text-contents-primary-default">
          7,585개 기업&nbsp;
        </div>
        <div className="body-sm-semibold md:body-lg-semibold text-contents-neutral-tertiary">
          전체 보기
        </div>
        <Image
          src="/icons/arrow_right.svg"
          alt="arrow right"
          width={16}
          height={16}
          className="h-[16px] w-[16px] flex-shrink-0 md:h-[20px] md:w-[20px]"
        />
      </Link>
      <Link href="/all" className="flex cursor-pointer items-center px-[4px]">
        <div className="body-sm-semibold md:body-lg-semibold text-contents-primary-default">
          11,208개 공고&nbsp;
        </div>
        <div className="body-sm-semibold md:body-lg-semibold text-contents-neutral-tertiary">
          전체 보기
        </div>
        <Image
          src="/icons/arrow_right.svg"
          alt="arrow right"
          width={16}
          height={16}
          className="h-[16px] w-[16px] flex-shrink-0 md:h-[20px] md:w-[20px]"
        />
      </Link>
    </div>
  );
}
