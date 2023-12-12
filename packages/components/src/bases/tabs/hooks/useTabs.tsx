import React, { createContext, useContext, useState } from "react";
import { IReactChildren } from "../../../../../../types";

const TabsContext = createContext<object | any>({});
export const useTabs = () => useContext(TabsContext);

export const TabsProvider = ({ children }: IReactChildren): JSX.Element => {
  const context = useTabsProvider();

  return (
    <TabsContext.Provider value={context}>{children}</TabsContext.Provider>
  );
};

function useTabsProvider(): object {
  const [value, setValue] = useState<string | void>();
  const tabsId = React.useId();

  return {
    states: {
      value: value,
    },
    methods: {
      applyValue: (value: string): string | void => setValue(value),
      getTabsId: (value: string, type: "trigger" | "content"): string =>
        `${tabsId}-${type}-${value}`,
    },
  };
}
