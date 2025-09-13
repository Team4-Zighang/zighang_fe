'use client';

import { useScrap } from '@/hooks/queries/useCard';

type ScrapBubbleProps = {
  onClose?: () => void;
  className?: string;
};

const ScrapBubble = ({ onClose, className = '' }: ScrapBubbleProps) => {
  const { data: scrapcard } = useScrap();
  return (
    <div className={`${className}`} onClick={(e) => e.stopPropagation()}>
      {/* 데스크탑 */}
      <div className="absolute top-8 -right-[150px] z-50 mt-[6px] hidden md:block">
        <div className="bg-base-neutral-default relative w-[320px] rounded-[12px] px-3 pt-4 pb-3 shadow-[0_0_16px_0_rgba(0,0,0,0.10)]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 18 14"
            width="18"
            height="14"
            className="absolute -top-[14px] left-1/2 -translate-x-1/2"
          >
            <path d="M0 14L9 0L18 14H0Z" fill="white" />
          </svg>

          <div className="body-lg-semibold text-contents-neutral-primary mb-1 text-center">
            공고 스크랩하고 카드 다시 뽑기
          </div>

          <div className="text-contents-neutral-secondary body-sm-medium text-center">
            공고 3개를 저장하면 새 카드를 뽑을 수 있어요
            <br />
            지금까지{' '}
            <span className="text-contents-primary-default body-sm-medium">
              3개 중 {scrapcard?.scrapCount}개
            </span>
            를 저장했어요
          </div>

          <button
            type="button"
            className="bg-base-primary-default text-base-neutral-default body-sm-semibold mt-4 w-full cursor-pointer rounded-[8px] py-3"
            onClick={onClose}
          >
            맞춤 공고 보러가기
          </button>
        </div>
      </div>

      {/* 모바일 */}
      <div className="fixed inset-0 z-[1000] bg-black/40 md:hidden">
        <div className="absolute right-0 bottom-0 left-0 w-full px-4 pb-6">
          <div className="rounded-[12px] bg-white px-3 pt-4 pb-3 shadow-[0_0_16px_0_rgba(0,0,0,0.10)]">
            <div className="body-lg-semibold text-contents-neutral-primary mb-1 text-center">
              공고 스크랩하고 카드 다시 뽑기
            </div>

            <div className="text-contents-neutral-secondary body-sm-medium text-center">
              공고 3개를 저장하면 새 카드를 뽑을 수 있어요
              <br />
              지금까지{' '}
              <span className="text-contents-primary-default body-sm-medium">
                3개 중 {scrapcard?.scrapCount}개
              </span>
              를 저장했어요
            </div>

            <button
              type="button"
              className="bg-base-primary-default text-base-neutral-default body-sm-semibold mt-4 w-full cursor-pointer rounded-[8px] py-3"
              onClick={onClose}
            >
              맞춤 공고 보러가기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrapBubble;
