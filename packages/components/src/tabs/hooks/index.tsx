import React, { createContext, useContext, useState } from "react";
import { IReactChildren, IComponentAPI } from "../../../../../types";

const defaultComponentAPI = {
  id: "",
  states: {},
  methods: {},
};
const TabsContext = createContext<IComponentAPI>(defaultComponentAPI);
export const useTabs = () => useContext(TabsContext);

export const TabsProvider = ({ children }: IReactChildren): JSX.Element => {
  const context = useTabsProvider();

  return (
    <TabsContext.Provider value={context}>{children}</TabsContext.Provider>
  );
};

function useTabsProvider(): IComponentAPI {
  const [value, setValue] = useState<string | null>(null);
  const tabsId = React.useId();

  return {
    id: tabsId,
    states: {
      value: value,
    },
    methods: {
      applyValue: (value: string): string | void => setValue(value),
      getTabsId: ({ value, type }: Record<string, string>): string =>
        `${tabsId}-${type}-${value}`,
    },
  };
}
