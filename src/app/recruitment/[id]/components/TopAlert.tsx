import Image from 'next/image';

type TopAlertProps = {
  message: string;
  onClose: () => void;
};

const TopAlert = ({ message, onClose }: TopAlertProps) => (
  <div className="fixed top-15 -right-50 z-9999 flex w-[320px] -translate-x-1/2 flex-col items-center">
    <Image
      src="/icons/polygon_2.svg"
      alt=""
      width={18}
      height={9}
      className=""
    />
    <div className="bg-contents-neutral-primary flex gap-[8px] rounded-[8px] py-[12px] pr-[12px] pl-[16px]">
      <div className="text-contents-state-inverse body-md-semibold">
        {message}가 추가됐어요!
      </div>
      <button onClick={onClose}>
        <Image
          src="/icons/x_button_white.svg"
          alt="close"
          width={24}
          height={24}
        />
      </button>
    </div>
  </div>
);

export default TopAlert;
