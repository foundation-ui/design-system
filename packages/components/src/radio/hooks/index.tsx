"use client";

import React, { createContext, useContext, useState } from "react";

import type {
  IRadioContext,
  IRadioGroupContext,
  IRadioProviderProperties,
  IRadioGroupProperties,
} from "../types";

const noop = (): void => {};

const defaultRadioContext: IRadioContext = {
  id: "",
  states: { checked: false },
  methods: { applyChecked: noop },
};

const RadioContext = createContext<IRadioContext>(defaultRadioContext);
const RadioGroupContext = createContext<IRadioGroupContext | null>(null);

export const useRadio = (): IRadioContext => useContext(RadioContext);
export const useRadioGroup = (): IRadioGroupContext | null =>
  useContext(RadioGroupContext);

export const RadioProvider = ({
  children,
}: IRadioProviderProperties): React.JSX.Element => {
  const id = React.useId();
  const [checked, setChecked] = useState<boolean>(false);

  return (
    <RadioContext.Provider
      value={{
        id,
        states: { checked },
        methods: {
          applyChecked: (nextChecked) => setChecked(Boolean(nextChecked)),
        },
      }}
    >
      {children}
    </RadioContext.Provider>
  );
};

export const RadioGroupProvider = ({
  children,
  name,
  value: valueProp,
  defaultValue,
  disabled,
  required,
  onValueChange,
  ...restProps
}: IRadioGroupProperties): React.JSX.Element => {
  const generatedName = React.useId();
  const isControlled = valueProp !== undefined;
  const [innerValue, setInnerValue] = useState<string | undefined>(
    defaultValue,
  );
  const value = isControlled ? valueProp : innerValue;

  const selectValue = (next: string) => {
    if (!isControlled) setInnerValue(next);
    if (onValueChange) onValueChange(next);
  };

  return (
    <RadioGroupContext.Provider
      value={{
        name: name ?? generatedName,
        value,
        disabled,
        required,
        selectValue,
      }}
    >
      <div
        role="radiogroup"
        aria-disabled={Boolean(disabled)}
        aria-required={Boolean(required)}
        {...restProps}
      >
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
};
