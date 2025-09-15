'use client';
import React, { useState } from 'react';
import Dropdown, {
  finalSchoolOption,
  jobOptions,
  majorOption,
  Option,
} from '@/app/_components/common/DropDown';
import OptionSelect, {
  jobs,
  regions,
} from '@/app/_components/common/OptionSelect';
import YearSlider from '@/app/_components/common/YearSlider';
import Image from 'next/image';
import Button from '@/app/_components/common/Button';
import { useOnboardingMutation } from '@/hooks/mutation/useOnboardingMutation';
import { REGION_MAP } from '@/utils/regionMap';
import { YEAR_MAP } from '@/utils/yearMapping';
import SchoolDropDown from '@/app/_components/common/SchoolDropDown';

const OnBoardingContents = () => {
  const [jobList] = useState(jobs);
  const [tempList, setTempList] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedJobCategory, setSelectedJobCategory] = useState<Option | null>(
    null
  );
  const [selectedSchool, setSelectedSchool] = useState<Option | null>(null);
  const [selectedUniversity, setSelectedUniversity] = useState<string>('');
  const [careerYear, setCareerYear] = useState<string>('YEAR_0');
  const [selectedMajor, setSelectedMajor] = useState<Option | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string[]>([]);
  const [selectedJobRoles, setSelectedJobRoles] = useState<string[]>([]);

  const onboardingMutation = useOnboardingMutation();

  const handleOpenModal = () => {
    setTempList(jobList.filter((j) => j !== '전체'));
    setIsModalOpen(true);
  };

  const removeJob = (job: string) => {
    setTempList((prev) => prev.filter((j) => j !== job));
  };

  const confirmJobs = () => {
    setSelectedJobRoles(tempList);
    setIsModalOpen(false);
  };

  const handleSubmit = () => {
    const mappedRegions = selectedRegion.map((r) => REGION_MAP[r] || r);

    onboardingMutation.mutate({
      jobCategory: selectedJobCategory?.category || '',
      jobRole: selectedJobRoles,
      careerYear,
      region: mappedRegions,
      school: selectedUniversity || '',
      major: selectedMajor?.category || '',
    });
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
          onSelect={(opt: Option) => setSelectedJobCategory(opt)}
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
              onClick={handleOpenModal}
              className="text-contents-primary-default body-sm-medium cursor-pointer underline"
            >
              아직 직무를 탐색중인가요?
            </div>
          </div>
          <OptionSelect
            options={jobList}
            onChange={(v) => setSelectedJobRoles(v)}
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
          onChange={(v) => setSelectedRegion(v)}
        />
      </div>

      <div className="flex flex-col items-start gap-2">
        <div className="text-contents-neutral-primary body-2xl-semibold">
          경력
        </div>
        <YearSlider onChange={(val) => setCareerYear(YEAR_MAP[val])} />
      </div>

      <div className="flex flex-col items-start gap-2">
        <div className="text-contents-neutral-primary body-2xl-semibold">
          최종 학력
        </div>
        <div className="flex w-full flex-row gap-[10px]">
          <div className="max-w-[128px]">
            <Dropdown
              data={finalSchoolOption}
              placeholder="학력"
              onSelect={(opt: Option) => setSelectedSchool(opt)}
            />
          </div>
          <SchoolDropDown
            placeholder="학교를 입력하세요"
            onSelect={(school) => setSelectedUniversity(school)}
          />
        </div>
      </div>

      {selectedSchool && (
        <div className="flex flex-col items-start gap-2">
          <div className="text-contents-neutral-primary body-2xl-semibold">
            전공
          </div>
          <Dropdown
            data={majorOption}
            placeholder="전공을 입력하세요"
            onSelect={(opt: Option) => setSelectedMajor(opt)}
          />
        </div>
      )}

      <Button onClick={handleSubmit} />

      {/* 모달 확인 후 수정 예정*/}
      {isModalOpen && (
        <div className="fixed inset-0 z-200 mx-auto flex items-center justify-center bg-black/40 px-5 md:px-0">
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
                  className="border-base-neutral-border text-contents-neutral-tertiary body-sm-medium flex cursor-pointer items-center rounded-[8px] border py-[10px] pr-3 pl-4"
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
