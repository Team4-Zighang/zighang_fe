'use client';

import SearchBar from '@/app/home/components/SearchBar';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type MobileMenuProps = {
  onClose: () => void;
};

export default function NavigationPanel({ onClose }: MobileMenuProps) {
  const pathname = usePathname();

  return (
    <>
      <div className="fixed inset-0 z-[1000]">
        <div
          className="fixed inset-0 z-[1000] bg-black/40"
          onClick={onClose}
          aria-hidden="true"
        />
        <div className="pointer-events-auto fixed top-0 right-0 z-[1001] flex h-full w-[75vw] flex-col rounded-l-[16px] bg-white px-[24px] py-[16px]">
          <Image
            src="/icons/x_button.svg"
            alt="Close menu"
            width={24}
            height={24}
            className="m-[8px] mb-[30px] cursor-pointer self-start"
            onClick={onClose}
          />
          <div className="gap-6px body-lg-semibold flex flex-col pb-[40px]">
            <Link
              href="/home"
              onClick={onClose}
              className="relative inline-block p-[8px]"
            >
              <span
                className={`relative inline-block ${
                  pathname === '/home'
                    ? 'text-contents-primary-accent after:bg-contents-primary-accent after:absolute after:-bottom-[2px] after:left-0 after:h-[1px] after:w-full'
                    : ''
                }`}
              >
                채용 공고
              </span>
            </Link>
            <Link
              className="relative inline-block p-[8px]"
              href="/company"
              onClick={onClose}
            >
              <span
                className={`relative inline-block ${
                  pathname === '/company'
                    ? 'text-contents-primary-accent after:bg-contents-primary-accent after:absolute after:-bottom-[2px] after:left-0 after:h-[1px] after:w-full'
                    : ''
                }`}
              >
                기업관
              </span>
            </Link>

            <Link
              className="relative inline-block p-[8px]"
              href="/alumni"
              onClick={onClose}
            >
              <span
                className={`relative inline-block ${
                  pathname === '/alumni'
                    ? 'text-contents-primary-accent after:bg-contents-primary-accent after:absolute after:-bottom-[2px] after:left-0 after:h-[1px] after:w-full'
                    : ''
                }`}
              ></span>
              동문관
            </Link>

            <Link className="p-[8px]" href="/" onClick={onClose}>
              공고 제보
            </Link>
            <Link
              className="p-[8px]"
              onClick={onClose}
              href="https://linktr.ee/zighang_chat"
              target="_blank"
            >
              오픈 채팅
            </Link>
          </div>
          <SearchBar onClick={onClose} />
        </div>
      </div>
    </>
  );
}
