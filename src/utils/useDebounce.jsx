import React, { useEffect, useState } from "react";

const useDebounce = (value, delay) => {
  const [debouncedText, setDebouncedText] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedText(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value]);

  return debouncedText;
};

export default useDebounce;
