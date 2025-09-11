import React from 'react';

type ItemButtonProps = {
  text: string;
  onClick: () => void;
  selected: boolean;
  size?: 'xs';
};

const ItemButton = ({ text, onClick, selected, size }: ItemButtonProps) => {
  const paddingX = size === 'xs' ? 'px-[12px]' : 'px-[16px]';
  return (
    <button
      onClick={onClick}
      className={`body-sm-medium md:body-sm-semibold flex h-[40px] cursor-pointer items-center justify-center rounded-[8px] border ${paddingX} ${
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
