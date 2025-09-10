import ItemButton from '@/app/_components/common/ItemButton';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import CareerSlider from './CareerSlider';

export const FILTER_OPTIONS = {
  task: ['직무1', '직무2', '직무3', '직무4'],
  hireType: [
    '전체',
    '공개채용',
    '전환형 인턴',
    '체험형 인턴',
    '정규직',
    '계약직',
    '산업기능요원',
    '전문연구요원',
  ],
  education: ['전체', '학력무관', '고졸', '초대졸', '학사', '석사', '박사'],
  region: [
    '전체',
    '서울',
    '경기',
    '인천',
    '부산',
    '대구',
    '광주',
    '대전',
    '울산',
    '세종',
    '강원',
    '경남',
    '경북',
    '전남',
    '전북',
    '충남',
    '충북',
    '제주',
  ],
  deadlineType: ['전체', '마감기한 있음', '상시채용', '채용시 마감'],
} as const;

export type FilterKey = keyof typeof FILTER_OPTIONS;

type DesktopFilterModalProps = {
  title?: string;
  onClose: () => void;
  onApply: (next: Record<string, string[]>) => void; // 적용 눌렀을 때 부모로 반영
  open: boolean;
  selected: Record<string, string[]>; // 부모가 가진 현재 선택 상태
  careerMin: number;
  careerMax: number;
  setCareerMin: (v: number) => void;
  setCareerMax: (v: number) => void;
};

