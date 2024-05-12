import { createContext, PropsWithChildren, useContext, useState } from "react";
import {
  createNewItem,
  getListById,
  updateItemById,
  deleteItemById,
  updateListById,
} from "../services/api";
import {
  ListType,
  ListWithGroupType,
  TodoContextType,
  TodoItem,
  TodoItemUpdate,
} from "../types";
import useLocalStorage, { LISTS_KEY } from "../hooks/useLocalStorage";

export const TodoContext = createContext({} as TodoContextType);

export const TodoProvider = ({ children }: PropsWithChildren) => {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState({} as ListWithGroupType);
  const [lists, setLists] = useLocalStorage(
    LISTS_KEY,
    [] as ListWithGroupType[],
  );
  const [items, setItems] = useState([] as TodoItem[]);

  const fetchItems = async (id: string) => {
    const data = await getListById(id);
    if (!data) {
      setLoading(false);
      return false;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { items, ...listData } = data;
    setList(listData);
    setItems(data.items);
    setLoading(false);
    return listData;
  };

  const createItem = async (value: string) => {
    const data = await createNewItem(list.id, value);
    if (!data) {
      return;
    }

    addItem(data);
    return data;
  };

  const updateItem = async ({ id, text, completed }: TodoItemUpdate) => {
    const data = await updateItemById(id, completed, text);
    if (!data) {
      return;
    }

    updateItemInList(data);
    return data;
  };

  const updateList = async ({ id, title }: ListType) => {
    const data = await updateListById(id, title);
    if (!data) {
      return;
    }

    updateListInLists(data);
    return data;
  };

  const addItem = (item: TodoItem) => {
    setItems((prev) => [...prev, { ...item }]);
  };

  const updateItemInList = (item: TodoItem) => {
    setItems((prev) =>
      prev.reduce((acc, i) => {
        if (i.id === item.id) {
          return [...acc, { ...i, ...item }];
        }
        return [...acc, i];
      }, [] as TodoItem[]),
    );
  };

  const removeItemFromList = (id: string) => {
    setItems((prev) =>
      prev.reduce((acc, i) => {
        if (i.id === id) {
          return acc;
        }
        return [...acc, i];
      }, [] as TodoItem[]),
    );
  };

  const updateListInLists = (list: ListWithGroupType) => {
    setList(list);
    setLists((prev) =>
      prev.reduce((acc, l) => {
        if (l.id === list.id) {
          return [...acc, { ...l, title: list.title, group: list.group }];
        }
        return [...acc, l];
      }, [] as ListType[]),
    );
  };

  const deleteItem = async (id: string) => {
    const result = await deleteItemById(id);
    if (!result) {
      return;
    }

    removeItemFromList(id);
    return result;
  };

  const obj = {
    loading,
    list,
    items,
    lists,
    setLists,
    updateListInLists,
    fetchItems,
    createItem,
    updateItem,
    updateList,
    addItem,
    deleteItem,
    updateItemInList,
    removeItemFromList,
  };

  return <TodoContext.Provider value={obj}>{children}</TodoContext.Provider>;
};

export const useTodoContext = () => {
  return useContext(TodoContext);
};
