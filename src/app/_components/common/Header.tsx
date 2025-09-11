'use client';

import SearchBar from '@/app/home/components/SearchBar';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import NavigationPanel from './NavigationPanel';

export default function Header() {
  const pathname = usePathname();
  const [currentPath, setCurrentPath] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const isLoggedIn = false; // 추후 상태 관리로 변경

  useEffect(() => {
    setCurrentPath(pathname);
  }, [pathname]);

  const isActive = (path: string) =>
    currentPath === path
      ? 'after:bg-contents-primary-accent after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full'
      : '';

  return (
    <>
      <header className="relative w-full">
        <div className="border-base-neutral-border relative z-10 box-border flex w-full flex-row items-center justify-between border-b-[1px] bg-white px-[16px] py-[12px] md:z-100 md:px-[40px]">
          <div className="flex flex-shrink-0 gap-[20px]">
            <Link className="cursor-pointer" href="/home">
              <Image
                src="/icons/logo.svg"
                className="my-[8px] h-[24px] md:h-[30px]"
                alt="Logo"
                width={65}
                height={24}
              />
            </Link>

            <div className="web-navi text-contents-neutral-primary hidden items-center gap-[32px] md:flex">
              <Link href="/home" className={`relative ${isActive('/home')}`}>
                채용 공고
              </Link>
              <Link
                href="/company"
                className={`relative ${isActive('/company')}`}
              >
                기업관
              </Link>
              <Link
                href="/alumni"
                className={`relative ${isActive('/alumni')}`}
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
            <div className="hidden min-w-[120px] flex-shrink px-[20px] lg:flex">
              <SearchBar mdWidth="md:w-[448px]" />
            </div>
            <Link href="/bookmark">
              <span className="web-navi text-contents-neutral-primary hidden flex-shrink-0 cursor-pointer md:block">
                북마크
              </span>
            </Link>

            {isLoggedIn ? (
              <Image
                src="/icons/profile.svg"
                alt="profile"
                width={40}
                height={40}
                className="h-[40px] w-[40px] cursor-pointer"
              />
            ) : (
              <>
                <div className="mobile-filter text-contents-primary-default px-[8px] md:hidden">
                  로그인
                </div>
                <div className="web-title4 border-base-neutral-border text-contents-primary-default hidden h-[44px] cursor-pointer items-center justify-center rounded-[8px] border-[1px] px-[16px] py-[10px] md:block">
                  로그인/회원가입
                </div>
              </>
            )}

            <Image
              src="/icons/menu.svg"
              alt="menu"
              width={24}
              height={24}
              className="m-[4px] h-[24px] w-[24px] cursor-pointer md:hidden"
              onClick={() => setMenuOpen(true)}
            />
          </div>
        </div>
      </header>

      {menuOpen && <NavigationPanel onClose={() => setMenuOpen(false)} />}
    </>
  );
}
