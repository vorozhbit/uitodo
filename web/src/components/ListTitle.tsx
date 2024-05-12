import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { useTodoContext } from "../context/TodoContext";
import Input from "./ui/Input";
import { Socket } from "socket.io-client";
import useDebounce from "../hooks/useDebounce";

type PropsType = {
  socket: Socket | null;
};

export default function ListTitle({ socket }: PropsType) {
  const [value, setValue] = useState("");
  const { list, updateList, updateListInLists } = useTodoContext();

  const handleUpdate = useDebounce((title: string) => {
    runUpdate(title);
  }, 500);

  useEffect(() => {
    if (!list || list.title === undefined) {
      return;
    }
    setValue(list.title);
  }, [list]);

  const submitOnChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const title = e.currentTarget.value;
    setValue(title);
    handleUpdate(title);
  };

  const submitOnEnter = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") {
      return;
    }
    const title = e.currentTarget.value;
    runUpdate(title);
  };

  const submitOnBlur = () => {
    runUpdate(value);
  };

  const runUpdate = async (title: string) => {
    const data = await updateList({ id: list.id, title });

    if (data && socket) {
      socket.emit("list-update", data);
    }

    if (data) {
      updateListInLists(data);
    }
  };

  return (
    <div className="pb-4 pt-4 font-uibold text-[26px]">
      <Input
        name="text"
        value={value}
        theme="clean"
        onChangeHandler={submitOnChange}
        onKeyDownHandler={submitOnEnter}
        onBlurHandler={submitOnBlur}
        placeholder="Untitled"
      />
    </div>
  );
}
