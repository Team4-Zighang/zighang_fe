'use client';
import Dropdown, {
  finalSchoolOption,
  jobOptions,
  Option,
  universityOption,
} from '@/app/_components/common/DropDown';
import OptionSelect, {
  jobs,
  regions,
} from '@/app/_components/common/OptionSelect';
import YearSlider from '@/app/_components/common/YearSlider';
import React from 'react';

const OnBoardingContents = () => {
  return (
    <div className="mt-12 flex w-full max-w-[640px] flex-col gap-12">
      <div className="flex flex-col items-start gap-2">
        <div className="text-contents-neutral-primary body-2xl-semibold">
          희망 직군
        </div>

        <Dropdown
          data={jobOptions}
          placeholder="검색어를 입력하세요"
          onSelect={(opt: Option) => {
            console.log('선택됨:', opt.id, opt.category, opt.name);
          }}
        />
      </div>

      <div className="flex flex-col items-start gap-2">
        <div className="flex w-full flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-2">
            <div className="text-contents-neutral-primary body-2xl-semibold">
              희망 직무
            </div>
            <div className="text-contents-neutral-tertiary caption-md-medium">
              중복 선택 가능
            </div>
          </div>

          <div className="text-contents-primary-default body-sm-medium cursor-pointer underline">
            {' '}
            아직 직무를 탐색중인가요?
          </div>
        </div>
        <OptionSelect
          options={jobs}
          onChange={(v) => console.log('선택 지역:', v)}
        />
      </div>

      <div className="flex flex-col items-start gap-2">
        <div className="flex flex-row items-center justify-between gap-2">
          <div className="text-contents-neutral-primary body-2xl-semibold">
            근무 희망 지역
          </div>
          <div className="text-contents-neutral-tertiary caption-md-medium">
            중복 선택 가능
          </div>
        </div>
        <OptionSelect
          options={regions}
          onChange={(v) => console.log('선택 지역:', v)}
        />
      </div>

      <div className="flex flex-col items-start gap-2">
        <div className="text-contents-neutral-primary body-2xl-semibold">
          경력
        </div>

        <YearSlider />
      </div>

      <div className="flex flex-col items-start gap-2">
        <div className="text-contents-neutral-primary body-2xl-semibold">
          최종 학력
        </div>

        <div className="flex w-full flex-row gap-[10px]">
          <div>
            <Dropdown
              data={finalSchoolOption}
              placeholder="대학교"
              maxItems={5}
              onSelect={(opt: Option) => {
                console.log('선택됨:', opt.id, opt.category, opt.name);
              }}
            />
          </div>

          <Dropdown
            data={universityOption}
            placeholder="학교를 입력하세요"
            onSelect={(opt: Option) => {
              console.log('선택됨:', opt.id, opt.category, opt.name);
            }}
          />
        </div>
      </div>

      <div className="flex flex-col items-start gap-2">
        <div className="text-contents-neutral-primary body-2xl-semibold">
          전공
        </div>

        <Dropdown
          data={jobOptions}
          placeholder="전공을 입력하세요"
          onSelect={(opt: Option) => {
            console.log('선택됨:', opt.id, opt.category, opt.name);
          }}
        />
      </div>
    </div>
  );
};

export default OnBoardingContents;
