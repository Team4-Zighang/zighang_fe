'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useSchoolList } from '@/hooks/queries/useOnboarding';

type Props = {
  placeholder?: string;
  onSelect?: (school: string) => void;
  isEnabled: boolean;
};

const SchoolDropdown = ({
  placeholder = '학교를 입력하세요',
  onSelect,
  isEnabled,
}: Props) => {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<string>('');
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { data: schoolResponse } = useSchoolList(isEnabled);
  const schoolOptions: string[] = schoolResponse?.data ?? [];

  const filteredData =
    query === ''
      ? schoolOptions
      : schoolOptions.filter((school) =>
          school.toLowerCase().includes(query.toLowerCase())
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
      <div className="relative" onClick={() => isEnabled && setOpen(true)}>
        <input
          type="text"
          value={selected || query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelected('');
            if (isEnabled) setOpen(true);
          }}
          placeholder={placeholder}
          disabled={!isEnabled}
          className="border-base-neutral-border text-contents-neutral-primary body-lg-medium focus:ring-base-neutral-border disabled:bg-base-neutral-alternative w-full rounded-[12px] border p-4 focus:ring-1 focus:outline-none disabled:cursor-not-allowed"
        />
        <button
          type="button"
          onClick={() => isEnabled && setOpen((prev) => !prev)}
          className="absolute inset-y-0 right-4 flex cursor-pointer items-center"
          disabled={!isEnabled}
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
        <ul className="border-base-neutral-border bg-base-neutral-default shadow-modal absolute z-10 mt-1 max-h-[152px] w-full overflow-auto rounded-[12px] border p-1">
          {filteredData.map((school, idx) => (
            <li
              key={idx}
              onClick={() => {
                setSelected(school);
                setQuery('');
                setOpen(false);
                onSelect?.(school);
              }}
              className="hover:bg-base-neutral-alternative cursor-pointer rounded-[12px] px-4 py-3"
            >
              <div className="text-contents-neutral-primary body-lg-semibold">
                {school}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SchoolDropdown;
