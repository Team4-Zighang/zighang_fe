import { Toggle } from '@/app/_components/common/Toggle';
import Image from 'next/image';
import BookmarkListItem from './BookmarkListItem';
import { useCallback, useEffect, useState } from 'react';
import {
  BookmarkCommonResponse,
  BookmarkItem,
} from '@/app/_apis/schemas/bookmarkResponse';
import {
  DeleteBookmark,
  GetBookmarkList,
  PostBookmark,
} from '@/app/_apis/bookmark';
import Pagination from '@/app/_components/common/Pagination';

const BookmarkList = () => {
  const isLoggedIn = true; // 추후 실제 로그인 상태에 맞게 변경

  const [items, setItems] = useState<BookmarkItem[]>([]);
  const [isPublic, setIsPublic] = useState(true);

  const [page, setPage] = useState(1);
  const size = 10;
  const [totalPages, setTotalPages] = useState(1);

  const [expandedIds, setExpandedIds] = useState<number[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const loadPage = useCallback(
    async (p: number = page) => {
      try {
        const res: BookmarkCommonResponse = await GetBookmarkList(p - 1, size);
        setItems(res.data);
        setTotalPages(res.totalPages);

        // 페이지가 바뀌거나 새로 가져올 때 선택/펼침 초기화
        setSelectedIds([]);
        setExpandedIds([]);
      } catch (error) {
        console.error('북마크 목록 조회 실패:', error);
      }
    },
    [page, size]
  );

  useEffect(() => {
    loadPage(page).catch((e) => console.error('북마크 목록 조회 실패:', e));
  }, [page, loadPage]);

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

    try {
      await DeleteBookmark(selectedIds);

      const deletingAllOnPage = selectedIds.length === items.length;
      const nextPage = deletingAllOnPage && page > 1 ? page - 1 : page;

      setPage(nextPage);
      await loadPage(nextPage);
    } catch (error) {
      console.error('삭제 실패:', error);
    }
  };

  const handleBookmarkToggle = async (postingId: number, next: boolean) => {
    const idx = items.findIndex(
      (i) => i.jobPostingResponse.postingId === postingId
    );
    if (idx === -1) return;

    setItems((prev) => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], scrapId: next ? 9999 : null };
      return copy;
    });

    try {
      if (!next) {
        if (items[idx].scrapId != null)
          await DeleteBookmark([items[idx].scrapId]);
      } else {
        await PostBookmark(postingId);
        const res = await GetBookmarkList(page - 1, size);
        const fresh = res.data.find(
          (it) => it.jobPostingResponse.postingId === postingId
        );
        if (fresh) {
          setItems((prev) => {
            const copy = [...prev];
            copy[idx] = fresh;
            return copy;
          });
        }
      }
      console.log('북마크 토글 성공');
    } catch (e) {
      console.error('bookmark toggle failed', e);
      setItems((prev) => {
        const copy = [...prev];
        copy[idx] = items[idx];
        return copy;
      });
    }
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
          />
        ))}
        <Pagination totalPages={totalPages} page={page} onChange={setPage} />
      </div>
    </div>
  );
};

export default BookmarkList;
