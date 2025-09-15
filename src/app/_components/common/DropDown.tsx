'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

export const jobOptions = [
  { id: 1, category: 'IT·개발' },
  { id: 2, category: '미디어·엔터' },
  { id: 3, category: 'AI·데이터' },
  { id: 4, category: '게임' },
  { id: 5, category: '디자인' },
  { id: 6, category: '기획·전략' },
  { id: 7, category: '마케팅·광고' },
  { id: 8, category: '상품기획·MD' },
  { id: 9, category: '영업' },
  { id: 10, category: '무역·물류' },
  { id: 11, category: '운송·배송' },
  { id: 12, category: '법률·법무' },
  { id: 13, category: 'HR·총무' },
  { id: 14, category: '회계·재무·세무' },
  { id: 15, category: '증권·운용' },
  { id: 16, category: '은행·카드·보험' },
  { id: 17, category: '엔지니어링·R&D' },
  { id: 18, category: '건설·건축' },
  { id: 19, category: '생산·기능직' },
  { id: 20, category: '의료·보건' },
  { id: 21, category: '공공·복지' },
  { id: 22, category: '교육' },
  { id: 23, category: '고객상담·TM' },
  { id: 24, category: '서비스' },
  { id: 25, category: '식음료' },
];

export const finalSchoolOption = [
  { id: 1, category: '고등학교' },
  { id: 2, category: '대학교' },
  { id: 3, category: '석사' },
  { id: 4, category: '박사' },
  { id: 5, category: '석박 통합과정' },
];

export const majorOption = [
  { id: 1, category: '컴퓨터공학과' },
  { id: 2, category: '소프트웨어학부' },
];

export type Option = {
  id: number | string;
  category: string;
  name?: string;
};

type Props = {
  data: Option[];
  placeholder?: string;
  onSelect?: (option: Option) => void;
  maxItems?: number;
};

const Dropdown = ({
  data,
  placeholder = '검색어를 입력하세요',
  onSelect,
  maxItems = 3,
}: Props) => {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Option | null>(null);
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const filteredData =
    query === ''
      ? data
      : data.filter(
          (item) =>
            item.category.toLowerCase().includes(query.toLowerCase()) ||
            item.name?.toLowerCase().includes(query.toLowerCase())
        );

  useEffect(() => {
    function handleClickOutside(e: MouseEvent | TouchEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div className="relative" onClick={() => setOpen(true)}>
        <input
          type="text"
          value={selected ? selected.category : query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelected(null);
            setOpen(true);
          }}
          placeholder={placeholder}
          className="border-base-neutral-border text-contents-neutral-primary body-lg-medium focus:ring-base-neutral-border w-full rounded-[12px] border p-4 focus:ring-1 focus:outline-none"
        />
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="absolute inset-y-0 right-4 flex cursor-pointer items-center"
        >
          <Image
            src="/icons/arrow_under.svg"
            width={24}
            height={24}
            alt="dropdown"
          />
        </button>
      </div>
      {open && filteredData.length > 0 && (
        <ul className="border-base-neutral-border bg-base-neutral-default shadow-modal absolute z-10 mt-1 max-h-[155px] w-full overflow-y-auto rounded-[12px] border p-1">
          {filteredData.map((item) => (
            <li
              key={item.id}
              onClick={() => {
                setSelected(item);
                setQuery('');
                setOpen(false);
                onSelect?.(item);
              }}
              className="hover:bg-base-neutral-alternative cursor-pointer rounded-[12px] px-4 py-3"
            >
              <div className="text-contents-neutral-primary body-lg-semibold">
                {item.category}
              </div>
              {item.name && (
                <div className="text-contents-neutral-secondary caption-md-medium">
                  {item.name}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
