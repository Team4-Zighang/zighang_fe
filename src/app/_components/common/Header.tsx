'use client';

import SearchBar from '@/app/home/components/SearchBar';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  return (
    <header className="relative w-full">
      <div className="border-base-neutral-border relative z-10 box-border flex w-full flex-row items-center justify-between border-b-[1px] px-[16px] py-[12px] md:px-[40px]">
        <div className="flex gap-[20px]">
          <Image
            src="/icons/logo_header.svg"
            className="my-[8px] h-[24px] md:h-[30px]"
            alt="Logo"
            width={65}
            height={24}
          />
          <div className="web-navi text-contents-neutral-primary hidden items-center gap-[32px] md:flex">
            <Link
              href="/home"
              className={`relative ${
                pathname === '/home'
                  ? 'after:bg-contents-primary-accent after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full'
                  : ''
              }`}
            >
              채용 공고
            </Link>{' '}
            <Link
              href="/company"
              className={`relative ${
                pathname === '/company'
                  ? 'after:bg-contents-primary-accent after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full'
                  : ''
              }`}
            >
              기업관
            </Link>
            <Link
              href="/"
              className={`relative ${
                pathname === '/'
                  ? 'after:bg-contents-primary-accent after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full'
                  : ''
              }`}
            >
              동문관
            </Link>
            <Link href="/">공고 제보</Link>
            <Link href="https://linktr.ee/zighang_chat" target="_blank">
              오픈 채팅
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-[8px] md:gap-[16px]">
          <div className="hidden px-[20px] lg:block">
            <SearchBar mdWidth="md:w-[448px]" />
          </div>
          <span className="web-navi text-contents-neutral-primary hidden cursor-pointer md:block">
            북마크
          </span>
          <Image
            src="/icons/profile.svg"
            alt="profile"
            width={40}
            height={40}
            className="h-[40px] w-[40px] cursor-pointer"
          />
          <Image
            src="/icons/menu.svg"
            alt="menu"
            width={24}
            height={24}
            className="m-[4px] h-[24px] w-[24px] cursor-pointer md:hidden"
          />
        </div>
      </div>
    </header>
  );
}
