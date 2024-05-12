import { Dispatch, SetStateAction } from "react";

export type TodoContextType = {
  loading: boolean;
  list: ListType;
  items: TodoItem[];
  lists: ListWithGroupType[];
  setLists: Dispatch<SetStateAction<ListType[]>>;
  updateListInLists: (list: ListWithGroupType) => void;
  fetchItems: (id: string) => Promise<false | ListType>;
  createItem: (value: string) => Promise<TodoItem | undefined>;
  updateItem: (i: TodoItemUpdate) => Promise<TodoItem | undefined>;
  updateList: (i: ListType) => Promise<ListType | undefined>;
  addItem: (item: TodoItem) => void;
  deleteItem: (id: string) => Promise<TodoItem | undefined>;
  updateItemInList: (item: TodoItem) => void;
  removeItemFromList: (id: string) => void;
};

export type ListType = {
  id: string;
  title: string;
  createdAt?: string;
};

export type ListWithItemsType = ListType & {
  items: TodoItem[];
};

export type ListWithGroupType = ListType & {
  group?: boolean;
};

export type TodoItem = {
  id: string;
  text: string;
  order: number;
  completed: boolean;
  createdAt?: string;
};

export type TodoItemUpdate = {
  id: string;
  text: string;
  completed: boolean;
};

export type FormErrors = {
  [s: string]: boolean | string;
};

export type FormFields = {
  [s: string]: string;
};
