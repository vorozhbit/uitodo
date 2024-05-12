import { useEffect, useState } from "react";
import useSocket from "../hooks/useSocket";
import ListItem from "../components/ListItem";
import ListAddForm from "../components/ListAddForm";
import { useTodoContext } from "../context/TodoContext";
import { FormFields, TodoItem, TodoItemUpdate } from "../types";
import ListTitle from "../components/ListTitle";

export default function List({ id }: { id: string }) {
  const [groupItems, setGroupItems] = useState(false);
  const socket = useSocket({ id });
  const {
    loading,
    list,
    lists,
    items,
    createItem,
    updateItem,
    deleteItem,
    updateListInLists,
  } = useTodoContext();

  useEffect(() => {
    const savedGroupItemsValue = lists.find((l) => l.id === id)?.group;
    setGroupItems(!!savedGroupItemsValue);
  }, [id]);

  const onAddNewItem = async (inputFields: FormFields) => {
    const item = await createItem(inputFields.item);
    if (item && socket) {
      socket.emit("item", item);
    }
    return true;
  };

  const onDeleteItem = async (id: string) => {
    const result = await deleteItem(id);
    if (result && socket) {
      socket.emit("item-delete", id);
    }
    return true;
  };

  const onUpdateItem = async (item: TodoItemUpdate) => {
    const data = await updateItem(item);
    if (data && socket) {
      socket.emit("item-update", data);
    }
  };

  const renderItems = () => {
    const singleItem = (item: TodoItem) => (
      <ListItem
        key={item.id + item.completed + item.text}
        item={item}
        onUpdateHandle={onUpdateItem}
        onDeleteHandle={onDeleteItem}
        socket={socket}
      />
    );
    const mainItems = items
      .filter((i) => {
        return groupItems ? !i.completed : true;
      })
      .map(singleItem);

    let completedRender;
    if (groupItems) {
      const completedItems = items.filter((i) => i.completed).map(singleItem);
      completedRender = completedItems.length ? (
        <div className="mt-6" data-testid="completed-wrapper">
          <div className="mb-2 border-b-[1px] border-gray-200 pb-2 text-[14px] text-theme-blue">
            Completed
          </div>
          <div className="flex flex-col gap-1">{completedItems}</div>
        </div>
      ) : null;
    }

    return (
      <>
        <div className="flex flex-col gap-1">{mainItems}</div>
        {completedRender}
      </>
    );
  };

  const updateGroupItems = () => {
    const newValue = !groupItems;
    setGroupItems(newValue);
    updateListInLists({ ...list, group: newValue });
  };

  const renderFilters = () => {
    if (!items.length) {
      return;
    }
    return (
      <div className="mb-4 flex flex-row gap-3 text-[14px] text-gray-500">
        <div
          className="cursor-pointer rounded-[4px] bg-gray-100 px-2 py-1 transition hover:bg-gray-200"
          onClick={updateGroupItems}
          data-testid="toggle-grouping-by-completion"
        >
          {groupItems ? "Default order" : "Order by Status"}
        </div>
      </div>
    );
  };

  if (loading) {
    return null;
  }

  return (
    <>
      <ListTitle socket={socket} />
      {renderFilters()}
      {renderItems()}
      <div className="mt-6 max-w-[400px]">
        <ListAddForm
          onFormSubmitHandler={onAddNewItem}
          name="item"
          buttonTitle="Add"
          placeholder="Type here"
          title="New item"
        />
      </div>
    </>
  );
}
