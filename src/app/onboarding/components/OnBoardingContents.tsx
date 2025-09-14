'use client';
import React, { useState } from 'react';
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
import Image from 'next/image';
import Button from '@/app/_components/common/Button';

const OnBoardingContents = () => {
  const [jobList, setJobList] = useState(jobs.filter((j) => j !== '전체'));
  const [tempList, setTempList] = useState(jobList);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJobCategory, setSelectedJobCategory] = useState<Option | null>(
    null
  );
  const [selectedSchool, setSelectedSchool] = useState<Option | null>(null);

  const removeJob = (job: string) => {
    setTempList((prev) => prev.filter((j) => j !== job));
  };

  const confirmJobs = () => {
    setJobList(tempList);
    setIsModalOpen(false);
  };

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
            setSelectedJobCategory(opt);
            console.log('희망 직군 선택:', opt);
          }}
        />
      </div>

      {selectedJobCategory && (
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
            <div
              onClick={() => {
                setTempList(jobList);
                setIsModalOpen(true);
              }}
              className="text-contents-primary-default body-sm-medium cursor-pointer underline"
            >
              아직 직무를 탐색중인가요?
            </div>
          </div>
          <OptionSelect
            options={jobList}
            onChange={(v) => console.log('선택 직무:', v)}
          />
        </div>
      )}

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
          <Dropdown
            data={finalSchoolOption}
            placeholder="대학교"
            onSelect={(opt: Option) => {
              setSelectedSchool(opt);
              console.log('최종 학력 선택:', opt);
            }}
          />
          <Dropdown
            data={universityOption}
            placeholder="학교를 입력하세요"
            onSelect={(opt: Option) => {
              console.log('학교 선택:', opt);
            }}
          />
        </div>
      </div>

      {selectedSchool && (
        <div className="flex flex-col items-start gap-2">
          <div className="text-contents-neutral-primary body-2xl-semibold">
            전공
          </div>
          <Dropdown
            data={jobOptions}
            placeholder="전공을 입력하세요"
            onSelect={(opt: Option) => {
              console.log('전공 선택:', opt);
            }}
          />
        </div>
      )}

      <Button />

      {isModalOpen && (
        <div className="fixed inset-0 z-200 flex items-center justify-center bg-black/40">
          <div className="bg-base-neutral-default w-[688px] rounded-[12px] p-6">
            <div className="flex w-full flex-row items-center justify-between">
              <div className="flex flex-row items-center gap-2">
                <div className="text-contents-neutral-primary body-2xl-semibold">
                  희망하지 않는 직무를 지워보세요!
                </div>
                <div className="text-contents-neutral-tertiary caption-md-medium">
                  중복 선택 가능
                </div>
              </div>
              <div
                onClick={confirmJobs}
                className="text-contents-primary-default body-sm-medium cursor-pointer underline"
              >
                원하지 않는 직무를 다 지웠어요
              </div>
            </div>

            <div className="mt-2 flex flex-wrap gap-[6px]">
              {tempList.map((job) => (
                <div
                  key={job}
                  className="border-base-neutral-border text-contents-neutral-tertiary body-sm-medium flex items-center rounded-[8px] border py-[10px] pr-3 pl-4"
                >
                  {job}
                  <Image
                    src="/icons/x_button_gray.svg"
                    alt="삭제아이콘"
                    width={20}
                    height={20}
                    className="h-5 w-5 cursor-pointer"
                    onClick={() => removeJob(job)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OnBoardingContents;
