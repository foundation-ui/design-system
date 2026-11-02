"use client";

import React, { createContext, useContext, useState } from "react";

import type { ITabsContext, ITabsProviderProperties } from "../types";

const noop = (): void => {};
const noopId = (): string => "";

const defaultTabsContext: ITabsContext = {
  id: "",
  states: {
    value: null,
  },
  methods: {
    applyValue: noop,
    getTabsId: noopId,
  },
};

const TabsContext = createContext<ITabsContext>(defaultTabsContext);

export const useTabs = (): ITabsContext => useContext(TabsContext);

export const TabsProvider = ({
  children,
}: ITabsProviderProperties): React.JSX.Element => {
  const id = React.useId();
  const [value, setValue] = useState<string | null>(null);

  return (
    <TabsContext.Provider
      value={{
        id,
        states: {
          value,
        },
        methods: {
          applyValue: (nextValue) => setValue(nextValue),
          getTabsId: ({ value, type }) => `${id}-${type}-${value}`,
        },
      }}
    >
      {children}
    </TabsContext.Provider>
  );
};
