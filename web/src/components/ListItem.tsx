import { ChangeEvent, KeyboardEvent, useState } from "react";
import Input from "./ui/Input";
import { TodoItemUpdate } from "../types";
import useDebounce from "../hooks/useDebounce";
import { Socket } from "socket.io-client";
import { getTrashIcon } from "../services/icons";
import Checkbox from "./ui/Checkbox";

type PropsType = {
  item: TodoItemUpdate;
  socket: Socket | null;
  onUpdateHandle: (item: TodoItemUpdate) => void;
  onDeleteHandle: (id: string) => void;
};

const ListItem = ({
  item,
  socket,
  onUpdateHandle,
  onDeleteHandle,
}: PropsType) => {
  const [value, setValue] = useState(item.text);
  const [checked, setChecked] = useState(item.completed);

  const handleUpdate = useDebounce((text: string) => {
    if (!socket) {
      return;
    }
    socket.emit("item-update", {
      id: item.id,
      completed: checked,
      text: text,
    });
  }, 500);

  const submitOnEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      runUpdate();
    }
  };

  const submitOnBlur = () => {
    runUpdate();
  };

  const submitOnDelete = () => {
    onDeleteHandle(item.id);
  };

  const updateCompleted = () => {
    setChecked(!checked);
    runUpdate(true);
  };

  const submitOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setValue(value);
    handleUpdate(value);
  };

  const runUpdate = (invertedChecked = false) => {
    onUpdateHandle({
      id: item.id,
      completed: invertedChecked ? !checked : checked,
      text: value,
    });
  };

  return (
    <div className="group relative ml-[-22px] pl-[22px]">
      <div className="flex items-start gap-1">
        <Checkbox
          name={item.id}
          checked={checked}
          onChangeHandler={updateCompleted}
        />
        <div className="w-full pt-[2px]">
          <Input
            name="text"
            value={value}
            theme="clean"
            onChangeHandler={submitOnChange}
            onKeyDownHandler={submitOnEnter}
            onBlurHandler={submitOnBlur}
            placeholder="Type here"
            lineLhrough={checked}
          />
        </div>
        <div
          className="absolute left-[-2px] top-[3px] flex cursor-pointer items-center p-[1px] opacity-0 hover:!opacity-100 group-hover:opacity-50"
          onClick={submitOnDelete}
          data-testid="remove"
        >
          {getTrashIcon("#000000a6", "20")}
        </div>
      </div>
    </div>
  );
};

export default ListItem;
