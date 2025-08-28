import Image from 'next/image';
import Link from 'next/link';

type JobElementProps = {
  href: string;
  label: string;
  iconSrc: string;
};

export default function JobElement({ href, label, iconSrc }: JobElementProps) {
  return (
    <Link
      href={href}
      className="bg-base-neutral-alternative relative flex h-[44px] w-full items-center gap-[4px] px-[8px] py-[24px] md:h-[68px] md:gap-[8px] md:px-[16px]"
    >
      <Image
        alt={label}
        loading="lazy"
        data-nimg="1"
        src={iconSrc}
        width={20}
        height={20}
        className="h-[14px] w-[14px] flex-shrink-0 md:h-[20px] md:w-[20px]"
      />
      <p className="mobile-badge-lg md:body-lg-medium text-contents-neutral-primary w-fit whitespace-nowrap">
        <span className="tracking-[0.05px]">{label}</span>
      </p>
    </Link>
  );
}
