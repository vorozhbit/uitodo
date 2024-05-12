import { useEffect, useRef } from "react";

type Func = (...args: never[]) => void;

export default function useDebounce<F extends Func>(func: F, delay = 500) {
  const timer = useRef<number>();

  useEffect(() => {
    return () => {
      if (!timer.current) {
        return;
      }
      clearTimeout(timer.current);
    };
  }, []);

  const debouncedFunction = ((...args) => {
    const newTimer = setTimeout(() => {
      func(...args);
    }, delay);
    clearTimeout(timer.current);
    timer.current = newTimer;
  }) as F;

  return debouncedFunction;
}
