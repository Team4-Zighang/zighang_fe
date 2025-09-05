import { Toggle } from '@/app/_components/common/Toggle';
import Image from 'next/image';
import BookmarkListItem, { BookmarkListItemProps } from './BookmarkListItem';
import { useMemo, useState } from 'react';

// 더미데이터, 추후 API 연동 필요
const data: BookmarkListItemProps[] = [
  /*
  {
    id: 1,
    dday: '마감',
    title: 'Product Management',
    company: '(주)삼성전자',
    requirement: '• B2B 서비스 기획/PM/PMO 관련 업무 경험이 있는 분',
    preference:
      '• 개발, 해킹 및 보안에 대한 지식이 있으신 분• 신규 제품 기획부터 오픈• 지 프로세스를 경험해보신 분• 영어 커뮤니케이션 원활하신 분',
    memo: '3급 채용이라 좀 빡셀 거 같은... 그래도 우선 지원은 했다. 저번 상반기에는 그래도 서류까지는 붙었으니까 이번에도 가능성 좀 있지',
    docs: true,
    selected: false,
    expanded: false,
  },
  {
    id: 2,
    dday: '상시',
    title: 'Product Designer',
    company: '당근마켓',
    requirement: '• 5년 이상의 모바일, 웹 서비스 디자인 경험이 있으신 분',
    preference: '• 금융 및 핀테크 서비스에 대한 이해도가 높고 경험이 있는 분',
    memo: '',
    docs: true,
    selected: false,
    expanded: false,
  },
  {
    id: 3,
    dday: 3,
    title: 'NCP 프로덕트 디자인',
    company: '네이버클라우드',
    requirement: '• 클라우드 또는 대규모 포털 서비스 디자인 경험이 있으신 분',
    preference: '• 클라우드 또는 대규모 포털 서비스 디자인 경험이 있으신 분',
    memo: '3급 채용이라 좀 빡셀 거 같은... 그래도 우선 지원은 했다. 저번 상반기에는 그래도 서류까지는 붙었으니까 이번에도 가능성 좀 있지',
    docs: false,
    selected: false,
    expanded: false,
  },
  {
    id: 4,
    dday: 10,
    title: 'NCP 프로덕트 디자인',
    company: '네이버클라우드',
    requirement: '• 클라우드 또는 대규모 포털 서비스 디자인 경험이 있으신 분',
    preference: '• 클라우드 또는 대규모 포털 서비스 디자인 경험이 있으신 분',
    memo: '3급 채용이라 좀 빡셀 거 같은... 그래도 우선 지원은 했다. 저번 상반기에는 그래도 서류까지는 붙었으니까 이번에도 가능성 좀 있지',
    docs: false,
    selected: false,
    expanded: false,
  },
   */
];

const BookmarkList = () => {
  const isLoggedIn = false; // 추후 실제 로그인 상태에 맞게 변경

  const [items, setItems] = useState<BookmarkListItemProps[]>(data);
  const [isPublic, setIsPublic] = useState(true);

  const selectedCount = useMemo(
    () => items.filter((item) => item.selected).length,
    [items]
  );

  const allSelected = useMemo(
    () => items.length > 0 && selectedCount === items.length,
    [items, selectedCount]
  );

  const toggleSelectAll = () => {
    setItems((prev) => prev.map((i) => ({ ...i, selected: !allSelected })));
  };

  const toggleSelectOne = (id: number) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, selected: !i.selected } : i))
    );
  };

  const toggleExpand = (id: number) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, expanded: !i.expanded } : i))
    );
  };

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center gap-[12px] py-[64px]">
        <Image
          src="/icons/bookmark.svg"
          alt="empty bookmark"
          width={40}
          height={40}
        />
        <div className="flex flex-col items-center gap-[4px]">
          <span className="body-2xl-semibold text-contents-neutral-primary">
            로그인이 필요해요 😢
          </span>
          <span className="body-md-medium text-contents-neutral-tertiary">
            마음에 드는 공고를 보고 북마크에 담아보세요!
          </span>
        </div>
        <button className="bg-base-primary-default text-contents-state-inverse rounded-[12px] px-[24px] py-[12px]">
          로그인하고 공고 북마크하기
        </button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-[12px] py-[64px]">
        <Image
          src="/icons/bookmark.svg"
          alt="empty bookmark"
          width={40}
          height={40}
        />
        <div className="flex flex-col items-center gap-[4px]">
          <span className="body-2xl-semibold text-contents-neutral-primary">
            담겨있는 북마크가 없어요 😢
          </span>
          <span className="body-md-medium text-contents-neutral-tertiary">
            마음에 드는 공고를 보고 북마크에 담아보세요!
          </span>
        </div>
        <button className="bg-base-primary-default text-contents-state-inverse rounded-[12px] px-[24px] py-[12px]">
          공고 보러가기
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[16px]">
      <div className="flex justify-between">
        <div className="flex items-center gap-[8px]">
          <div className="flex gap-[4px]">
            <span className="body-md-medium text-contents-neutral-primary">
              총
            </span>
            <span className="body-md-semibold text-contents-primary-default">
              {selectedCount}개
            </span>
            <span className="body-md-medium text-contents-neutral-primary">
              선택됨
            </span>
          </div>
          <div className="border-base-neutral-border h-[16px] border-l" />
          <button
            className={`body-md-semibold ${selectedCount > 0 ? 'cursor-pointer text-red-500' : 'text-contents-state-disabled'}`}
            onClick={() => {
              if (selectedCount > 0) {
                alert(`${selectedCount}개 삭제하기`);
              }
            }}
          >
            삭제하기
          </button>
        </div>
        <div className="flex items-center">
          <span className="body-lg-medium text-contents-neutral-secondary">
            북마크 공개
          </span>
          <Toggle checked={isPublic} onChange={() => setIsPublic(!isPublic)} />
        </div>
      </div>
      <div className="flex flex-col gap-[8px]">
        <div className="body-md-medium text-contents-neutral-tertiary flex h-[32px] items-center">
          <div className="w-[40px]"></div>
          {/* 전체 선택 체크박스 */}
          <div className="relative flex w-[56px] items-center justify-center">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={toggleSelectAll}
              className="peer absolute flex h-[16px] w-[16px] cursor-pointer opacity-0"
              aria-checked={allSelected}
            />
            <Image
              src={allSelected ? '/icons/checked.svg' : '/icons/unchecked.svg'}
              alt={allSelected ? 'checked' : 'unchecked'}
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
        {/* 북마크 요소 리스트 */}
        {items.map((item) => (
          <BookmarkListItem
            key={item.id}
            item={item}
            onToggleSelect={() => toggleSelectOne(item.id)}
            onToggleExpand={() => toggleExpand(item.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default BookmarkList;
