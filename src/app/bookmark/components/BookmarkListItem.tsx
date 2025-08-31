import Image from 'next/image';

const BookmarkListItem = () => {
  return (
    <div className="body-md-medium text-contents-neutral-secondary flex h-[56px] items-center">
      <div className="flex w-[40px] items-center">
        <button>
          <Image
            src="/icons/arrow_right.svg"
            alt="arrow"
            width={24}
            height={24}
          />
        </button>
      </div>
      <div className="flex w-[56px] items-center justify-center">
        <input
          type="checkbox"
          checked={true} // 상태 관리
          className="peer absolute flex h-[16px] w-[16px] cursor-pointer opacity-0"
          onClick={() => {}}
          aria-checked={true}
        />
        <Image
          src={true ? '/icons/checked.svg' : '/icons/unchecked.svg'}
          alt={true ? 'checked' : 'unchecked'}
          width={24}
          height={24}
        />
      </div>
      <span className="flex w-[64px] justify-center">
        <div className="text-contents-state-inverse rounded-full bg-red-500 px-[12px]">
          D-2
        </div>
      </span>
      <span className="w-[200px] px-[12px]">Product Management</span>
      <span className="w-[128px] px-[12px]">(주)삼성전자</span>
      <span className="flex-1 overflow-hidden px-[12px] text-ellipsis whitespace-nowrap">
        • B2B 서비스 기획/PM/PMO 관련 업무 경험이 있는 분
      </span>
      <span className="flex-1 overflow-hidden px-[12px] text-ellipsis whitespace-nowrap">
        • 개발, 해킹 및 보안에 대한 지식이 있으신 분•
      </span>
      <span className="flex-1 overflow-hidden px-[12px] text-ellipsis whitespace-nowrap">
        3급 채용이라 좀 빡셀 거 같은... 그래도 우선
      </span>
      <span className="w-[104px] px-[12px]">지원서류</span>
    </div>
  );
};

export default BookmarkListItem;
