'use client';
import Image from 'next/image';

type JobRemoveModalProps = {
  jobs: string[];
  onRemove: (job: string) => void;
  onConfirm: () => void;
  onClose: () => void;
};

export default function JobRemoveModal({
  jobs,
  onRemove,
  onConfirm,
  onClose,
}: JobRemoveModalProps) {
  return (
    <div
      className="fixed inset-0 z-200 mx-auto flex items-center justify-center bg-black/40 px-5 md:px-0"
      onClick={onClose}
    >
      <div
        className="bg-base-neutral-default w-[688px] rounded-[12px] p-6"
        onClick={(e) => e.stopPropagation()}
      >
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
            onClick={onConfirm}
            className="text-contents-primary-default body-sm-medium cursor-pointer underline"
          >
            원하지 않는 직무를 다 지웠어요
          </div>
        </div>

        <div className="mt-2 flex flex-wrap gap-[6px]">
          {jobs.map((job) => (
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
                onClick={() => onRemove(job)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
