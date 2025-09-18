import { PostBookmarkFile } from '@/app/_apis/bookmark';
import {
  BookmarkFileType,
  BookmarkItem,
} from '@/app/_apis/schemas/bookmarkResponse';
import { useDeleteBookmark } from '@/hooks/mutation/useBookmarkMutation';
import { extractTextFromHtml } from '@/utils/cleantext';
import Image from 'next/image';
import React, { useRef, useState } from 'react';

// DDAY 상시면 상시, 숫자는 d-00 이렇게 보내주는듯?

type Props = {
  item: BookmarkItem;
  expanded?: boolean;
  selected?: boolean;
  onToggleSelect?: () => void;
  onToggleExpand?: () => void;
  onFileUploaded?: (scrapId: number) => void;
};

function isClosed(dday: number | null) {
  return dday !== null && dday <= 0;
}

function getDisabledClass(dday: number | null) {
  return isClosed(dday) ? 'text-contents-state-disabled' : '';
}

const BookmarkListItem = ({
  item,
  expanded,
  selected,
  onToggleSelect,
  onToggleExpand,
  onFileUploaded,
}: Props) => {
  const { mutate } = useDeleteBookmark();

  const docs =
    !!item.fileResponse?.fileUrl || !!item.portfolioResponse?.fileUrl;

  const [isBookmarked, setIsBookmarked] = useState(item.scrapId !== null);

  const onBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // 북마크 삭제
    setIsBookmarked(!isBookmarked);
    mutate([item.scrapId!]);
  };

  // const handleBookmarkClick = (e: React.MouseEvent) => {
  //   e.stopPropagation();
  //   setIsBookmarked(!isBookmarked);
  //   onBookmarkToggle?.(item.jobPostingResponse.postingId, !isBookmarked);
  // };

  const resumeInputRef = useRef<HTMLInputElement>(null);
  const portfolioInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (
    fileType: BookmarkFileType,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (item.scrapId === null) return;
    try {
      await PostBookmarkFile(item.scrapId, fileType, file);
      onFileUploaded?.(item.scrapId);
    } catch (error) {
      console.error('파일 업로드 실패:', error);
    }
  };

  const isHtml = /<\/?[a-z][\s\S]*>/i.test(
    item.jobPostingResponse.qualification ?? '<p></p>'
  );

  return (
    <>
      {/* Desktop View */}
      <div
        className={`hover:bg-base-primary-alternative body-md-medium hidden h-[56px] cursor-pointer items-center rounded-[12px] transition-colors md:flex ${getDisabledClass(item.jobPostingResponse.dday)} text-contents-neutral-secondary`}
        onClick={onToggleExpand}
      >
        <div className="flex w-[40px] items-center justify-center">
          <Image
            src={expanded ? '/icons/arrow_under.svg' : '/icons/arrow_right.svg'}
            alt="arrow"
            width={24}
            height={24}
          />
        </div>
        <div className="flex w-[56px] items-center justify-center">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleSelect?.();
            }}
            aria-pressed={selected}
            aria-label={selected ? '선택 해제' : '선택'}
            className="flex h-[24px] w-[24px] items-center justify-center"
          >
            <Image
              src={selected ? '/icons/checked.svg' : '/icons/unchecked.svg'}
              alt={selected ? 'checked' : 'unchecked'}
              width={24}
              height={24}
            />
          </button>
        </div>
        {/* D-DAY 표기 */}
        <span className="flex w-[64px] justify-center">
          {typeof item.jobPostingResponse.dday === 'number' ? (
            item.jobPostingResponse.dday > 0 ? (
              item.jobPostingResponse.dday <= 5 ? (
                <div className="text-contents-state-inverse rounded-full bg-red-500 px-[12px]">
                  D-{item.jobPostingResponse.dday}
                </div>
              ) : (
                <div className="text-contents-neutral-secondary px-[12px]">
                  D-{item.jobPostingResponse.dday}
                </div>
              )
            ) : (
              <div
                className={`px-[12px] ${getDisabledClass(item.jobPostingResponse.dday)}`}
              >
                마감
              </div>
            )
          ) : (
            <div className="text-contents-neutral-secondary px-[12px]">
              상시
            </div>
          )}
        </span>
        <span className="w-[200px] overflow-hidden px-[12px] text-ellipsis whitespace-nowrap">
          {item.jobPostingResponse.title}
        </span>
        <span className="w-[128px] overflow-hidden px-[12px] text-ellipsis whitespace-nowrap">
          {item.jobPostingResponse.companyName}
        </span>
        <span className="flex-1 overflow-hidden px-[12px] text-ellipsis whitespace-nowrap">
          {item.jobPostingResponse.qualification || '없음'}
        </span>
        <span className="flex-1 overflow-hidden px-[12px] text-ellipsis whitespace-nowrap">
          {isHtml
            ? extractTextFromHtml(
                item.jobPostingResponse.preferentialTreatment || '없음'
              )
            : item.jobPostingResponse.preferentialTreatment || '없음'}
        </span>
        <span
          className={`flex-1 overflow-hidden px-[12px] text-ellipsis whitespace-nowrap`}
        >
          <span
            className={
              getDisabledClass(item.jobPostingResponse.dday) ||
              (item.memoContent
                ? 'text-contents-neutral-secondary'
                : 'text-contents-state-unselected')
            }
          >
            {item.memoContent ? `${item.memoContent}` : '메모 없음'}
          </span>
        </span>
        <span
          className={`w-[104px] px-[12px] ${
            getDisabledClass(item.jobPostingResponse.dday) ||
            (docs
              ? 'text-contents-primary-default'
              : 'text-contents-state-unselected')
          }`}
        >
          {docs ? '업로드 완료' : '미업로드'}
        </span>
      </div>
      {/* Mobile View */}
      <div
        className={`body-sm-medium flex justify-start md:hidden ${getDisabledClass(item.jobPostingResponse.dday)}`}
        onClick={onToggleExpand}
      >
        <div className="flex w-[40px] items-start justify-center p-[8px]">
          <Image
            src={expanded ? '/icons/arrow_under.svg' : '/icons/arrow_right.svg'}
            alt="arrow"
            width={24}
            height={24}
          />
        </div>
        <div className="flex flex-1 flex-col gap-[4px] py-[8px]">
          <div className="flex justify-between">
            <div className="flex flex-col">
              {typeof item.jobPostingResponse.dday === 'number' ? (
                item.jobPostingResponse.dday > 0 ? (
                  item.jobPostingResponse.dday <= 5 ? (
                    <div
                      className={`${item.jobPostingResponse.dday <= 5 ? 'text-red-500' : 'text-contents-neutral-secondary'}`}
                    >
                      D-{item.jobPostingResponse.dday}
                    </div>
                  ) : (
                    <div className="text-contents-neutral-secondary">
                      D-{item.jobPostingResponse.dday}
                    </div>
                  )
                ) : (
                  <div
                    className={` ${getDisabledClass(item.jobPostingResponse.dday)}`}
                  >
                    마감
                  </div>
                )
              ) : (
                <div className="text-contents-neutral-secondary">상시</div>
              )}
              <span className="body-lg-medium">
                {item.jobPostingResponse.title}
              </span>
              <span
                className={`text-contents-neutral-secondary ${getDisabledClass(item.jobPostingResponse.dday)}`}
              >
                {item.jobPostingResponse.companyName}
              </span>
            </div>
            <button
              className="flex h-[40px] w-[40px] items-center justify-center"
              onClick={onBookmarkClick}
              aria-pressed={isBookmarked}
              aria-label={isBookmarked ? '북마크 해제' : '북마크'}
            >
              <Image
                src={
                  isBookmarked
                    ? '/icons/bookmark_selected.svg'
                    : '/icons/bookmark_unselected.svg'
                }
                alt=""
                width={24}
                height={24}
              />
            </button>
          </div>
          <div className="flex justify-between">
            <div>
              <span
                className={
                  getDisabledClass(item.jobPostingResponse.dday) ||
                  (item.memoContent
                    ? 'text-contents-primary-default'
                    : 'text-contents-state-unselected')
                }
              >
                {item.memoContent ? '메모 있음' : '메모 없음'}
              </span>
              <span className="text-contents-state-unselected">·</span>
              <span
                className={
                  getDisabledClass(item.jobPostingResponse.dday) ||
                  (docs
                    ? 'text-contents-primary-default'
                    : 'text-contents-state-unselected')
                }
              >
                {docs ? '서류 업로드' : '서류 미업로드'}
              </span>
            </div>
            <a
              href={`recruitment/${item.jobPostingResponse.postingId}`}
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
      </div>
      {expanded && (
        <div className="body-sm-medium md:body-md-medium flex flex-col gap-[8px]">
          <div className="bg-base-neutral-alternative hidden flex-col gap-[16px] rounded-[12px] px-[24px] py-[20px] md:flex">
            <div className="flex gap-[24px]">
              <span className="text-contents-neutral-tertiary min-w-[108px]">
                자격요건
              </span>
              <div className="text-contents-neutral-secondary w-full">
                {isHtml ? (
                  <div
                    className="text-contents-neutral-secondary"
                    dangerouslySetInnerHTML={{
                      __html: (
                        item.jobPostingResponse.qualification || '없음'
                      ).replace(/\n/g, ''),
                    }}
                  />
                ) : (
                  <div className="text-contents-neutral-secondary grid grid-cols-2 gap-y-2">
                    {item.jobPostingResponse.qualification
                      ? item.jobPostingResponse.qualification
                          .split('\n')
                          .map((line, idx) => <div key={idx}>{line}</div>)
                      : '없음'}
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-[24px]">
              <span className="text-contents-neutral-tertiary min-w-[108px]">
                우대사항
              </span>
              <div className="text-contents-neutral-secondary w-full">
                {isHtml ? (
                  <div
                    className="text-contents-neutral-secondary"
                    dangerouslySetInnerHTML={{
                      __html: (
                        item.jobPostingResponse.preferentialTreatment || '없음'
                      ).replace(/\n/g, ''),
                    }}
                  />
                ) : (
                  <div className="text-contents-neutral-secondary grid grid-cols-2 gap-y-2">
                    {item.jobPostingResponse.preferentialTreatment
                      ? item.jobPostingResponse.preferentialTreatment
                          .split('\n')
                          .map((line, idx) => <div key={idx}>{line}</div>)
                      : '없음'}
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-[24px]">
              <span className="w-[108px]"></span>
              <a
                href={`recruitment/${item.jobPostingResponse.postingId}`}
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
            <div className="flex flex-col gap-[4px] md:flex-row md:gap-[24px]">
              <span className="text-contents-neutral-tertiary w-[108px]">
                메모
              </span>
              <div className="text-contents-neutral-secondary">
                {item.memoContent || '없음'}
              </div>
            </div>
            <div className="flex flex-col gap-[16px] md:flex-row">
              <span className="text-contents-neutral-tertiary hidden md:block">
                이력서/포트폴리오
              </span>
              <div className="body-sm-semibold bg-base-neutral-default flex flex-1 flex-col gap-[12px] rounded-[12px] p-[16px] md:gap-[12px] md:px-[24px] md:py-[12px]">
                <div className="flex flex-col md:flex-row">
                  <span className="text-contents-neutral-primary w-[80px]">
                    이력서
                  </span>
                  <span className="text-contents-neutral-secondary body-sm-medium flex-1">
                    {item.fileResponse.originalFileName || '없음'}
                  </span>
                  <div className="flex justify-end gap-[16px] py-[5px] md:gap-[24px] md:py-0">
                    <button
                      className={`flex gap-[4px] ${!item.fileResponse.fileUrl ? 'text-contents-state-disabled' : 'text-contents-primary-accent cursor-pointer'}`}
                      disabled={!item.fileResponse.fileUrl}
                      onClick={() => {
                        if (item.fileResponse.fileUrl) {
                          window.open(item.fileResponse.fileUrl, '_blank');
                        }
                      }}
                    >
                      <Image
                        src={
                          item.fileResponse.fileUrl
                            ? '/icons/download.svg'
                            : '/icons/download_gray.svg'
                        }
                        width={20}
                        height={20}
                        alt="Download"
                      />
                      <span>내려받기</span>
                    </button>
                    <button
                      onClick={() => resumeInputRef.current?.click()}
                      className="text-contents-primary-accent flex cursor-pointer gap-[4px]"
                    >
                      <Image
                        src="/icons/upload.svg"
                        width={20}
                        height={20}
                        alt="Upload"
                      />
                      <span>
                        {item.fileResponse.fileUrl ? '재업로드' : '업로드'}
                      </span>
                    </button>
                    <input
                      type="file"
                      ref={resumeInputRef}
                      style={{ display: 'none' }}
                      onChange={(e) => handleFileUpload('RESUME', e)}
                    />
                  </div>
                </div>
                <div className="flex flex-col md:flex-row">
                  <span className="text-contents-neutral-primary w-[80px]">
                    포트폴리오
                  </span>
                  <span className="text-contents-neutral-secondary body-sm-medium flex-1">
                    {item.portfolioResponse.originalFileName || '없음'}
                  </span>
                  <div className="flex justify-end gap-[16px] py-[5px] md:gap-[24px] md:py-0">
                    <button
                      className={`flex gap-[4px] ${!item.portfolioResponse.fileUrl ? 'text-contents-state-disabled' : 'text-contents-primary-accent cursor-pointer'}`}
                      disabled={!item.portfolioResponse.fileUrl}
                      onClick={() => {
                        if (item.portfolioResponse.fileUrl) {
                          window.open(item.portfolioResponse.fileUrl, '_blank');
                        }
                      }}
                    >
                      <Image
                        src={
                          item.portfolioResponse.fileUrl
                            ? '/icons/download.svg'
                            : '/icons/download_gray.svg'
                        }
                        width={20}
                        height={20}
                        alt="Download"
                      />
                      <span>내려받기</span>
                    </button>
                    <button
                      onClick={() => portfolioInputRef.current?.click()}
                      className="text-contents-primary-accent flex cursor-pointer gap-[4px]"
                    >
                      <Image
                        src="/icons/upload.svg"
                        width={20}
                        height={20}
                        alt="Upload"
                      />
                      <span>
                        {item.portfolioResponse.fileUrl ? '재업로드' : '업로드'}
                      </span>
                    </button>
                    <input
                      type="file"
                      ref={portfolioInputRef}
                      style={{ display: 'none' }}
                      onChange={(e) => handleFileUpload('PORTFOLIO', e)}
                    />
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
