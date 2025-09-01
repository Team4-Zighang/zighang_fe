import Image from 'next/image';

export type BookmarkListItemProps = {
  id: number;
  dday: number | '상시' | '마감'; // D-DAY
  title: string; // 공고명
  company: string; // 기업명
  requirement: string; // 자격요건
  preference: string; // 우대사항
  memo?: string; // 메모
  docs?: boolean; // 서류 제출 여부
  selected: boolean; // 선택 여부
  expanded: boolean; // 상세보기 여부
};

type Props = {
  item: BookmarkListItemProps;
  onToggleSelect?: () => void;
  onToggleExpand?: () => void;
};

function getDisabledClass(dday: BookmarkListItemProps['dday']) {
  return dday === '마감' ? 'text-contents-state-disabled' : '';
}

const BookmarkListItem = ({ item, onToggleSelect, onToggleExpand }: Props) => {
  return (
    <>
      <div
        className={`hover:bg-base-primary-alternative body-md-medium flex h-[56px] cursor-pointer items-center rounded-[12px] transition-colors ${getDisabledClass(item.dday)} text-contents-neutral-secondary`}
      >
        <div className="flex w-[40px] items-center justify-center">
          <button onClick={onToggleExpand}>
            <Image
              src={
                item.expanded
                  ? '/icons/arrow_under.svg'
                  : '/icons/arrow_right.svg'
              }
              alt="arrow"
              width={24}
              height={24}
            />
          </button>
        </div>
        <div className="relative flex w-[56px] items-center justify-center">
          <input
            type="checkbox"
            checked={item.selected} // 상태 관리
            className="peer absolute flex h-[16px] w-[16px] cursor-pointer opacity-0"
            onChange={onToggleSelect}
            aria-checked={item.selected}
          />
          <Image
            src={item.selected ? '/icons/checked.svg' : '/icons/unchecked.svg'}
            alt={item.selected ? 'checked' : 'unchecked'}
            width={24}
            height={24}
          />
        </div>
        <span className="flex w-[64px] justify-center">
          {typeof item.dday === 'number' ? (
            item.dday <= 5 ? (
              <div className="text-contents-state-inverse rounded-full bg-red-500 px-[12px]">
                D-{item.dday}
              </div>
            ) : (
              <div className="text-contents-neutral-secondary px-[12px]">
                D-{item.dday}
              </div>
            )
          ) : (
            <div
              className={`text-contents-neutral-secondary px-[12px] ${getDisabledClass(item.dday)}`}
            >
              {item.dday}
            </div>
          )}
        </span>
        <span className="w-[200px] px-[12px]">{item.title}</span>
        <span className="w-[128px] px-[12px]">{item.company}</span>
        <span className="flex-1 overflow-hidden px-[12px] text-ellipsis whitespace-nowrap">
          {item.requirement}
        </span>
        <span className="flex-1 overflow-hidden px-[12px] text-ellipsis whitespace-nowrap">
          {item.preference}
        </span>
        <span
          className={`flex-1 overflow-hidden px-[12px] text-ellipsis whitespace-nowrap ${getDisabledClass(item.dday)}`}
        >
          {item.memo ? (
            item.memo
          ) : (
            <span
              className={
                item.dday === '마감'
                  ? 'text-contents-state-disabled'
                  : 'text-contents-state-unselected'
              }
            >
              메모 없음
            </span>
          )}
        </span>
        <span className="w-[104px] px-[12px]">
          {item.docs ? (
            <span
              className={`text-contents-primary-default ${getDisabledClass(item.dday)} text-contents-primary-default`}
            >
              업로드 완료
            </span>
          ) : (
            <span
              className={`text-contents-state-unselected ${getDisabledClass(item.dday)}`}
            >
              미업로드
            </span>
          )}
        </span>
      </div>
      {item.expanded && (
        <div className="body-md-medium flex flex-col gap-[8px]">
          <div className="bg-base-neutral-alternative flex flex-col gap-[16px] rounded-[12px] px-[24px] py-[20px]">
            <div className="flex gap-[24px]">
              <span className="text-contents-neutral-tertiary w-[108px]">
                자격요건
              </span>
              <div className="text-contents-neutral-secondary">
                {item.requirement}
              </div>
            </div>
            <div className="flex gap-[24px]">
              <span className="text-contents-neutral-tertiary w-[108px]">
                우대사항
              </span>
              <div className="text-contents-neutral-secondary">
                {item.preference}
              </div>
            </div>
            <div className="flex gap-[24px]">
              <span className="w-[108px]"></span>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="flex cursor-pointer items-center gap-[4px]"
              >
                <Image
                  src="/icons/open_in_new.svg"
                  alt="Open in new tab"
                  width={20}
                  height={20}
                />
                <div className="text-blue-600">공고 원문 보기</div>
              </a>
            </div>
          </div>
          <div className="bg-base-neutral-alternative flex flex-col gap-[16px] rounded-[12px] px-[24px] py-[20px]">
            <div className="flex gap-[24px]">
              <span className="text-contents-neutral-tertiary w-[108px]">
                메모
              </span>
              <div className="text-contents-neutral-secondary">
                {item.memo || '없음'}
              </div>
            </div>
            <div className="flex gap-[16px]">
              <span className="text-contents-neutral-tertiary">
                이력서/포트폴리오
              </span>
              <div className="body-sm-semibold bg-base-neutral-default flex flex-1 flex-col gap-[12px] rounded-[12px] px-[24px] py-[12px]">
                <div className="flex">
                  <span className="text-contents-neutral-primary w-[80px]">
                    이력서
                  </span>
                  <span className="text-contents-neutral-secondary body-sm-medium flex-1">
                    김선화_이력서.pdf
                  </span>
                  <div className="flex gap-[24px]">
                    <button className="text-contents-primary-accent flex cursor-pointer gap-[4px]">
                      <Image
                        src="/icons/download.svg"
                        width={20}
                        height={20}
                        alt="Download"
                      />
                      <span>내려받기</span>
                    </button>
                    <button className="text-contents-primary-accent flex cursor-pointer gap-[4px]">
                      <Image
                        src="/icons/upload.svg"
                        width={20}
                        height={20}
                        alt="Upload"
                      />
                      <span>재업로드</span>
                    </button>
                  </div>
                </div>
                <div className="flex">
                  <span className="text-contents-neutral-primary w-[80px]">
                    포트폴리오
                  </span>
                  <span className="text-contents-neutral-secondary body-sm-medium flex-1">
                    김선화_포트폴리오.pdf
                  </span>
                  <div className="flex gap-[24px]">
                    <button className="text-contents-primary-accent flex cursor-pointer gap-[4px]">
                      <Image
                        src="/icons/download.svg"
                        width={20}
                        height={20}
                        alt="Download"
                      />
                      <span>내려받기</span>
                    </button>
                    <button className="text-contents-primary-accent flex cursor-pointer gap-[4px]">
                      <Image
                        src="/icons/upload.svg"
                        width={20}
                        height={20}
                        alt="Upload"
                      />
                      <span>재업로드</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BookmarkListItem;
