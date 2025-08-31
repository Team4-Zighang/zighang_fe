import { Toggle } from '@/app/_components/common/Toggle';
import Image from 'next/image';
import BookmarkListItem from './BookmarkListItem';

const BookmarkList = () => {
  return (
    <div className="flex flex-col gap-[16px]">
      <div className="flex justify-between">
        <div className="flex items-center gap-[8px]">
          <div className="flex gap-[4px]">
            <span className="body-md-medium text-contents-neutral-primary">
              총
            </span>
            <span className="body-md-semibold text-contents-primary-default">
              0개
            </span>
            <span className="body-md-medium text-contents-neutral-primary">
              선택됨
            </span>
          </div>
          <div className="border-contents-neutral-divider h-[16px] border-l" />
          <button className="body-md-semibold cursor-pointer text-red-500">
            삭제하기
          </button>
        </div>
        <div className="flex items-center">
          <span className="body-lg-medium text-contents-neutral-secondary">
            북마크 공개
          </span>
          <Toggle checked={true} onChange={() => {}} />
        </div>
      </div>
      <div className="flex flex-col gap-[8px]">
        <div className="body-md-medium text-contents-neutral-tertiary flex h-[32px] items-center">
          <div className="w-[40px]"></div>
          <div className="flex w-[56px] items-center justify-center">
            <input
              type="checkbox"
              checked={true} // 전체 선택 상태 관리
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
          <span className="flex w-[64px] justify-center">D-DAY</span>
          <span className="w-[200px] px-[12px]">공고명</span>
          <span className="w-[128px] px-[12px]">기업명</span>
          <span className="flex-1 px-[12px]">자격요건</span>
          <span className="flex-1 px-[12px]">우대사항</span>
          <span className="flex-1 px-[12px]">메모</span>
          <span className="w-[104px] px-[12px]">지원서류</span>
        </div>
        <BookmarkListItem />
        <BookmarkListItem />
        <BookmarkListItem />
      </div>
    </div>
  );
};

export default BookmarkList;
