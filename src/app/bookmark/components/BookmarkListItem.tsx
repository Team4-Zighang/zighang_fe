import { BookmarkItem } from '@/app/_apis/schemas/bookmarkResponse';
import Image from 'next/image';

type Props = {
  item: BookmarkItem;
  expanded?: boolean;
  selected?: boolean;
  bookmarked?: boolean;
  onToggleSelect?: () => void;
  onToggleExpand?: () => void;
  onBookmarkSelect?: () => void;
};

function isClosed(dday: number | null) {
  return dday === 0; // 0이면 마감
}

function getDisabledClass(dday: number | null) {
  return isClosed(dday) ? 'text-contents-state-disabled' : '';
}

const BookmarkListItem = ({
  item,
  expanded,
  selected,
  bookmarked = true,
  onToggleSelect,
  onToggleExpand,
  onBookmarkSelect,
}: Props) => {
  const docs =
    !!item.fileResponse?.fileUrl || !!item.portfolioResponse?.fileUrl;

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
        <span className="w-[200px] px-[12px]">
          {item.jobPostingResponse.title}
        </span>
        <span className="w-[128px] px-[12px]">
          {item.jobPostingResponse.companyName}
        </span>
        <span className="flex-1 overflow-hidden px-[12px] text-ellipsis whitespace-nowrap">
          {item.jobPostingResponse.qualification || '없음'}
        </span>
        <span className="flex-1 overflow-hidden px-[12px] text-ellipsis whitespace-nowrap">
          {item.jobPostingResponse.preferentialTreatment || '없음'}
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
                <div
                  className={`${item.jobPostingResponse.dday <= 5 ? 'text-red-500' : 'text-contents-neutral-secondary'}`}
                >
                  D{item.jobPostingResponse.dday}
                </div>
              ) : (
                <div
                  className={`text-contents-neutral-secondary ${getDisabledClass(item.jobPostingResponse.dday)}`}
                >
                  {item.jobPostingResponse.dday}
                </div>
              )}
              <span className="body-lg-medium">
                {item.jobPostingResponse.title}
              </span>
              <span
                className={
                  item.jobPostingResponse.dday === 0
                    ? 'text-contents-state-disabled'
                    : 'text-contents-neutral-secondary'
                }
              >
                {item.jobPostingResponse.companyName}
              </span>
            </div>
            <button
              className="flex h-[40px] w-[40px] items-center justify-center"
              onClick={(e) => {
                e.stopPropagation();
                onBookmarkSelect?.();
              }}
            >
              <Image
                src={
                  bookmarked
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
              <div className="text-contents-neutral-secondary">
                {item.jobPostingResponse.qualification || '없음'}
              </div>
            </div>
            <div className="flex gap-[24px]">
              <span className="text-contents-neutral-tertiary min-w-[108px]">
                우대사항
              </span>
              <div className="text-contents-neutral-secondary">
                {item.jobPostingResponse.preferentialTreatment || '없음'}
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
                  <div className="flex gap-[16px] py-[5px] md:gap-[24px] md:py-0">
                    <button
                      className={`flex gap-[4px] ${!item.fileResponse.fileUrl ? 'text-contents-state-disabled' : 'text-contents-primary-accent cursor-pointer'}`}
                      disabled={!item.fileResponse.fileUrl}
                      onClick={() => {}}
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
                <div className="flex flex-col md:flex-row">
                  <span className="text-contents-neutral-primary w-[80px]">
                    포트폴리오
                  </span>
                  <span className="text-contents-neutral-secondary body-sm-medium flex-1">
                    {item.portfolioResponse.originalFileName || '없음'}
                  </span>
                  <div className="flex gap-[16px] py-[5px] md:gap-[24px] md:py-0">
                    <button
                      className={`flex gap-[4px] ${!item.portfolioResponse.fileUrl ? 'text-contents-state-disabled' : 'text-contents-primary-accent cursor-pointer'}`}
                      disabled={!item.portfolioResponse.fileUrl}
                      onClick={() => {}}
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
