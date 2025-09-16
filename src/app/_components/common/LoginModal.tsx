import Image from 'next/image';
import React from 'react';

interface LoginProps {
  onClose: () => void;
}

const LoginModal = ({ onClose }: LoginProps) => {
  const handleKakaoLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/oauth2/authorization/kakao`;
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/40">
      <div className="relative w-[600px] rounded-[12px] bg-white p-10 shadow-lg">
        <Image
          src="/icons/close.svg"
          alt="닫기 아이콘"
          width={24}
          height={24}
          className="absolute top-4 right-4 h-6 w-6 cursor-pointer"
          onClick={onClose}
        />

        <div className="text-center">
          <div className="body-2xl-semibold text-gray-900">로그인/회원가입</div>
          <p className="body-sm-medium text-gray-600">
            맞춤 공고 알림을 받을 수 있어요!
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-2">
          <button
            className="web-title4 flex w-full cursor-pointer items-center justify-center gap-3 rounded-[8px] border border-gray-300 bg-white px-4 py-3 text-gray-700 shadow-sm"
            onClick={handleKakaoLogin}
          >
            <Image
              src="/images/login/kakao.png"
              alt="카카오"
              width={24}
              height={24}
              className="h-6 w-6"
            />
            카카오로 로그인
          </button>

          <button className="web-title4 flex w-full cursor-pointer items-center justify-center gap-3 rounded-[8px] border border-gray-300 bg-white px-4 py-3 text-gray-700 shadow-sm">
            <Image
              src="/images/login/naver.png"
              alt="네이버"
              width={24}
              height={24}
              className="h-6 w-6"
            />
            네이버로 로그인
          </button>

          <button className="web-title4 flex w-full cursor-pointer items-center justify-center gap-3 rounded-[8px] border border-gray-300 bg-white px-4 py-3 text-gray-700 shadow-sm">
            <Image
              src="/icons/google_icon.svg"
              alt="구글"
              width={24}
              height={24}
              className="h-6 w-6"
            />
            구글로 로그인
          </button>
        </div>

        <div className="caption-sm-medium mt-8 flex flex-row items-center justify-center text-[#363636]">
          <span className="cursor-pointer">개인정보 처리 방침</span>
          <div className="mx-2 text-[#363636]">|</div>
          <span className="cursor-pointer">서비스 이용 약관</span>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
