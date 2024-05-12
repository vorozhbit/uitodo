import { useEffect, useState } from "react";

export const LISTS_KEY = "ui-todo-lists";
export const LISTS_COMPACT_KEY = "ui-todo-list-compact";

export default function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue !== null) {
      return JSON.parse(jsonValue);
    }

    return typeof initialValue === "function" ? initialValue() : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}
