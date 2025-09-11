import { Toggle } from '@/app/_components/common/Toggle';
import Image from 'next/image';
import BookmarkListItem from './BookmarkListItem';
import { useMemo, useState } from 'react';
import { BookmarkItem } from '@/app/_apis/schemas/bookmarkResponse';

// 더미데이터, 추후 API 연동 필요
const data: BookmarkItem[] = [
  /**/
  {
    scrapId: 13,
    memoId: null,
    memoContent: null,
    jobPostingResponse: {
      postingId: 23252,
      title: '(주)제일 레져(낚시 쇼핑몰)에서 웹 디자이너를 모집합니다.',
      companyName: '주식회사 제일레져',
      expiredDate: null,
      qualification: '• 학력 무관\n• 경력 무관\n• 컴퓨터 활용 능력 보유자',
      preferentialTreatment:
        '• 카페24, 오픈마켓(스마트스토어, 옥션, G마켓, 11번가, 쿠팡) 경험자 우대\n• 쇼핑몰 홍보 및 광고 경험자 우대\n• 유튜브나 SNS 홍보 경험자 우대\n• 낚시 관련 지식 보유자 우대\n• 전공 또는 기타 디자인/웹디자인 학과 출신 우대',
      dday: 5,
    },
    fileResponse: {
      fileUrl: 'null',
      originalFileName: '이력서명',
    },
    portfolioResponse: {
      fileUrl: null,
      originalFileName: null,
    },
  },
  {
    scrapId: 15,
    memoId: null,
    memoContent: null,
    jobPostingResponse: {
      postingId: 23254,
      title: '웹 디자이너 모집',
      companyName: '주식회사 제일레져',
      expiredDate: '2025-07-24T12:05:00',
      qualification:
        '• 경력 1년 이상의 웹 디자이너를 모집합니다.\n• 학력 무관으로 누구나 지원 가능합니다.\n• 월급 210만원 이상을 지급하며, 기간은 정함이 없는 근로계약입니다.',
      preferentialTreatment:
        '• 컴퓨터 활용 능력이 뛰어난 자를 우대합니다.\n• 관련 자격증 소지자 우대합니다.',
      dday: 49,
    },
    fileResponse: {
      fileUrl: null,
      originalFileName: null,
    },
    portfolioResponse: {
      fileUrl: 'null',
      originalFileName: '포트폴리오명',
    },
  },
  {
    scrapId: 16,
    memoId: null,
    memoContent: null,
    jobPostingResponse: {
      postingId: 23256,
      title: '플러터 개발자',
      companyName: '메디패스',
      expiredDate: null,
      qualification: null,
      preferentialTreatment:
        '<p>우대 조건</p><hr><p>우대 조건은 말 그대로 우대 조건일 뿐입니다. 만약 우대 조건에 해당하는 사항이 없으시더라도, 팀과 함께 성장하실 수 있습니다.</p><ul><li><p>Flutter, Dart에 대해 깊은 이해가 있으신 분</p></li><li><p>Clean Architecture, MVVM, DI 등 디자인 패턴 적용에 대한 경험이 있으신 분</p></li><li><p>커뮤니티, SNS 서비스 운영/구현 경험이 있으신 분</p></li><li><p>앱 성능 최적화 및 코드 리팩토링 경험이 있으신 분</p></li><li><p>테스트 코드 작성 경험이 있으신 분</p></li><li><p>모바일 OS 별 다양한 트러블 슈팅 경험이 있으신 분</p></li><li><p>기획 &amp; 디자이너와 함께 모바일 앱 기획에 참여하실 분 (개발자의 의견을 적극 반영하는 팀!)</p></li><li><p>백엔드 개발자와 협업한 경험이 있고, 백엔드 개발자 업무에 대한 최소한의 이해도가 있으신 분</p></li><li><p>개발 직군이 아닌 팀원들에게 자신이 어떤 문제를 해결했는지 쉽게 이야기할 수 있는 분</p></li></ul>',
      dday: null,
    },
    fileResponse: {
      fileUrl: 'null',
      originalFileName: '이력서명',
    },
    portfolioResponse: {
      fileUrl: 'null',
      originalFileName: '포트폴리오명',
    },
  },
  {
    scrapId: 17,
    memoId: null,
    memoContent: null,
    jobPostingResponse: {
      postingId: 23257,
      title: '[메디패스] Flutter 플러터 개발자',
      companyName: '메디패스',
      expiredDate: '2025-07-25T14:01:00',
      qualification: null,
      preferentialTreatment:
        '•  서비스 오픈 및 운영 경험이 있으신 분\n•  Flutter를 활용한 개발 경험이 있으신 분\n•  Clean Architecture, Reactive Programming 에 대한 이해가 높으신 분\n•  확장 가능한 구조 설계를 위한 고민을 하시는 분\n•  기술 부채를 해결하고 리팩토링에 대한 거부감이 없으신 분\n•  모바일 앱을 사용하는 유저들을 위한 UI/UX 에 관심이 많으신 분\n•  개발 뿐만 아니라 서비스 전체에 대한 문제를 함께 해결함으로써 성취감을 느끼시는 분\n',
      dday: -48,
    },
    fileResponse: {
      fileUrl: null,
      originalFileName: null,
    },
    portfolioResponse: {
      fileUrl: null,
      originalFileName: null,
    },
  },
  {
    scrapId: 26,
    memoId: null,
    memoContent: null,
    jobPostingResponse: {
      postingId: 22109,
      title: '생산직 채용 (플라스틱 용기 생산 및 포장)',
      companyName: '주식회사 세진에스엠',
      expiredDate: null,
      qualification:
        '• 학력: 중졸 ~ 대졸 (4년)\n• 경력: 관계 없음\n• 고용형태: 기간의 정함이 없는 근로계약',
      preferentialTreatment:
        '• 컴퓨터 활용 능력이 있는 경우 우대합니다.\n• 관련 자격증 소지자 우대합니다.',
      dday: null,
    },
    fileResponse: {
      fileUrl: null,
      originalFileName: null,
    },
    portfolioResponse: {
      fileUrl: null,
      originalFileName: null,
    },
  },
  {
    scrapId: 27,
    memoId: null,
    memoContent: null,
    jobPostingResponse: {
      postingId: 22110,
      title: '생산직 직원 및 사무직 직원 모집',
      companyName: '주식회사 세진에스엠',
      expiredDate: null,
      qualification: '• 학력 무관\n• 경력 무관',
      preferentialTreatment: '• 컴퓨터 활용 능력 우대\n• 외국어 능력 우대',
      dday: null,
    },
    fileResponse: {
      fileUrl: null,
      originalFileName: null,
    },
    portfolioResponse: {
      fileUrl: null,
      originalFileName: null,
    },
  },
];

