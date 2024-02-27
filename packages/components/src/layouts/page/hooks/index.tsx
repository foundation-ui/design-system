import React, { useState, createContext, useContext } from "react";
import {
  IReactChildren,
  IComponentAPI,
  TComponentAPI,
} from "../../../../../../types";

export enum PageControlsEnum {
  Panel = "panelTool",
  Primary = "primaryTool",
  Secondary = "secondaryTool",
}
export type TPageControlsTarget =
  | PageControlsEnum.Panel
  | PageControlsEnum.Primary
  | PageControlsEnum.Secondary;
export type TPageControls = Record<
  string,
  TComponentAPI | Record<string, TComponentAPI>
>;
export interface IPageControls {
  target: TPageControlsTarget;
  value: TComponentAPI;
}

const defaultComponentAPI = {
  id: "",
  states: {},
  methods: {},
};
const PageContext = createContext<IComponentAPI>(defaultComponentAPI);
export const usePage = () => useContext(PageContext);

export const PageProvider = ({ children }: IReactChildren): JSX.Element => {
  const context = usePageProvider();

  return (
    <PageContext.Provider value={context}>{children}</PageContext.Provider>
  );
};

function usePageProvider(): IComponentAPI {
  const pageId = React.useId();
  const [pageControls, setPageControls] = React.useState<TPageControls>({
    panelTool: false,
    primaryTool: false,
    secondaryTool: false,
  });

  const updateControls = (
    target: TPageControlsTarget,
    value: TComponentAPI
  ) => {
    return setPageControls((prevItems: TPageControls) => ({
      ...prevItems,
      [target]: value,
    }));
  };

  return {
    id: pageId,
    states: pageControls,
    methods: {
      updateControls: ({ target, value }: IPageControls) =>
        updateControls(target, value),
    },
  };
}
