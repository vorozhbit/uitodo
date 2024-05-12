import { ChangeEventHandler, useState } from "react";

type PropsType = {
  name: string;
  checked: boolean;
  onChangeHandler: ChangeEventHandler<HTMLInputElement>;
};

export default function Checkbox({
  name,
  checked,
  onChangeHandler,
}: PropsType) {
  const [ch, setCh] = useState(checked);
  return (
    <label
      className="relative flex cursor-pointer items-center rounded-full p-1"
      htmlFor={name}
      data-testid="label"
    >
      <input
        id={name}
        type="checkbox"
        name={name}
        onChange={(e) => {
          setCh(!ch);
          onChangeHandler(e);
        }}
        checked={ch}
        data-testid="checkbox"
        style={{ WebkitAppearance: "none", MozAppearance: "none" }}
        className={`before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-[#736F62] transition-all before:absolute before:left-2/4 before:top-2/4 before:block before:h-6 before:w-6 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-full before:opacity-0 before:transition-opacity checked:border-theme-blue checked:before:bg-[#6F86A0] hover:before:opacity-10`}
      />
      <div className="pointer-events-none absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-theme-blue opacity-0 transition-opacity peer-checked:opacity-100">
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0ZM17.1246 8.94478C17.4623 8.50777 17.3818 7.87974 16.9448 7.54205C16.5078 7.20436 15.8797 7.28487 15.5421 7.72189L10.6082 14.1069L8.40996 11.6644C8.0405 11.2539 7.40821 11.2206 6.9977 11.59C6.58719 11.9595 6.55391 12.5918 6.92337 13.0023L9.92337 16.3356C10.1218 16.5561 10.4078 16.6771 10.7041 16.666C11.0005 16.6549 11.2766 16.5128 11.458 16.2781L17.1246 8.94478Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </label>
  );
}
