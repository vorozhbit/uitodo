import { useEffect } from "react";
import { createNewList } from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import ListAddForm from "./ListAddForm";
import { getListIcon, getTrashIcon } from "../services/icons";
import { FormFields } from "../types";
import { useTodoContext } from "../context/TodoContext";
import useLocalStorage, { LISTS_COMPACT_KEY } from "../hooks/useLocalStorage";

const sectionTitle = "To-Do Lists";

export default function Lists() {
  const [compact, setCompact] = useLocalStorage(LISTS_COMPACT_KEY, false);
  const navigate = useNavigate();
  const { list, lists, setLists } = useTodoContext();

  useEffect(() => {
    if (!list.id) {
      return;
    }

    const listExists = lists.find((l) => l.id === list.id);
    if (listExists) {
      return;
    }

    setLists((prev) => [...prev, list]);
  }, [list]);

  const submitData = async (data: FormFields) => {
    const list = await createNewList(data.title);
    if (!list) {
      return false;
    }
    setLists((prev) => [...prev, list]);
    navigate(`/list/${list?.id}`);
    return true;
  };

  const removeList = (id: string) => {
    setLists((prev) => prev.filter((l) => l.id !== id));

    if (id === list.id) {
      navigate("/");
    }
  };

  return (
    <div className={`${!compact && "md:min-w-[240px] lg:min-w-[300px]"}`}>
      <div
        className="cursor-pointer font-uibold"
        onClick={() => setCompact(!compact)}
      >
        <div className="flex flex-row items-center gap-1 md:hidden">
          {getListIcon("#000000", "24", "100%")}
          <span>{sectionTitle}</span>
        </div>
        <div className="hidden flex-row items-center gap-1 md:flex">
          {getListIcon("#000000", compact ? "28" : "16", "100%")}
          {!compact && <span>{sectionTitle}</span>}
        </div>
      </div>
      <div className={`${compact && "hidden"}`}>
        <div className="mb-5 mt-3 flex flex-col gap-[1px]">
          {lists.map((l) => (
            <div
              key={l.id}
              className={`group flex w-full flex-row items-center justify-between gap-4 rounded-[4px] p-1 px-3 text-theme-blue hover:bg-white ${list.id === l.id && "bg-white"}`}
            >
              <Link className="grow" to={`/list/${l.id}`}>
                {l.title.length > 0 ? l.title : "Untitled"}
              </Link>
              <div
                className="flex cursor-pointer items-center p-[1px] opacity-0 hover:!opacity-100 group-hover:opacity-50"
                onClick={() => removeList(l.id)}
                data-testid="remove"
              >
                {getTrashIcon("#000000a6", "20")}
              </div>
            </div>
          ))}
        </div>
        <ListAddForm
          onFormSubmitHandler={submitData}
          name="title"
          buttonTitle="Add"
          placeholder="Enter title"
          title="New list"
        />
      </div>
    </div>
  );
}
