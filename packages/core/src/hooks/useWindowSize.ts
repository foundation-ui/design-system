import { useState, useEffect } from "react";
import useEventListener from "./useEventListener";

export interface IWindowSize {
  width: number;
  height: number;
}

export function useWindowSize(): IWindowSize {
  const [windowSize, setWindowSize] = useState<IWindowSize>({
    width: 0,
    height: 0,
  });

  const handleWindowSize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEventListener("resize", handleWindowSize);
  useEffect(() => {
    handleWindowSize();
  }, []);

  return windowSize;
}
