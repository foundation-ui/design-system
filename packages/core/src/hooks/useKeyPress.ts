import { useState, useEffect, useCallback } from "react";

export enum KeyBindingEnum {
  Ctrl = "ctrlKey",
  Meta = "metaKey",
  Alt = "altKey",
  Shift = "shiftKey",
  Up = "keyUp",
  Down = "keyDown",
}

export function useKeyPress(
  targetKey: KeyboardEvent["key"],
  hotkey?: boolean,
  bindKey?:
    | KeyBindingEnum.Ctrl
    | KeyBindingEnum.Meta
    | KeyBindingEnum.Alt
    | KeyBindingEnum.Shift
): boolean {
  const [keyPressed, setKeyPressed] = useState(false);

  const switchStoredKeyPressed = useCallback(
    (event: KeyboardEvent, state: boolean) => {
      if (!hotkey && event.key === targetKey) {
        return setKeyPressed(state);
      }
      if (
        hotkey &&
        event[bindKey || KeyBindingEnum.Meta] &&
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
    window.addEventListener(KeyBindingEnum.Down, KeyDownHandler);
    window.addEventListener(KeyBindingEnum.Up, KeyUpHandler);
    return () => {
      window.removeEventListener(KeyBindingEnum.Down, KeyDownHandler);
      window.removeEventListener(KeyBindingEnum.Up, KeyUpHandler);
    };
  }, [KeyDownHandler, KeyUpHandler]);
  return keyPressed;
}
