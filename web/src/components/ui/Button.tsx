import { MouseEventHandler } from "react";

type PropsType = {
  title: string;
  onClickHandler?: MouseEventHandler<HTMLButtonElement>;
};

export default function Button({ title, onClickHandler }: PropsType) {
  return (
    <button
      type="button"
      onClick={onClickHandler}
      data-testid="button"
      className="border-1 mr-[2px] h-[32px] cursor-pointer rounded-[4px] border-theme-blue bg-theme-blue px-[10px] text-center text-[14px] font-medium leading-none text-white hover:border-theme-blue-light hover:bg-theme-blue-light"
    >
      {title}
    </button>
  );
}
