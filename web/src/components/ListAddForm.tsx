import { ChangeEvent, FormEvent, useState } from "react";
import Input from "./ui/Input.tsx";
import Button from "./ui/Button.tsx";
import { FormErrors, FormFields } from "../types/index.ts";

type PropsType = {
  onFormSubmitHandler: (inputFields: FormFields) => Promise<boolean>;
  name: string;
  placeholder?: string;
  title?: string;
  buttonTitle: string;
};

export default function ListAddForm({
  onFormSubmitHandler,
  name,
  placeholder,
  title = "",
  buttonTitle,
}: PropsType) {
  const [inputFields, setInputFields] = useState({ [name]: "" } as FormFields);
  const [errors, setErrors] = useState({} as FormErrors);

  const submitData = async (e: FormEvent) => {
    e.preventDefault();

    const result = validateFields();
    if (!result) {
      return;
    }

    const data = await onFormSubmitHandler(inputFields);
    if (data) {
      setInputFields({ [name]: "" });
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setErrors({ ...errors, [e.target.name]: false });
    setInputFields({ ...inputFields, [e.target.name]: e.target.value });
  };

  const validateFields = () => {
    const err: FormErrors = {};

    if (inputFields[name].length < 2) {
      err[name] = "Enter at least 2 letters";
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  return (
    <div data-testid="list-form-wrapper">
      {title && (
        <div
          className={`mb-1 block text-[12px] text-gray-400 ${errors[name] && "!text-red-400"}`}
        >
          {title}
        </div>
      )}
      <form
        onSubmit={submitData}
        className={`flex w-full flex-row items-center gap-1 rounded-[4px] border-[1px] border-[#dbdce1] ${errors[name] && "!border-red-400"}`}
        data-testid="list-form"
      >
        <Input
          name={name}
          value={inputFields[name]}
          onChangeHandler={handleChange}
          placeholder={placeholder}
        />
        <div className="">
          <Button title={buttonTitle} onClickHandler={(e) => submitData(e)} />
        </div>
      </form>
      {errors[name] && (
        <div className="mt-1 text-[12px] text-red-400">{errors[name]}</div>
      )}
    </div>
  );
}
