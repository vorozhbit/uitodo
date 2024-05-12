import {
  ChangeEventHandler,
  FocusEventHandler,
  KeyboardEventHandler,
} from "react";

type PropsType = {
  name: string;
  value?: string;
  theme?: "clean" | "default";
  onChangeHandler?: ChangeEventHandler<HTMLInputElement>;
  onKeyDownHandler?: KeyboardEventHandler<HTMLInputElement>;
  onBlurHandler?: FocusEventHandler<HTMLInputElement>;
  required?: boolean;
  placeholder?: string;
  lineLhrough?: boolean;
};

export default function Input({
  name,
  value,
  onChangeHandler,
  required,
  onKeyDownHandler,
  onBlurHandler,
  placeholder,
  theme = "default",
  lineLhrough,
}: PropsType) {
  let themeClasses = "rounded-[4px] px-[10px] py-[8px] text-sm";
  if (theme === "clean") {
    themeClasses = "border-none";
  }

  if (lineLhrough) {
    themeClasses += " line-through !text-gray-400";
  }

  return (
    <>
      <input
        type="text"
        id={name}
        name={name}
        value={value}
        className={`m-0 block w-full bg-none text-gray-900 outline-none ${themeClasses}`}
        onChange={onChangeHandler}
        required={required}
        onKeyDown={onKeyDownHandler}
        placeholder={placeholder}
        onBlur={onBlurHandler}
        data-testid="input"
      />
    </>
  );
}
