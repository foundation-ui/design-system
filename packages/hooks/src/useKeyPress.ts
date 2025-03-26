import { useEffect, useState, useCallback } from "react";
import { KeyBindingEnum, TKeyBinding } from "../../../types";

export function useKeyPress(
  targetKey: KeyboardEvent["key"],
  hotkey?: boolean,
  bindKey?: TKeyBinding
): boolean {
  const [keyPressed, setKeyPressed] = useState(false);

  const switchStoredKeyPressed = useCallback(
    (event: KeyboardEvent, state: boolean) => {
      if (!hotkey && event.key === targetKey) {
        return setKeyPressed(state);
      }
      if (
        hotkey &&
        event[bindKey ?? KeyBindingEnum.Meta] &&
        event.key === targetKey
      ) {
        return setKeyPressed(state);
      }
      return;
    },
    [bindKey, hotkey, targetKey]
  );
  const KeyDownHandler = useCallback(
    (event: any) => switchStoredKeyPressed(event, true),
    [switchStoredKeyPressed]
  );

  const KeyUpHandler = useCallback(
    (event: any) => switchStoredKeyPressed(event, false),
    [switchStoredKeyPressed]
  );

  useEffect(() => {
    window.addEventListener("keydown", KeyDownHandler);
    window.addEventListener("keyup", KeyUpHandler);
    return () => {
      window.removeEventListener("keydown", KeyDownHandler);
      window.removeEventListener("keyup", KeyUpHandler);
    };
  }, [KeyDownHandler, KeyUpHandler]);
  return keyPressed;
}
