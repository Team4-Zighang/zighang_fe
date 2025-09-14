import React from 'react';

type ButtonProps = {
  onClick?: () => void;
};

const Button = ({ onClick }: ButtonProps) => {
  return (
    <div className="flex w-full items-center justify-center">
      <button
        onClick={onClick}
        className="bg-base-primary-default text-contents-state-inverse body-2xl-semibold flex w-full cursor-pointer items-center justify-center rounded-[12px] py-4"
      >
        다음
      </button>
    </div>
  );
};

export default Button;