const BookmarkList = () => {
  const isLoggedIn = true; // 추후 실제 로그인 상태에 맞게 변경

  const [items, setItems] = useState<BookmarkItem[]>(data);
  const [isPublic, setIsPublic] = useState(true);

  const [expandedIds, setExpandedIds] = useState<number[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const handleToggleExpand = (id: number) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  const handleToggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const selectedCount = selectedIds.length;
  const allSelected = items.length > 0 && selectedIds.length === items.length;

  const toggleSelectAll = () => {
    setSelectedIds(allSelected ? [] : items.map((i) => i.scrapId));
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
        <div className="hidden items-center gap-[8px] md:flex">
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
        <div className="ml-auto flex items-center">
          <span className="body-lg-medium text-contents-neutral-secondary">
            북마크 공개
          </span>
          <Toggle checked={isPublic} onChange={() => setIsPublic(!isPublic)} />
        </div>
      </div>
      <div className="flex flex-col gap-[8px]">
        <div className="body-md-medium text-contents-neutral-tertiary hidden h-[32px] items-center md:flex">
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
            key={item.scrapId} // ✅ key 필수
            item={item}
            selected={selectedIds.includes(item.scrapId)}
            expanded={expandedIds.includes(item.scrapId)}
            onToggleSelect={() => handleToggleSelect(item.scrapId)}
            onToggleExpand={() => handleToggleExpand(item.scrapId)}
            // onBookmarkSelect={...}  // (북마크 별도 상태면 여기서)
          />
        ))}
      </div>
    </div>
  );
};

export default BookmarkList;
