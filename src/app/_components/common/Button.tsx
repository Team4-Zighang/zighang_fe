import React from 'react';

type ButtonProps = {
  onClick?: () => void;
  disabled?: boolean;
};

const Button = ({ onClick, disabled }: ButtonProps) => {
  return (
    <div className="flex w-full items-center justify-center">
      <button
        onClick={onClick}
        disabled={disabled}
        className={`body-2xl-semibold flex w-full items-center justify-center rounded-[12px] py-4 ${
          disabled
            ? 'bg-base-neutral-border text-contents-neutral-tertiary cursor-not-allowed'
            : 'bg-base-primary-default text-contents-state-inverse cursor-pointer'
        }`}
      >
        다음
      </button>
    </div>
  );
};

export default Button;
