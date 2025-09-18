import Image from 'next/image';

const Footer = () => {
  return (
    <div className="mt-20 h-[300px] w-full bg-gray-100 px-6 lg:px-[120px]">
      <div className="flex w-full flex-col py-12 sm:px-[60px]">
        <Image
          src="/icons/logo.svg"
          alt="Logo"
          width={81}
          height={40}
          className="h-10 w-[81px]"
        />
        <div className="text-contents-neutral-tertiary mt-5 flex flex-wrap items-center">
          <span className="web-badge-sm">에이아이커리어</span>
          <div className="mx-2">|</div>
          <span className="web-badge-sm">서울특별시 성동구 뚝섬로3길 11-5</span>
          <div className="text-base-neutral-border mx-2">|</div>
          <span className="web-badge-sm">대표: 이재헌</span>
          <div className="text-base-neutral-border mx-2">|</div>
          <span className="web-badge-sm">이메일: paca@zighang.com</span>
          <div className="text-base-neutral-border mx-2">|</div>
          <span className="web-badge-sm">연락처: 010-9862-5855</span>
          <div className="text-base-neutral-border mx-2">|</div>
          <span className="web-badge-sm">사업자등록: 256-15-02584 1</span>
          <div className="text-base-neutral-border mx-2">|</div>
          <span className="web-badge-sm">
            직업정보제공사업 신고번호: J1202020240011
          </span>
          <div className="text-base-neutral-border mx-2 sm:hidden">|</div>
          <span className="web-badge-sm">이용약관</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
