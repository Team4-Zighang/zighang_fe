type ToggleProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
};

export function Toggle({ checked, onChange, label }: ToggleProps) {
  return (
    <div className="flex items-center gap-[8px]">
      <span className="body-lg-medium text-contents-neutral-secondary">
        {label}
      </span>
      <label className="inline-flex cursor-pointer items-center">
        <input
          type="checkbox"
          value=""
          className="peer sr-only"
          checked={checked}
          onChange={() => onChange(!checked)}
        />
        <div className="peer border-base-neutral-border bg-base-neutral-alternative after:border-contents-state-inverse relative h-[24px] w-[40px] rounded-full border-[1px] peer-checked:bg-[#7951FF] after:absolute after:start-[4px] after:top-1/2 after:h-[16px] after:w-[16px] after:translate-y-[-50%] after:rounded-full after:border after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-[15px] peer-checked:after:border-white rtl:peer-checked:after:-translate-x-[16px]" />
      </label>
    </div>
  );
}
