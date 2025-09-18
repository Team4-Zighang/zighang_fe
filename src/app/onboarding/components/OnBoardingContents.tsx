'use client';
import React, { useState } from 'react';
import Dropdown, {
  finalSchoolOption,
  jobOptions,
  Option,
} from '@/app/_components/common/DropDown';
import OptionSelect, { regions } from '@/app/_components/common/OptionSelect';
import YearSlider from '@/app/_components/common/YearSlider';
import Button from '@/app/_components/common/Button';
import { useOnboardingMutation } from '@/hooks/mutation/useOnboardingMutation';
import { REGION_MAP } from '@/utils/regionMap';
import { YEAR_MAP } from '@/utils/yearMapping';
import SchoolDropDown from '@/app/_components/common/SchoolDropDown';
import LoginModal from '@/app/_components/common/LoginModal';
import JobRemoveModal from '@/app/_components/common/JobRemoveModal';
import { useMajorList } from '@/hooks/queries/useOnboarding';
import { SCHOOL_MAP } from '@/utils/schoolMap';
import { getToken } from '@/store/member';
import { useRouter } from 'next/navigation';
import { jobRoleMap } from '@/utils/jobRoleMap';
import { GetUser } from '@/app/_apis/user';

const OnBoardingContents = () => {
  const [formKey, setFormKey] = useState(0);

  const [jobList, setJobList] = useState<string[]>([]);
  const [tempList, setTempList] = useState<string[]>([]);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);

  const [selectedJobCategory, setSelectedJobCategory] = useState<Option | null>(
    null
  );
  const [selectedSchool, setSelectedSchool] = useState<Option | null>(null);
  const [selectedUniversity, setSelectedUniversity] = useState<string>('');
  const [careerYear, setCareerYear] = useState<string>('YEAR_0');
  const [selectedMajor, setSelectedMajor] = useState<Option | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string[]>([]);
  const [selectedJobRoles, setSelectedJobRoles] = useState<string[]>([]);
  const [loginModal, setLoginModal] = useState(false);

  const onboardingMutation = useOnboardingMutation();
  const router = useRouter();

  const mappedSchool = SCHOOL_MAP[selectedUniversity] || '';
  const { data: majorList } = useMajorList(mappedSchool);

  const majorOption: Option[] =
    majorList?.data?.map((m: string, idx: number) => ({
      id: idx,
      category: m,
    })) ?? [];

  const handleSelectJobCategory = (opt: Option) => {
    setSelectedJobCategory(opt);
    setJobList(jobRoleMap[opt.category] || []);
    setSelectedJobRoles([]);
  };

  const handleOpenModal = () => {
    setTempList(jobList.filter((j) => j !== '전체'));
    setIsRemoveModalOpen(true);
  };

  const removeJob = (job: string) => {
    setTempList((prev) => prev.filter((j) => j !== job));
  };

  const confirmJobs = () => {
    setJobList(['전체', ...tempList]);
    setSelectedJobRoles(tempList);
    setIsRemoveModalOpen(false);
  };

  const resetForm = () => {
    setJobList([]);
    setTempList([]);
    setIsRemoveModalOpen(false);
    setSelectedJobCategory(null);
    setSelectedSchool(null);
    setSelectedUniversity('');
    setCareerYear('YEAR_0');
    setSelectedMajor(null);
    setSelectedRegion([]);
    setSelectedJobRoles([]);
    setFormKey((prev) => prev + 1);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    if (isSubmitting) return;

    const mappedRegions = selectedRegion.map((r) => REGION_MAP[r] || r);
    const token = getToken();

    const onboardingPayload = {
      jobCategory: selectedJobCategory?.category || '',
      jobRole: selectedJobRoles,
      careerYear,
      region: mappedRegions,
      school: selectedUniversity,
      major: selectedMajor?.category || '',
    };

    if (!token) {
      sessionStorage.setItem(
        'pendingOnboarding',
        JSON.stringify(onboardingPayload)
      );
      setLoginModal(true);
      return;
    }

    setIsSubmitting(true);

    onboardingMutation.mutate(onboardingPayload, {
      onSuccess: async () => {
        try {
          const data = await GetUser();
          localStorage.setItem('memberInfo', JSON.stringify(data));
          router.push('/home');
          resetForm();
        } catch (err) {
          console.error('GetUser 실패:', err);
        } finally {
          setIsSubmitting(false);
        }
      },
      onError: (err) => {
        console.error('온보딩 제출 실패:', err);
        setIsSubmitting(false);
      },
    });
  };

  const isDisabled =
    !selectedJobCategory ||
    selectedJobRoles.length === 0 ||
    selectedRegion.length === 0 ||
    !selectedSchool ||
    !selectedUniversity ||
    !selectedMajor;

  return (
    <div
      key={formKey}
      className="mt-12 flex w-full max-w-[640px] flex-col gap-12"
    >
      <div className="flex flex-col items-start gap-2">
        <div className="text-contents-neutral-primary body-2xl-semibold">
          희망 직군
        </div>
        <Dropdown
          data={jobOptions}
          placeholder="검색어를 입력하세요"
          onSelect={handleSelectJobCategory}
        />
      </div>

      {selectedJobCategory && jobList.length > 0 && (
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
              className="text-contents-primary-default body-sm-medium cursor-pointer"
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
            isEnabled={selectedSchool?.category === '대학교'}
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

      <Button onClick={handleSubmit} disabled={isDisabled} />

      {loginModal && <LoginModal onClose={() => setLoginModal(false)} />}

      {isRemoveModalOpen && (
        <JobRemoveModal
          jobs={tempList}
          onRemove={removeJob}
          onConfirm={confirmJobs}
          onClose={() => setIsRemoveModalOpen(false)}
        />
      )}
    </div>
  );
};

export default OnBoardingContents;
