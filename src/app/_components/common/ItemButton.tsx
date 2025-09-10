import React from 'react';

type ItemButtonProps = {
  text: string;
  onClick: () => void;
  selected: boolean;
};

const ItemButton = ({ text, onClick, selected }: ItemButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`body-sm-medium md:body-sm-semibold flex h-[40px] items-center justify-center rounded-[8px] border px-[16px] ${
        selected
          ? 'bg-base-primary-alternative border-base-primary-border text-contents-primary-accent'
          : 'text-contents-neutral-tertiary border-base-neutral-border bg-white'
      }`}
    >
      {text}
    </button>
  );
};

export default ItemButton;
