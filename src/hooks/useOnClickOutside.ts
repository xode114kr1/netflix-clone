import { useEffect, type RefObject } from 'react';

export const useOnClickOutside = (
  ref: RefObject<HTMLElement | null>,
  handler: any
) => {
  useEffect(() => {
    const listener = (e: MouseEvent | TouchEvent) => {
      console.log(ref.current);
      if (!ref.current || ref.current.contains(e.target as Node)) {
        return;
      }
      handler();
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};
