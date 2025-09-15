'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

export const jobOptions = [
  { id: 1, category: 'IT·개발', name: '크로스 플랫폼 / 시스템·네트워크' },
  { id: 2, category: '미디어·엔터', name: '크리에이터·인플루언서' },
  { id: 3, category: '게임', name: '테크니컬 아티스트' },
  { id: 4, category: '게임', name: '클라이언트 개발자' },
  { id: 5, category: '게임', name: '서버 개발자' },
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
        <ul className="border-base-neutral-border bg-base-neutral-default shadow-modal absolute z-10 mt-1 w-full overflow-auto rounded-[12px] border p-1">
          {filteredData.slice(0, maxItems).map((item) => (
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
