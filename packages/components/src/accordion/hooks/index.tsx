"use client";

import React, { createContext, useContext, useState } from "react";

import type { IAccordionContext, IAccordionProviderProperties } from "../types";

const noop = (): void => {};
const noopId = (): string => "";

const defaultAccordionContext: IAccordionContext = {
  id: "",
  states: {
    value: null,
  },
  methods: {
    applyValue: noop,
    getAccordionId: noopId,
  },
};

const AccordionContext = createContext<IAccordionContext>(
  defaultAccordionContext,
);

export const useAccordion = (): IAccordionContext =>
  useContext(AccordionContext);

export const AccordionProvider = ({
  children,
}: IAccordionProviderProperties): React.JSX.Element => {
  const id = React.useId();
  const [value, setValue] = useState<string | null>(null);

  return (
    <AccordionContext.Provider
      value={{
        id,
        states: {
          value,
        },
        methods: {
          applyValue: (nextValue) => setValue(nextValue),
          getAccordionId: ({ value, type }) => `${id}-${type}-${value}`,
        },
      }}
    >
      {children}
    </AccordionContext.Provider>
  );
};
