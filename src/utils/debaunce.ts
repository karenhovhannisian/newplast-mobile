import { useEffect, useState } from 'react';

export const useDebounce = (text: string, delay: number) => {
  const [debounceText, setDebounceText] = useState<string>(text);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceText(text);
    }, delay);

    return () => clearInterval(handler);
  }, [delay, text]);

  return debounceText;
};
