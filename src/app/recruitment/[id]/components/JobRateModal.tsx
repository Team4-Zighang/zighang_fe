import ItemButton from '@/app/_components/common/ItemButton';
import Image from 'next/image';
import React, { useState } from 'react';

const STEP_OPTIONS = [
  '서류 탈락',
  '서류 합격',
  '1차 면접',
  '2차 면접',
  '최종 면접',
  '최종 합격',
];

const JobRateModal = () => {
  const [comment, setComment] = useState('');
  const [selectedStep, setSelectedStep] = useState<string>('');
  const [star, setStar] = useState(0);

  const handleComplete = () => {
    // 내용 제출
  };

  return (
    <div className="flex h-full flex-col md:h-auto">
      <div className="border-base-neutral-border flex h-[56px] w-full justify-end border bg-white px-[20px] py-[16px] md:hidden">
        <Image
          src="/icons/x_button_round.svg"
          alt="close"
          width={24}
          height={24}
        />
      </div>
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex h-full flex-col justify-center gap-[20px] bg-white p-[24px] md:h-auto md:w-[560px] md:rounded-[16px]"
      >
        <div className="flex flex-col items-center gap-[8px]">
          <span className="heading-md-semibold">공고 평가하기</span>
          <div className="flex gap-[4px]">
            {[...Array(5)].map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setStar(i + 1)}
                className="cursor-pointer border-none bg-transparent p-0"
              >
                <Image
                  src={i < star ? '/icons/star_filled.svg' : '/icons/star.svg'}
                  alt={i < star ? 'star_filled' : 'star'}
                  width={32}
                  height={32}
                />
              </button>
            ))}
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="공고에 대해 말해주세요!"
            className="border-base-primary-border bg-base-neutral-alternative placeholder:text-contents-state-unselected body-sm-medium h-[168px] w-full rounded-[8px] border p-[12px] outline-none"
          ></textarea>
        </div>
        <div className="flex flex-col gap-[8px]">
          <span className="body-lg-semibold">어디까지 진행되셨나요?</span>
          <div className="flex flex-wrap gap-[6px]">
            {STEP_OPTIONS.map((step) => (
              <ItemButton
                key={step}
                size="xs"
                selected={selectedStep === step}
                onClick={() => setSelectedStep(step)}
                text={step}
              />
            ))}
          </div>
        </div>
        <button
          className={`body-lg-semibold h-[52px] w-full rounded-[8px] text-white ${
            !comment.trim() || !selectedStep
              ? 'bg-contents-state-disabled'
              : 'bg-base-primary-default cursor-pointer'
          }`}
          onClick={handleComplete}
          disabled={!comment.trim() || !selectedStep}
        >
          평가 완료
        </button>
        <div className="flex flex-col items-center">
          <span className="caption-md-medium text-contents-neutral-tertiary text-center">
            허위, 중복, 저작권 침해, 성의없는 내용을 작성할 경우, 서비스 이용이
            제한될 수 있습니다.
          </span>
          <div className="flex">
            <span className="caption-md-semibold text-center text-red-500">
              수정 및 삭제가 불가능
            </span>
            <span className="caption-md-medium text-contents-neutral-tertiary text-center">
              하므로 신중히 작성해주세요.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobRateModal;