export default function BookmarkFilterModal({
  onClose,
  onApply,
  open,
  selected,
  careerMin,
  careerMax,
  setCareerMin,
  setCareerMax,
}: DesktopFilterModalProps) {
  const [localSelected, setLocalSelected] = useState<Record<string, string[]>>(
    {}
  );

  // 현재 상태 동기화
  useEffect(() => {
    if (open) setLocalSelected(selected);
  }, [open, selected]);

  if (!open) return null;

  const toggleOne = (key: FilterKey, value: string) => {
    const allOptions = FILTER_OPTIONS[key];
    const exceptAll = allOptions.filter((o) => o !== '전체');
    const current = new Set(localSelected[key] ?? []);

    if (value === '전체') {
      setLocalSelected((prev) => ({ ...prev, [key]: exceptAll }));
      return;
    }

    // 개별 토글
    if (current.has(value)) current.delete(value);
    else current.add(value);

    setLocalSelected((prev) => ({
      ...prev,
      [key]: Array.from(current),
    }));
  };

  const isSelected = (key: FilterKey, value: string) => {
    if (value === '전체') return isAllSelected(key);
    const arr = localSelected[key] ?? [];
    return arr.includes(value);
  };

  const isAllSelected = (key: FilterKey) => {
    const opts = FILTER_OPTIONS[key];
    const cur = localSelected[key] ?? [];
    const allExceptAll = opts.filter((o) => o !== '전체');
    return (
      allExceptAll.length > 0 && allExceptAll.every((o) => cur.includes(o))
    );
  };

  const handleApply = () => {
    onApply(localSelected);
    onClose();
  };

  const Section = ({
    title,
    note,
    children,
  }: {
    title: string;
    note?: string;
    children: React.ReactNode;
  }) => (
    <div className="flex flex-col gap-[8px]">
      <div className="flex items-center gap-[8px]">
        <span className="body-2xl-semibold text-contents-neutral-primary">
          {title}
        </span>
        {note && (
          <span className="caption-md-medium text-contents-neutral-tertiary">
            {note}
          </span>
        )}
      </div>
      {children}
    </div>
  );

  return (
    <div
      className="fixed inset-0 z-[2000] flex h-screen items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="relative grid h-full w-full grid-rows-[auto,1fr,auto] overflow-hidden bg-white md:h-[480px] md:w-[560px] md:rounded-[16px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-base-neutral-border relative flex items-center justify-center border-b-[1px] py-[16px]">
          <span className="body-2xl-bold">필터</span>
          <button
            type="button"
            aria-label="close"
            onClick={onClose}
            className="absolute right-[20px] cursor-pointer"
          >
            <Image
              src="/icons/x_button.svg"
              alt="닫기"
              width={24}
              height={24}
            />
          </button>
        </div>
        <div className="body-2xl-semibold text-contents-neutral-primary flex min-h-0 flex-1 flex-col gap-[40px] overflow-y-auto p-[20px] md:max-h-[320px]">
          {/* 직군 - 드롭다운 적용 */}
          <Section title="직군">
            <button
              className="bg-base-neutral-input border-base-neutral-border flex w-full items-center justify-between gap-[10px] rounded-[8px] border px-[16px] py-[12px]"
              disabled
              title="준비중"
            >
              <span className="body-lg-medium text-contents-neutral-primary">
                전체
              </span>
              <Image
                src="/icons/arrow_under.svg"
                width={24}
                height={24}
                alt="dropdown"
              />
            </button>
          </Section>

          {/* 직무 */}
          <Section title="직무" note="중복 선택 가능">
            <div className="flex flex-wrap gap-[6px]">
              <ItemButton
                text="전체"
                selected={isAllSelected('task')}
                onClick={() => toggleOne('task', '전체')}
              />
              {FILTER_OPTIONS.task.map((opt) => (
                <ItemButton
                  key={opt}
                  text={opt}
                  selected={isSelected('task', opt)}
                  onClick={() => toggleOne('task', opt)}
                />
              ))}
            </div>
          </Section>

          {/* 채용유형 */}
          <Section title="채용유형" note="중복 선택 가능">
            <div className="flex flex-wrap gap-[6px]">
              <ItemButton
                text="전체"
                selected={isAllSelected('hireType')}
                onClick={() => toggleOne('hireType', '전체')}
              />
              {FILTER_OPTIONS.hireType
                .filter((o) => o !== '전체')
                .map((opt) => (
                  <ItemButton
                    key={opt}
                    text={opt}
                    selected={isSelected('hireType', opt)}
                    onClick={() => toggleOne('hireType', opt)}
                  />
                ))}
            </div>
          </Section>

          {/* 학력조건 */}
          <Section title="학력 조건" note="중복 선택 가능">
            <div className="flex flex-wrap gap-[6px]">
              <ItemButton
                text="전체"
                selected={isAllSelected('education')}
                onClick={() => toggleOne('education', '전체')}
              />
              {FILTER_OPTIONS.education
                .filter((o) => o !== '전체')
                .map((opt) => (
                  <ItemButton
                    key={opt}
                    text={opt}
                    selected={isSelected('education', opt)}
                    onClick={() => toggleOne('education', opt)}
                  />
                ))}
            </div>
          </Section>

          {/* 지역 */}
          <Section title="지역" note="중복 선택 가능">
            <div className="flex flex-wrap gap-[6px]">
              <ItemButton
                text="전체"
                selected={isAllSelected('region')}
                onClick={() => toggleOne('region', '전체')}
              />
              {FILTER_OPTIONS.region
                .filter((o) => o !== '전체')
                .map((opt) => (
                  <ItemButton
                    key={opt}
                    text={opt}
                    selected={isSelected('region', opt)}
                    onClick={() => toggleOne('region', opt)}
                  />
                ))}
            </div>
          </Section>

          {/* 마감유형 */}
          <Section title="마감 유형" note="중복 선택 가능">
            <div className="flex flex-wrap gap-[6px]">
              <ItemButton
                text="전체"
                selected={isAllSelected('deadlineType')}
                onClick={() => toggleOne('deadlineType', '전체')}
              />
              {FILTER_OPTIONS.deadlineType
                .filter((o) => o !== '전체')
                .map((opt) => (
                  <ItemButton
                    key={opt}
                    text={opt}
                    selected={isSelected('deadlineType', opt)}
                    onClick={() => toggleOne('deadlineType', opt)}
                  />
                ))}
            </div>
          </Section>

          {/* 경력조건 */}
          <Section title="경력 조건">
            <CareerSlider
              minValue={careerMin}
              maxValue={careerMax}
              onCommit={(min, max) => {
                setCareerMin(min);
                setCareerMax(max);
              }}
            />
          </Section>
        </div>

        <div className="border-base-neutral-border flex gap-[20px] border-t px-[20px] py-[16px]">
          <button
            type="button"
            className="border-base-neutral-border flex gap-[8px] rounded-[8px] border px-[20px] py-[16px]"
            onClick={() => {
              setLocalSelected({});
              setCareerMin(0);
              setCareerMax(10);
            }}
          >
            <Image
              src="/icons/refresh_2.svg"
              width={16}
              height={16}
              alt="reset"
            />
            <span className="body-lg-bold">초기화</span>
          </button>
          <button
            type="button"
            className="body-lg-bold bg-base-primary-default flex-1 rounded-[8px] px-[20px] py-[16px] text-white"
            onClick={handleApply}
          >
            00개 공고 보기
          </button>
        </div>
      </div>
    </div>
  );
}
