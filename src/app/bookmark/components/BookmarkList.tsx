import { Toggle } from '@/app/_components/common/Toggle';
import Image from 'next/image';
import BookmarkListItem from './BookmarkListItem';
import { useState } from 'react';
import Pagination from '@/app/_components/common/Pagination';
import { useBookmarkList } from '@/hooks/queries/useBookmark';
import { useQueryClient } from '@tanstack/react-query';
import {
  useDeleteBookmark,
  useToggleBookmark,
} from '@/hooks/mutation/useBookmarkMutation';
import Loader from '@/app/_components/common/Loader';

const BookmarkList = () => {
  const isLoggedIn = true; // 추후 실제 로그인 상태에 맞게 변경
  const queryClient = useQueryClient();
  const [isPublic, setIsPublic] = useState(true);

  const [page, setPage] = useState(1);
  const size = 10;

  const [expandedIds, setExpandedIds] = useState<number[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const { data, isLoading, isError, isFetching } = useBookmarkList({
    page: page - 1,
    size,
  });

  const { mutate: deleteBookmark } = useDeleteBookmark();

  const items = data?.data || [];
  const totalPages = data?.totalPages || 1;

  const handleFileUploaded = async () => {
    // 전체 리스트 재조회
    queryClient.invalidateQueries({ queryKey: ['bookmarkList'] });
  };

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
    setSelectedIds(
      allSelected
        ? []
        : items.map((i) => i.scrapId).filter((id): id is number => id !== null)
    );
  };

  const handleDelete = async () => {
    if (selectedIds.length === 0) return;

    if (!window.confirm(`${selectedIds.length}개의 북마크를 삭제하시겠습니까?`))
      return;

    deleteBookmark(selectedIds, {
      onSuccess: () => {
        setSelectedIds([]);
        setExpandedIds([]);
      },
      onError: (error) => {
        console.error('삭제 실패:', error);
      },
    });
  };

  const { mutate } = useToggleBookmark(page - 1, size);
  const handleBookmarkToggle = (postingId: number, next: boolean) => {
    const item = items.find(
      (i) => i.jobPostingResponse.postingId === postingId
    );
    if (!item) return;
    mutate({ postingId, next, scrapId: item.scrapId ?? null });
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

  if (isFetching || isLoading)
    return (
      <div className="flex h-[360px] w-full items-center justify-center">
        <Loader />
      </div>
    );

  if (isError) return <div>에러가 발생했습니다.</div>;

  if (data?.totalElements === 0) {
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
            onClick={handleDelete}
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
            key={item.jobPostingResponse.postingId}
            item={item}
            selected={
              item.scrapId !== null && selectedIds.includes(item.scrapId)
            }
            expanded={
              item.scrapId !== null && expandedIds.includes(item.scrapId)
            }
            onToggleSelect={() =>
              item.scrapId !== null && handleToggleSelect(item.scrapId)
            }
            onToggleExpand={() =>
              item.scrapId !== null && handleToggleExpand(item.scrapId)
            }
            onBookmarkToggle={handleBookmarkToggle}
            onFileUploaded={handleFileUploaded}
          />
        ))}
        <Pagination totalPages={totalPages} page={page} onChange={setPage} />
      </div>
    </div>
  );
};

export default BookmarkList;
